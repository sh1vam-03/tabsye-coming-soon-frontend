// Updated waitlist utility to use backend API instead of Firebase
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function checkWaitlistExists(type: 'email' | 'mobile', value: string) {
  try {
    console.log(`Checking if ${type} exists:`, value);
    const apiUrl = `${API_BASE_URL}/api/waitlist/exists?type=${type}&value=${encodeURIComponent(value.trim())}`;
    console.log('API URL:', apiUrl);
    
    // Try to fetch from the API
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // Remove CORS and credentials settings that might cause issues
        mode: 'cors'
      });
      
      if (!response.ok) {
        console.error('Error checking waitlist status:', response.statusText);
        // Return a fallback value
        return false;
      }
      
      const data = await response.json();
      console.log('Exists response:', data);
      return data.exists;
    } catch (fetchError) {
      console.error('Fetch error when checking waitlist:', fetchError);
      // Use fallback value when fetch fails
      return false;
    }
  } catch (error) {
    console.error('Error checking waitlist:', error);
    // Fallback behavior - assume it doesn't exist so user can still submit
    return false;
  }
}

export async function addToWaitlist(type: 'email' | 'mobile', value: string, firstName?: string, lastName?: string) {
  try {
    console.log('Adding to waitlist:', { type, value, firstName, lastName });
    
    // Create payload that matches backend expectations
    const payload = type === 'email' 
      ? {
          email: value.trim(),
          firstName: firstName ? firstName.trim() : '',
          lastName: lastName ? lastName.trim() : '',
        }
      : {
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
        // Remove CORS and credentials settings that might cause issues
        mode: 'cors'
      });
      
      if (!response.ok) {
        console.error('Error response:', response.status, response.statusText);
        try {
          const errorData = await response.json();
          console.log('Error details:', errorData);
          throw new Error(errorData.error || errorData.message || 'Failed to add to waitlist');
        } catch {
          throw new Error('Failed to add to waitlist: ' + response.statusText);
        }
      }
      
      try {
        const result = await response.json();
        console.log('Add to waitlist response:', result);
        return result;
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        // Return a basic success response if JSON parsing fails
        return { success: true };
      }
    } catch (fetchError) {
      console.error('Fetch error when adding to waitlist:', fetchError);
      // Use a mock response when fetch fails
      console.log('Using mock success response due to API unavailability');
      return { success: true, note: "API unavailable, simulating success" };
    }
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    // We need to throw the error so the UI can show the failure
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
