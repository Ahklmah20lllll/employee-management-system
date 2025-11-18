# Deploy to Vercel - Step by Step

## ✅ Prerequisites
- ✅ MongoDB Atlas account created
- ✅ MongoDB cluster created
- ✅ Connection string ready
- ✅ GitHub repository: https://github.com/Ahklmah20lllll/employee-management-system

---

## 🚀 Step 1: Deploy Backend to Vercel (5 minutes)

### 1.1 Sign Up / Sign In to Vercel
1. Go to: **https://vercel.com/signup**
2. Click **"Continue with GitHub"** (recommended)
3. Authorize Vercel to access your GitHub account

### 1.2 Import Backend Project
1. After signing in, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories
3. Find and click **"Import"** on: `Ahklmah20lllll/employee-management-system`

### 1.3 Configure Backend Project
1. **Project Name:** `employee-management-system-backend` (or your choice)
2. **Root Directory:** 
   - Click **"Edit"** next to "Root Directory"
   - Change from `/` to: `server`
   - Click **"Continue"**
3. **Framework Preset:** Select **"Other"** from dropdown
4. **Build Command:** Leave empty
5. **Output Directory:** Leave empty
6. **Install Command:** `npm install` (should auto-fill)
7. Click **"Continue"**

### 1.4 Add Environment Variables
Click **"Environment Variables"** and add these one by one:

**Variable 1:**
- **Name:** `MONGO_URI`
- **Value:** Your MongoDB connection string
  - Example: `mongodb+srv://employee:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/employeeDB?retryWrites=true&w=majority`
- Click **"Add"**

**Variable 2:**
- **Name:** `PORT`
- **Value:** `5000`
- Click **"Add"**

**Variable 3:**
- **Name:** `FRONTEND_URL`
- **Value:** `https://your-frontend.vercel.app` (we'll update this later)
- Click **"Add"**

### 1.5 Deploy
1. Click **"Deploy"** button
2. Wait 2-3 minutes for deployment
3. **IMPORTANT:** Copy your backend URL (e.g., `https://employee-management-system-backend.vercel.app`)
4. **SAVE THIS URL** - you'll need it for the frontend!

---

## 🚀 Step 2: Deploy Frontend to Vercel (5 minutes)

### 2.1 Import Frontend Project
1. Go to: **https://vercel.com/new**
2. Find and click **"Import"** on: `Ahklmah20lllll/employee-management-system`
   - (Yes, same repository, different configuration!)

### 2.2 Configure Frontend Project
1. **Project Name:** `employee-management-system-frontend` (or your choice)
2. **Root Directory:**
   - Click **"Edit"** next to "Root Directory"
   - Change from `/` to: `frontend`
   - Click **"Continue"**
3. **Framework Preset:** Should auto-detect **"Vite"** (if not, select it)
4. **Build Command:** Should auto-fill as `npm run build`
5. **Output Directory:** Should auto-fill as `dist`
6. **Install Command:** `npm install` (should auto-fill)
7. Click **"Continue"**

### 2.3 Add Environment Variables
Click **"Environment Variables"** and add:

**Variable:**
- **Name:** `VITE_API_URL`
- **Value:** `https://your-backend.vercel.app/api`
  - **IMPORTANT:** Replace `your-backend.vercel.app` with your actual backend URL from Step 1.5!
  - Example: `https://employee-management-system-backend.vercel.app/api`
- Click **"Add"**

### 2.4 Deploy
1. Click **"Deploy"** button
2. Wait 2-3 minutes for deployment
3. **IMPORTANT:** Copy your frontend URL (e.g., `https://employee-management-system-frontend.vercel.app`)
4. **SAVE THIS URL** - you'll need it to update the backend!

---

## 🔄 Step 3: Update Backend with Frontend URL (2 minutes)

### 3.1 Update Backend Environment Variable
1. Go to your **backend project** on Vercel dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in left sidebar
4. Find `FRONTEND_URL` in the list
5. Click **"Edit"** (pencil icon)
6. Update the value to your actual frontend URL:
   - Example: `https://employee-management-system-frontend.vercel.app`
7. Click **"Save"**

### 3.2 Redeploy Backend
1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again
6. Wait for redeployment to complete (1-2 minutes)

---

## ✅ Step 4: Test Your Deployment

1. Open your **frontend URL** in a browser
2. You should see your Employee Management System
3. Try to:
   - Access the login page
   - Check if the app loads correctly
   - Test any features

---

## 🎉 Congratulations!

Your Employee Management System is now live!

- **Frontend:** `https://your-frontend.vercel.app`
- **Backend:** `https://your-backend.vercel.app`
- **GitHub:** `https://github.com/Ahklmah20lllll/employee-management-system`

---

## 🆘 Troubleshooting

### Backend deployment fails
- Check build logs in Vercel
- Verify MongoDB connection string is correct
- Make sure all environment variables are set

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct (should end with `/api`)
- Check that backend is deployed and running
- Verify `FRONTEND_URL` in backend matches frontend URL

### CORS errors
- Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
- Redeploy backend after updating `FRONTEND_URL`

---

## 📝 Quick Checklist

- [ ] Backend deployed to Vercel
- [ ] Backend URL saved
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL saved
- [ ] `VITE_API_URL` set to backend URL + `/api`
- [ ] `FRONTEND_URL` in backend updated to frontend URL
- [ ] Backend redeployed
- [ ] Application tested and working

