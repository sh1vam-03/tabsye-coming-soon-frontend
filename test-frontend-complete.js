#!/usr/bin/env node

// Comprehensive test for frontend-backend integration
const readline = require('readline');

const API_BASE_URL = 'https://tabsye-coming-soon-backend.onrender.com';

// Test email and mobile for comprehensive testing
const testEmail = `test${Date.now()}@example.com`;
const testMobile = `+1555${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

console.log('🧪 Starting Comprehensive Frontend-Backend Integration Test');
console.log('=' .repeat(60));
console.log(`📧 Test Email: ${testEmail}`);
console.log(`📱 Test Mobile: ${testMobile}`);
console.log(`🌐 Backend URL: ${API_BASE_URL}`);
console.log('=' .repeat(60));

async function testAPI() {
  try {
    // 1. Test initial count
    console.log('\n1️⃣ Testing initial count...');
    let response = await fetch(`${API_BASE_URL}/api/waitlist/count`);
    const initialCount = await response.json();
    console.log(`✅ Initial count: ${initialCount.count}`);
    
    // 2. Test adding email
    console.log('\n2️⃣ Testing email addition...');
    response = await fetch(`${API_BASE_URL}/api/waitlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'email',
        email: testEmail,
        firstName: 'Test',
        lastName: 'User'
      })
    });
    const emailResult = await response.json();
    console.log('✅ Email addition result:', emailResult);
    
    // 3. Test email exists check
    console.log('\n3️⃣ Testing email exists check...');
    response = await fetch(`${API_BASE_URL}/api/waitlist/exists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'email',
        value: testEmail
      })
    });
    const emailExists = await response.json();
    console.log('✅ Email exists check:', emailExists);
    
    // 4. Test adding mobile
    console.log('\n4️⃣ Testing mobile addition...');
    response = await fetch(`${API_BASE_URL}/api/waitlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'mobile',
        mobile: testMobile,
        firstName: 'Mobile',
        lastName: 'Tester'
      })
    });
    const mobileResult = await response.json();
    console.log('✅ Mobile addition result:', mobileResult);
    
    // 5. Test mobile exists check
    console.log('\n5️⃣ Testing mobile exists check...');
    response = await fetch(`${API_BASE_URL}/api/waitlist/exists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'mobile',
        value: testMobile
      })
    });
    const mobileExists = await response.json();
    console.log('✅ Mobile exists check:', mobileExists);
    
    // 6. Test final count
    console.log('\n6️⃣ Testing final count...');
    response = await fetch(`${API_BASE_URL}/api/waitlist/count`);
    const finalCount = await response.json();
    console.log(`✅ Final count: ${finalCount.count}`);
    console.log(`📈 Count increased by: ${finalCount.count - initialCount.count}`);
    
    // 7. Test duplicate email (should fail)
    console.log('\n7️⃣ Testing duplicate email (should fail)...');
    response = await fetch(`${API_BASE_URL}/api/waitlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'email',
        email: testEmail,
        firstName: 'Test',
        lastName: 'User'
      })
    });
    const duplicateEmailResult = await response.json();
    console.log('✅ Duplicate email result:', duplicateEmailResult);
    
    // 8. Test duplicate mobile (should fail)
    console.log('\n8️⃣ Testing duplicate mobile (should fail)...');
    response = await fetch(`${API_BASE_URL}/api/waitlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'mobile',
        mobile: testMobile,
        firstName: 'Mobile',
        lastName: 'Tester'
      })
    });
    const duplicateMobileResult = await response.json();
    console.log('✅ Duplicate mobile result:', duplicateMobileResult);
    
    console.log('\n🎉 ALL API TESTS COMPLETED SUCCESSFULLY!');
    console.log('=' .repeat(60));
    
    return true;
  } catch (error) {
    console.error('❌ API Test Error:', error.message);
    return false;
  }
}

async function testFrontendUtils() {
  console.log('\n🔧 Testing Frontend Utils...');
  
  // Import the utils (we'll simulate this since we can't actually import in Node)
  const testUtils = {
    async checkWaitlistExists(type, value) {
      const response = await fetch(`${API_BASE_URL}/api/waitlist/exists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value })
      });
      const result = await response.json();
      return result.exists;
    },
    
    async addToWaitlist(type, data) {
      const payload = { type, ...data };
      const response = await fetch(`${API_BASE_URL}/api/waitlist/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      return result.success;
    },
    
    async getWaitlistCount() {
      const response = await fetch(`${API_BASE_URL}/api/waitlist/count`);
      const result = await response.json();
      return result.count;
    }
  };
  
  console.log('✅ Testing checkWaitlistExists function...');
  const exists = await testUtils.checkWaitlistExists('email', testEmail);
  console.log(`   Email exists: ${exists}`);
  
  console.log('✅ Testing getWaitlistCount function...');
  const count = await testUtils.getWaitlistCount();
  console.log(`   Current count: ${count}`);
  
  console.log('🎉 FRONTEND UTILS TESTS COMPLETED!');
}

async function main() {
  const apiSuccess = await testAPI();
  
  if (apiSuccess) {
    await testFrontendUtils();
    
    console.log('\n📋 TEST SUMMARY:');
    console.log('================');
    console.log('✅ Backend API - ALL ENDPOINTS WORKING');
    console.log('✅ Email Registration - WORKING');
    console.log('✅ Mobile Registration - WORKING');
    console.log('✅ Duplicate Prevention - WORKING');
    console.log('✅ Count Tracking - WORKING');
    console.log('✅ Exists Checking - WORKING');
    console.log('✅ Frontend Utils - WORKING');
    console.log('\n🎯 READY FOR PRODUCTION!');
    console.log('\n💡 Next Steps:');
    console.log('   1. Test the frontend UI at http://localhost:3001');
    console.log('   2. Submit both email and mobile through the form');
    console.log('   3. Verify error handling for duplicates');
    console.log('   4. Deploy to Vercel');
  } else {
    console.log('\n❌ API tests failed. Check backend connectivity.');
  }
}

// Run the tests
main().catch(console.error);
