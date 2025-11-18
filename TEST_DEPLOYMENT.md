# How to Test Your Deployment

## 🔍 Quick Check

### 1. Test Your Backend
Open your backend URL in a browser (e.g., `https://your-backend.vercel.app`)

**Expected Result:**
You should see JSON like:
```json
{
  "message": "Employee Management System API",
  "version": "1.0.0",
  "endpoints": {...}
}
```

**If you see this:** ✅ Backend is working!

**If you see an error:** Check Vercel deployment logs

---

### 2. Test Your Frontend
Open your frontend URL in a browser (e.g., `https://your-frontend.vercel.app`)

**Expected Result:**
- Page loads without errors
- You see the Employee Management System interface
- Login page or dashboard appears

**If you see this:** ✅ Frontend is working!

**If you see errors:**
- Open browser console (F12) to see error messages
- Check if `VITE_API_URL` is set correctly in Vercel

---

### 3. Test Full Application Flow

1. **Open Frontend URL**
   - Should load the application

2. **Try to Login**
   - If you have a user account, try logging in
   - If not, you may need to create one first

3. **Check Browser Console**
   - Press F12 to open developer tools
   - Look for any red error messages
   - Check Network tab to see if API calls are working

4. **Test API Connection**
   - Try accessing: `https://your-backend.vercel.app/api`
   - Should return API information

---

## 🎨 What Should It Look Like?

Your application should display:
- **Login Page** (if not logged in)
- **Dashboard** (after login)
- **Navigation/Sidebar** with menu items
- **Employee Management** features
- **Department Management** features
- **Leave Management** features
- **Salary Management** features

---

## 🆘 Common Issues

### Blank Page
- Check browser console for errors
- Verify frontend deployed successfully
- Check if `VITE_API_URL` is set correctly

### API Errors
- Verify backend is deployed and running
- Check `VITE_API_URL` matches your backend URL + `/api`
- Check CORS settings in backend

### Database Errors
- Verify MongoDB connection string is correct
- Check MongoDB Atlas network access
- Verify database user credentials

---

## 📸 Share Your Results

To help me see how it looks, you can:
1. Share your frontend URL
2. Describe what you see
3. Share any error messages
4. Take a screenshot (if possible)

---

## ✅ Success Checklist

- [ ] Backend URL shows API information
- [ ] Frontend URL loads the application
- [ ] No errors in browser console
- [ ] Login page appears (or dashboard if logged in)
- [ ] Navigation/menu is visible
- [ ] Application looks correct

---

## 🎯 Next Steps

Once everything looks good:
1. Test all features (create employee, department, etc.)
2. Create an admin user if needed
3. Customize the design if desired
4. Share your app with others!

