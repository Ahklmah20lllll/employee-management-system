# MongoDB Atlas Setup - Step by Step

## ✅ Step 1: Create a Cluster (2 minutes)

1. After logging into MongoDB Atlas, you should see a welcome screen
2. Click **"Build a Database"** button (or "Create" → "Database")
3. Choose **FREE (M0)** tier (512 MB storage)
4. Select **AWS** as your cloud provider
5. Choose a region closest to you (e.g., **Singapore**, **N. Virginia**, etc.)
6. Click **"Create Deployment"**
7. Wait 1-2 minutes for the cluster to be created

---

## ✅ Step 2: Create Database User (1 minute)

1. You'll see a security setup screen
2. **Username:** Enter `employee` (or your choice)
3. **Password:** Create a strong password (SAVE THIS - you'll need it!)
   - Example: `Employee123!@#`
4. Click **"Create Database User"**

---

## ✅ Step 3: Configure Network Access (1 minute)

1. On the security setup screen, you'll see "Where would you like to connect from?"
2. Click **"My Local Environment"** or **"Add My Current IP Address"**
3. **OR** for easier deployment, click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` which allows all IPs
   - Click **"Add Entry"** and then **"Finish and Close"**

---

## ✅ Step 4: Get Connection String (2 minutes)

1. Click **"Connect"** button on your cluster
2. Select **"Drivers"** (not "MongoDB Shell" or "MongoDB Compass")
3. Choose **"Node.js"** as the driver
4. Select version **5.5 or later**
5. You'll see a connection string that looks like:
   ```
   mongodb+srv://employee:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **IMPORTANT:** Click **"Copy"** to copy the connection string
7. **IMPORTANT:** Replace `<password>` with your actual password
8. **IMPORTANT:** Add database name after `.net/` and before `?`:
   ```
   mongodb+srv://employee:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/employeeDB?retryWrites=true&w=majority
   ```

**Example of final connection string:**
```
mongodb+srv://employee:Employee123!@#@cluster0.abc123.mongodb.net/employeeDB?retryWrites=true&w=majority
```

---

## ✅ Step 5: Save Your Connection String

**SAVE THIS CONNECTION STRING** - you'll need it when deploying to Vercel!

You can:
- Copy it to a text file
- Save it in a password manager
- Keep it handy for the next step

---

## 🎯 Next Steps

Once you have your connection string, you're ready to:
1. Deploy your backend to Vercel
2. Add the connection string as an environment variable

See `DEPLOY_NOW.md` for the next steps!

---

## 🆘 Troubleshooting

**Can't find "Build a Database" button?**
- Look for "Create" → "Database" in the top menu
- Or go to: https://cloud.mongodb.com/v2

**Connection string not working?**
- Make sure you replaced `<password>` with your actual password
- Make sure you added the database name (`employeeDB`)
- Check that network access allows your IP (or `0.0.0.0/0`)

**Need to change password?**
- Go to "Database Access" → Click on your user → "Edit" → Change password

