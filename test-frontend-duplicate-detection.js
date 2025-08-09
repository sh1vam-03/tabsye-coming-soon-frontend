#!/usr/bin/env node

// Test frontend duplicate detection with the updated utils
const API_BASE_URL = 'https://tabsye-coming-soon-backend.onrender.com';

// Simulate the frontend utils with duplicate detection
const recentlyAdded = new Set();

async function checkWaitlistExists(type, value) {
  const key = `${type}:${value.trim().toLowerCase()}`;
  if (recentlyAdded.has(key)) {
    console.log('Found in recently added cache');
    return true;
  }
  console.log('No duplicate found in recent cache');
  return false;
}

async function getWaitlistCount() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/waitlist/count`);
    const result = await response.json();
    return result.count;
  } catch (error) {
    console.error('Error getting count:', error);
    return 0;
  }
}

async function addToWaitlist(type, value, firstName, lastName) {
  try {
    console.log('Adding to waitlist:', { type, value, firstName, lastName });
    
    // Check if this was recently added to prevent immediate duplicates
    const key = `${type}:${value.trim().toLowerCase()}`;
    if (recentlyAdded.has(key)) {
      throw new Error(`This ${type} has already been added in this session.`);
    }
    
    // Get current count before adding
    const initialCount = await getWaitlistCount();
    console.log('Initial count:', initialCount);
    
    // Create payload
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
    
    // Try to add to the API
    const response = await fetch(`${API_BASE_URL}/api/waitlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Add response:', result);
    
    if (result.success) {
      // Check if count actually increased to detect duplicates
      const newCount = await getWaitlistCount();
      console.log('New count:', newCount);
      
      if (newCount <= initialCount) {
        // Count didn't increase, likely a duplicate
        throw new Error(`This ${type} is already registered in the waitlist.`);
      }
      
      // Add to recently added cache with expiration
      recentlyAdded.add(key);
      setTimeout(() => recentlyAdded.delete(key), 300000); // 5 minutes
    }
    
    return result;
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    throw error;
  }
}

console.log('🧪 FRONTEND DUPLICATE DETECTION TEST');
console.log('=' .repeat(50));

async function testFrontendDuplicateDetection() {
  try {
    const testEmail = `frontend-test-${Date.now()}@example.com`;
    const testMobile = `+1555${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
    
    console.log(`📧 Test Email: ${testEmail}`);
    console.log(`📱 Test Mobile: ${testMobile}`);
    
    // Test 1: Check if email exists (should be false initially)
    console.log('\n1️⃣ Check if email exists initially...');
    const emailExistsInitial = await checkWaitlistExists('email', testEmail);
    console.log(`✅ Email exists check: ${emailExistsInitial}`);
    
    // Test 2: Add email first time (should succeed)
    console.log('\n2️⃣ Add email first time...');
    try {
      const result1 = await addToWaitlist('email', testEmail, 'Test', 'User');
      console.log('✅ First email add successful:', result1);
    } catch (error) {
      console.log('❌ First email add failed:', error.message);
    }
    
    // Test 3: Check if email exists after adding (should be true)
    console.log('\n3️⃣ Check if email exists after adding...');
    const emailExistsAfter = await checkWaitlistExists('email', testEmail);
    console.log(`✅ Email exists check after add: ${emailExistsAfter}`);
    
    // Test 4: Try to add same email again (should fail with frontend detection)
    console.log('\n4️⃣ Try to add same email again...');
    try {
      const result2 = await addToWaitlist('email', testEmail, 'Duplicate', 'User');
      console.log('❌ Duplicate email was allowed:', result2);
    } catch (error) {
      console.log('✅ Duplicate email correctly blocked:', error.message);
    }
    
    // Test 5: Add mobile (should succeed)
    console.log('\n5️⃣ Add mobile first time...');
    try {
      const result3 = await addToWaitlist('mobile', testMobile, 'Mobile', 'User');
      console.log('✅ Mobile add successful:', result3);
    } catch (error) {
      console.log('❌ Mobile add failed:', error.message);
    }
    
    // Test 6: Try to add same mobile again (should fail)
    console.log('\n6️⃣ Try to add same mobile again...');
    try {
      const result4 = await addToWaitlist('mobile', testMobile, 'Duplicate', 'Mobile');
      console.log('❌ Duplicate mobile was allowed:', result4);
    } catch (error) {
      console.log('✅ Duplicate mobile correctly blocked:', error.message);
    }
    
    // Test 7: Test different email (should succeed)
    console.log('\n7️⃣ Add different email...');
    const differentEmail = `different-${Date.now()}@example.com`;
    try {
      const result5 = await addToWaitlist('email', differentEmail, 'Different', 'User');
      console.log('✅ Different email add successful:', result5);
    } catch (error) {
      console.log('❌ Different email add failed:', error.message);
    }
    
    console.log('\n🎉 FRONTEND DUPLICATE DETECTION TEST COMPLETED!');
    
  } catch (error) {
    console.error('❌ Test Error:', error.message);
  }
}

testFrontendDuplicateDetection();
