#!/usr/bin/env node

// Test duplicate detection functionality
const API_BASE_URL = 'https://tabsye-coming-soon-backend.onrender.com';

console.log('🔍 DUPLICATE DETECTION TEST');
console.log('=' .repeat(50));

async function testDuplicateDetection() {
  try {
    // Test unique email/mobile for this test
    const testEmail = `duplicate-test-${Date.now()}@example.com`;
    const testMobile = `+1555${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
    
    console.log(`📧 Test Email: ${testEmail}`);
    console.log(`📱 Test Mobile: ${testMobile}`);
    
    // Get initial count
    let response = await fetch(`${API_BASE_URL}/api/waitlist/count`);
    const initialCount = await response.json();
    console.log(`\n📊 Initial count: ${initialCount.count}`);
    
    // Test 1: Add email first time (should succeed)
    console.log('\n1️⃣ Adding email first time...');
    response = await fetch(`${API_BASE_URL}/api/waitlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'email',
        email: testEmail,
        firstName: 'First',
        lastName: 'Time'
      })
    });
    const firstEmailResult = await response.json();
    console.log('✅ First email result:', firstEmailResult);
    
    // Check count after first add
    response = await fetch(`${API_BASE_URL}/api/waitlist/count`);
    const countAfterFirst = await response.json();
    console.log(`📈 Count after first add: ${countAfterFirst.count} (increased by ${countAfterFirst.count - initialCount.count})`);
    
    // Test 2: Try adding same email again (should detect duplicate)
    console.log('\n2️⃣ Trying to add same email again...');
    response = await fetch(`${API_BASE_URL}/api/waitlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'email',
        email: testEmail,
        firstName: 'Duplicate',
        lastName: 'Attempt'
      })
    });
    const duplicateEmailResult = await response.json();
    console.log('📧 Duplicate email result:', duplicateEmailResult);
    
    // Check count after duplicate attempt
    response = await fetch(`${API_BASE_URL}/api/waitlist/count`);
    const countAfterDuplicate = await response.json();
    console.log(`📊 Count after duplicate: ${countAfterDuplicate.count} (should be same as before)`);
    
    const duplicateIncreased = countAfterDuplicate.count > countAfterFirst.count;
    if (duplicateIncreased) {
      console.log('⚠️  WARNING: Backend allowed duplicate - count increased!');
      console.log('   Frontend needs to implement duplicate detection.');
    } else {
      console.log('✅ GOOD: Duplicate was rejected - count did not increase.');
    }
    
    // Test 3: Add mobile number (should succeed)
    console.log('\n3️⃣ Adding mobile number...');
    response = await fetch(`${API_BASE_URL}/api/waitlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'mobile',
        mobile: testMobile,
        firstName: 'Mobile',
        lastName: 'User'
      })
    });
    const mobileResult = await response.json();
    console.log('✅ Mobile result:', mobileResult);
    
    // Test 4: Try adding same mobile again
    console.log('\n4️⃣ Trying to add same mobile again...');
    response = await fetch(`${API_BASE_URL}/api/waitlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'mobile',
        mobile: testMobile,
        firstName: 'Duplicate',
        lastName: 'Mobile'
      })
    });
    const duplicateMobileResult = await response.json();
    console.log('📱 Duplicate mobile result:', duplicateMobileResult);
    
    // Final count check
    response = await fetch(`${API_BASE_URL}/api/waitlist/count`);
    const finalCount = await response.json();
    console.log(`\n📊 Final count: ${finalCount.count}`);
    console.log(`📈 Total increase: ${finalCount.count - initialCount.count}`);
    
    // Analysis
    console.log('\n🔍 ANALYSIS:');
    console.log('===========');
    if (finalCount.count - initialCount.count > 2) {
      console.log('❌ Backend allows duplicates - frontend must handle detection');
      console.log('🔧 Frontend needs to implement count-based duplicate detection');
      return false;
    } else {
      console.log('✅ Duplicate detection working (either backend or frontend)');
      return true;
    }
    
  } catch (error) {
    console.error('❌ Test Error:', error.message);
    return false;
  }
}

// Run test
testDuplicateDetection().then(success => {
  if (!success) {
    console.log('\n🚨 DUPLICATE DETECTION NEEDS FIXING!');
  } else {
    console.log('\n✅ DUPLICATE DETECTION IS WORKING!');
  }
});
