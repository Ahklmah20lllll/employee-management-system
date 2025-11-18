# Deployment Guide for Employee Management System

## Prerequisites
1. MongoDB Atlas account (free tier)
2. Vercel account (free tier)
3. GitHub account

## Step 1: Setup MongoDB Atlas

1. Create a new project in MongoDB Atlas
2. Create a free cluster (M0 - 512MB)
3. Create a database user:
   - Username: `employee`
   - Password: `employee123` (or your choice)
4. Get connection string:
   - Click "Connect" → "Drivers" → "Node.js"
   - Copy the connection string
   - Replace `<password>` with your password
   - Add database name: `employeeDB` (after `/` and before `?`)
5. Network Access:
   - Go to "Network Access"
   - Add IP Address: `0.0.0.0/0` (allows all IPs)

## Step 2: Update Environment Variables

### Server (.env file in `server/` directory)
```env
MONGO_URI=mongodb+srv://employee:employee123@cluster.mongodb.net/employeeDB?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=https://your-frontend-app.vercel.app
```

### Frontend (Environment Variable in Vercel)
- Variable Name: `VITE_API_URL`
- Value: `https://your-backend-app.vercel.app/api`

## Step 3: Deploy to Vercel

### Deploy Frontend:
1. Push frontend code to GitHub
2. Go to Vercel → "Add New Project"
3. Import your frontend repository
4. Framework Preset: **Vite**
5. Root Directory: `frontend` (if monorepo)
6. Environment Variables:
   - `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
7. Click "Deploy"

### Deploy Backend:
1. Push server code to GitHub
2. Go to Vercel → "Add New Project"
3. Import your server repository
4. Framework Preset: **Other**
5. Root Directory: `server` (if monorepo)
6. Build Command: (leave empty)
7. Output Directory: (leave empty)
8. Install Command: `npm install`
9. Environment Variables:
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `PORT` = `5000`
   - `FRONTEND_URL` = `https://your-frontend-app.vercel.app`
10. Click "Deploy"

## Step 4: Update URLs After Deployment

After both deployments complete:

1. **Update Server CORS:**
   - In `server/index.js`, the `FRONTEND_URL` environment variable should be set to your frontend Vercel URL
   - Redeploy the server after updating

2. **Update Frontend API URL:**
   - In Vercel dashboard, update the `VITE_API_URL` environment variable to your backend Vercel URL
   - Redeploy the frontend

## Step 5: Test the Deployment

1. Visit your frontend URL
2. Try logging in (use seed script to create admin user)
3. Test all features

## Files Created for Deployment

- `frontend/vercel.json` - Vercel configuration for React routing
- `server/vercel.json` - Vercel configuration for Node.js server
- `server/.gitignore` - Ignores node_modules and .env files
- Updated all API calls to use environment variables

## Notes

- The `vercel.json` in frontend handles React Router routing
- All API calls now use `VITE_API_URL` environment variable
- CORS is configured to allow requests from your frontend URL
- Make sure to update environment variables in Vercel dashboard after deployment

