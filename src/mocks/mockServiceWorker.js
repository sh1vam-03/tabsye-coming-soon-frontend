// Mock API Service Worker for testing frontend without backend
// Save this file as frontend/src/mocks/mockServiceWorker.js and 
// include it in your frontend's index.js or _app.js if needed

// This is a simplified version for demonstration purposes
if (typeof window !== 'undefined') {
  console.log('Mock Service Worker activated for testing');
  
  // Mock Fetch implementation
  const originalFetch = window.fetch;
  window.fetch = async function(url, options) {
    console.log('Mock fetch intercepted request to:', url);
    
    // Parse the URL to determine the endpoint
    const urlString = url.toString();
    
    // Handle waitlist API endpoints
    if (urlString.includes('/api/waitlist/exists')) {
      console.log('Mocking waitlist exists endpoint');
      return {
        ok: true,
        status: 200,
        json: async () => ({ exists: false, note: "Mocked response" })
      };
    }
    
    if (urlString.includes('/api/waitlist/add')) {
      console.log('Mocking waitlist add endpoint');
      return {
        ok: true,
        status: 201,
        json: async () => ({ success: true, note: "Mocked response" })
      };
    }
    
    if (urlString.includes('/api/waitlist/count')) {
      console.log('Mocking waitlist count endpoint');
      return {
        ok: true,
        status: 200,
        json: async () => ({ count: Math.floor(Math.random() * 100) + 50, note: "Mocked response" })
      };
    }
    
    if (urlString.includes('/api/health')) {
      console.log('Mocking health endpoint');
      return {
        ok: true,
        status: 200,
        json: async () => ({ status: 'ok', message: 'Mocked server is running' })
      };
    }
    
    // For any other endpoints, try the real fetch
    console.log('Passing through to real fetch');
    try {
      return await originalFetch(url, options);
    } catch {
      // If the real fetch fails, return a mock error response
      console.error('Real fetch failed, returning mock error response');
      return {
        ok: false,
        status: 500,
        json: async () => ({ error: 'Mock server error' })
      };
    }
  };
}
