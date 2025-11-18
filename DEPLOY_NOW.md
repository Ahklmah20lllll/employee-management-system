# 🚀 DEPLOY NOW - Step-by-Step Guide

## ✅ Step 1: MongoDB Atlas Setup (5 minutes)

### 1.1 Create Account & Cluster
1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up (or sign in if you have an account)
3. Click **"Build a Database"**
4. Select **FREE (M0)** tier
5. Choose **AWS** as provider
6. Select region closest to you (e.g., **Singapore**)
7. Click **"Create Deployment"**

### 1.2 Create Database User
1. Username: `employee`
2. Password: Create a strong password (save it!)
3. Click **"Create Database User"**

### 1.3 Configure Network Access
1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
4. Click **"Confirm"**

### 1.4 Get Connection String
1. Click **"Database"** in left sidebar
2. Click **"Connect"** on your cluster
3. Select **"Drivers"**
4. Choose **"Node.js"** and version **5.5 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://employee:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **IMPORTANT:** Replace `<password>` with your actual password
7. **IMPORTANT:** Add database name after `.net/` and before `?`:
   ```
   mongodb+srv://employee:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/employeeDB?retryWrites=true&w=majority
   ```
8. **SAVE THIS STRING** - you'll need it for Vercel!

---

## ✅ Step 2: Deploy Backend to Vercel (5 minutes)

### 2.1 Create Vercel Account
1. Go to: **https://vercel.com/signup**
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your GitHub

### 2.2 Import Backend Project
1. Go to: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Find and select: **`Ahklmah20lllll/employee-management-system`**
4. Click **"Import"**

### 2.3 Configure Backend Project
1. **Project Name:** `employee-management-system-backend` (or your choice)
2. **Root Directory:** Click **"Edit"** and set to: `server`
3. **Framework Preset:** Select **"Other"**
4. **Build Command:** Leave empty (or `npm install`)
5. **Output Directory:** Leave empty
6. **Install Command:** `npm install`
7. **Development Command:** Leave empty

### 2.4 Add Environment Variables
Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `MONGO_URI` | `mongodb+srv://employee:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/employeeDB?retryWrites=true&w=majority` |
| `PORT` | `5000` |
| `FRONTEND_URL` | `https://your-frontend.vercel.app` (update after frontend deploys) |

**Note:** Replace `YOUR_PASSWORD` and the cluster URL with your actual MongoDB connection string!

### 2.5 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. **Copy your backend URL** (e.g., `https://employee-management-system-backend.vercel.app`)
4. **SAVE THIS URL** - you'll need it for the frontend!

---

## ✅ Step 3: Deploy Frontend to Vercel (5 minutes)

### 3.1 Import Frontend Project
1. Go to: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Find and select: **`Ahklmah20lllll/employee-management-system`**
4. Click **"Import"**

### 3.2 Configure Frontend Project
1. **Project Name:** `employee-management-system-frontend` (or your choice)
2. **Root Directory:** Click **"Edit"** and set to: `frontend`
3. **Framework Preset:** Select **"Vite"** (should auto-detect)
4. **Build Command:** `npm run build` (should auto-fill)
5. **Output Directory:** `dist` (should auto-fill)
6. **Install Command:** `npm install`

### 3.3 Add Environment Variables
Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://your-backend.vercel.app/api` |

**IMPORTANT:** Replace `your-backend.vercel.app` with your actual backend URL from Step 2.5!

### 3.4 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. **Copy your frontend URL** (e.g., `https://employee-management-system-frontend.vercel.app`)

---

## ✅ Step 4: Update Backend with Frontend URL (2 minutes)

### 4.1 Update Backend Environment
1. Go to your **backend project** on Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Find `FRONTEND_URL`
4. Click **"Edit"**
5. Update value to your frontend URL: `https://your-frontend.vercel.app`
6. Click **"Save"**

### 4.2 Redeploy Backend
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for redeployment to complete

---

## ✅ Step 5: Test Your Deployment

1. Open your frontend URL in a browser
2. Try to login or access the application
3. Check browser console for any errors
4. Check Vercel deployment logs if there are issues

---

## 🎉 Congratulations!

Your Employee Management System is now live!

- **Frontend:** `https://your-frontend.vercel.app`
- **Backend:** `https://your-backend.vercel.app`
- **GitHub:** `https://github.com/Ahklmah20lllll/employee-management-system`

---

## 🆘 Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB connection string is correct
- Verify network access allows `0.0.0.0/0`
- Check environment variables in Vercel

### Frontend can't reach backend
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Verify `FRONTEND_URL` in backend matches frontend URL

### Build errors
- Check Vercel build logs
- Verify all dependencies are in `package.json`
- Check for syntax errors in code

---

## 📝 Quick Reference

**MongoDB Atlas:**
- Dashboard: https://cloud.mongodb.com/
- Connection String Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

**Vercel:**
- Dashboard: https://vercel.com/dashboard
- Documentation: https://vercel.com/docs

**Your Repository:**
- GitHub: https://github.com/Ahklmah20lllll/employee-management-system

