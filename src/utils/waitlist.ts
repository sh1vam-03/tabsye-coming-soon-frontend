// Updated waitlist utility to use backend API instead of Firebase
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Type definition for stored submission entries
interface StoredSubmission {
  key: string;
  timestamp: number;
}

// Persistent duplicate tracking across page reloads
class DuplicateTracker {
  private static instance: DuplicateTracker;
  private storageKey = 'waitlist-submissions';
  
  static getInstance(): DuplicateTracker {
    if (!DuplicateTracker.instance) {
      DuplicateTracker.instance = new DuplicateTracker();
    }
    return DuplicateTracker.instance;
  }
  
  private getStoredSubmissions(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data: StoredSubmission[] = JSON.parse(stored);
        // Clean up old entries (older than 24 hours)
        const now = Date.now();
        const validEntries = data.filter((item: StoredSubmission) => 
          now - item.timestamp < 24 * 60 * 60 * 1000
        );
        
        if (validEntries.length !== data.length) {
          // Update storage with cleaned entries
          localStorage.setItem(this.storageKey, JSON.stringify(validEntries));
        }
        
        return new Set(validEntries.map((item: StoredSubmission) => item.key));
      }
    } catch (error) {
      console.error('Error reading stored submissions:', error);
    }
    return new Set();
  }
  
  private saveSubmissions(submissions: Set<string>) {
    if (typeof window === 'undefined') return;
    
    try {
      const now = Date.now();
      const dataToStore: StoredSubmission[] = Array.from(submissions).map(key => ({
        key,
        timestamp: now
      }));
      localStorage.setItem(this.storageKey, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Error saving submissions:', error);
    }
  }
  
  has(type: string, value: string): boolean {
    const key = `${type}:${value.trim().toLowerCase()}`;
    const submissions = this.getStoredSubmissions();
    return submissions.has(key);
  }
  
  add(type: string, value: string) {
    const key = `${type}:${value.trim().toLowerCase()}`;
    const submissions = this.getStoredSubmissions();
    submissions.add(key);
    this.saveSubmissions(submissions);
  }
}

const duplicateTracker = DuplicateTracker.getInstance();

export async function checkWaitlistExists(type: 'email' | 'mobile', value: string) {
  try {
    console.log(`Checking if ${type} exists:`, value);
    
    // Check persistent duplicate tracking
    if (duplicateTracker.has(type, value)) {
      console.log('Found in persistent duplicate tracker');
      return true;
    }
    
    console.log('No duplicate found in tracker');
    return false;
  } catch (error) {
    console.error('Error checking waitlist:', error);
    return false;
  }
}

export async function addToWaitlist(type: 'email' | 'mobile', value: string, firstName?: string, lastName?: string) {
  try {
    console.log('Adding to waitlist:', { type, value, firstName, lastName });
    
    // Check if this was already added using persistent tracking
    if (duplicateTracker.has(type, value)) {
      throw new Error(`This ${type} has already been added to the waitlist.`);
    }
    
    // Get current count before adding
    const initialCount = await getWaitlistCount();
    
    // Create payload that matches backend expectations
    const payload = type === 'email' 
      ? {
          type: 'email',
          email: value.trim(),
          firstName: firstName ? firstName.trim() : '',
          lastName: lastName ? lastName.trim() : '',
        }
      : {
          type: 'mobile',
          mobile: value.trim(),
          firstName: firstName ? firstName.trim() : '',
          lastName: lastName ? lastName.trim() : '',
        };
    
    console.log('Request payload:', payload);
    
    // Try to add to the API
    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        mode: 'cors'
      });
      
      if (!response.ok) {
        console.error('Error response:', response.status, response.statusText);
        
        try {
          const errorData = await response.json();
          console.log('Error details:', errorData);
          
          // Handle specific backend errors
          if (response.status === 500) {
            throw new Error('Server temporarily unavailable. Please try again later.');
          } else if (response.status === 400) {
            throw new Error(errorData.error || errorData.message || 'Invalid request data');
          } else {
            throw new Error(errorData.error || errorData.message || 'Failed to add to waitlist');
          }
        } catch (parseError) {
          if (parseError instanceof Error && parseError.message.includes('Server temporarily')) {
            throw parseError;
          }
          throw new Error('Failed to add to waitlist: ' + response.statusText);
        }
      }
      
      try {
        const result = await response.json();
        console.log('Add to waitlist response:', result);
        
        if (result.success) {
          // Check if count actually increased to detect duplicates
          const newCount = await getWaitlistCount();
          if (newCount <= initialCount) {
            // Count didn't increase, likely a duplicate
            throw new Error(`This ${type} is already registered in the waitlist.`);
          }
          
          // Add to persistent duplicate tracker
          duplicateTracker.add(type, value);
        }
        
        return result;
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        throw new Error('Server response was invalid. Please try again.');
      }
    } catch (fetchError) {
      console.error('Fetch error when adding to waitlist:', fetchError);
      throw new Error('Network error. Please check your connection and try again.');
    }
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    throw error;
  }
}

export async function getWaitlistCount() {
  try {
    console.log('Getting waitlist count');
    
    // Try to get the count from the API
    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // Remove CORS and credentials settings that might cause issues
        mode: 'cors'
      });
      
      if (!response.ok) {
        console.error('Error getting count:', response.statusText);
        return 0;
      }
      
      const data = await response.json();
      console.log('Count response:', data);
      return data.count || 0;
    } catch (fetchError) {
      console.error('Fetch error when getting count:', fetchError);
      // Return a fallback count when fetch fails
      return 0;
    }
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    // Fallback to a default value if API is not available
    return 0;
  }
}
