# Connecting to MongoDB Atlas

To connect your application to MongoDB Atlas, you need to complete these steps:

## 1. Whitelist Your IP Address

The error message indicates that your current IP address is not allowed to access your MongoDB Atlas cluster. Follow these steps to whitelist your IP:

1. Log in to your MongoDB Atlas account at https://cloud.mongodb.com
2. Navigate to your project/cluster
3. Click on the "Network Access" tab in the left sidebar
4. Click "Add IP Address" button
5. Options:
   - Add your current IP: Click "Add Current IP Address"
   - For development: Click "Allow Access from Anywhere" (adds 0.0.0.0/0) - **not recommended for production**
6. Click "Confirm"

## 2. Verify Your Connection String

Your connection string in the `.env` file is:
```
mongodb+srv://sh1vam:balAji%4075172004M@sh1vam.triugrp.mongodb.net/tabsye?retryWrites=true&w=majority
```

Make sure:
- The username is correct (sh1vam)
- The password is correctly URL-encoded (special characters like @ become %40)
- The cluster name is correct (sh1vam.triugrp.mongodb.net)
- The database name is specified (tabsye)

## 3. Test the Connection

After whitelisting your IP:

1. Run the test script again:
```bash
node direct-mongodb-test.js
```

2. If successful, you should see:
```
Attempting to connect to MongoDB...
✅ Connected to MongoDB successfully!
```

3. Then restart your backend server:
```bash
./run-backend.sh
```

## Troubleshooting

If you still can't connect:

1. Double-check the username and password
2. Ensure your MongoDB Atlas cluster is active (not paused)
3. Check if you need to add any additional security settings in MongoDB Atlas
4. Verify your network connection doesn't block outgoing connections to MongoDB Atlas (port 27017)

## Next Steps

Once connected successfully:
- Your waitlist functionality will work properly
- Data will be stored in your MongoDB Atlas database
- You can monitor your database through the MongoDB Atlas dashboard
