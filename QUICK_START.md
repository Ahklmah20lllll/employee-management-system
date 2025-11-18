# Quick Start Commands

## After Creating GitHub Repository

Run these commands (replace YOUR_USERNAME and REPO_NAME):

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

## Environment Variables Needed

### Backend (Vercel):
- `MONGO_URI` = mongodb+srv://employee:employee123@cluster0.xxxxx.mongodb.net/employeeDB?retryWrites=true&w=majority
- `PORT` = 5000
- `FRONTEND_URL` = https://your-frontend.vercel.app (add after frontend deploys)

### Frontend (Vercel):
- `VITE_API_URL` = https://your-backend.vercel.app/api

