# Next Steps - Complete Deployment Guide

## ✅ What's Already Done
- ✅ Code is committed to Git
- ✅ Deployment files created (vercel.json)
- ✅ Environment variables configured
- ✅ All API calls updated to use environment variables

## 📋 Step-by-Step Instructions

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `employee-management-system` (or your choice)
3. Description: "Employee Management System - Full Stack Application"
4. **IMPORTANT:** Leave all checkboxes UNCHECKED (no README, no .gitignore, no license)
5. Click "Create repository"

### Step 2: Push Code to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/employee-management-system.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 3: Set Up MongoDB Atlas

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new project: "Employee Management System"
4. Build a Database → Choose FREE tier (M0)
5. Create Database User:
   - Username: `employee`
   - Password: `employee123` (or your choice - save it!)
6. Network Access:
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
7. Get Connection String:
   - Click "Connect" → "Drivers" → "Node.js"
   - Copy the connection string
   - Replace `<password>` with your password
   - Add database name: `employeeDB` (after `/` and before `?`)
   - Example: `mongodb+srv://employee:employee123@cluster0.xxxxx.mongodb.net/employeeDB?retryWrites=true&w=majority`

### Step 4: Deploy Backend to Vercel

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository: `employee-management-system`
5. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `server`
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
   - **Install Command:** `npm install`
6. Environment Variables (click "Add"):
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `PORT` = `5000`
   - `FRONTEND_URL` = (leave empty for now)
7. Click "Deploy"
8. **Copy your backend URL** (e.g., `https://employee-api.vercel.app`)

### Step 5: Deploy Frontend to Vercel

1. In Vercel, click "Add New Project" again
2. Import the same repository: `employee-management-system`
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
4. Environment Variables:
   - `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
   - (Use the backend URL from Step 4)
5. Click "Deploy"
6. **Copy your frontend URL** (e.g., `https://employee-frontend.vercel.app`)

### Step 6: Update Environment Variables

1. **Update Backend:**
   - Go to your backend project in Vercel
   - Settings → Environment Variables
   - Update `FRONTEND_URL` = Your frontend URL from Step 5
   - Click "Redeploy"

2. **Update Frontend (if needed):**
   - Go to your frontend project in Vercel
   - Settings → Environment Variables
   - Verify `VITE_API_URL` is correct
   - Click "Redeploy" if you changed it

### Step 7: Test Your Deployment

1. Visit your frontend URL
2. Try logging in
3. Test all features

## 🎉 You're Done!

Your Employee Management System is now live on the internet!

## 📝 Quick Command Reference

```bash
# Add GitHub remote (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/employee-management-system.git

# Push to GitHub
git push -u origin main

# Check status
git status

# View remotes
git remote -v
```

## 🔧 Troubleshooting

- **Port conflicts:** Kill processes using the ports
- **MongoDB connection:** Make sure IP is whitelisted (0.0.0.0/0)
- **CORS errors:** Check that FRONTEND_URL matches your frontend domain
- **API errors:** Verify VITE_API_URL is correct in frontend

