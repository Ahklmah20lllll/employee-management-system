# Employee Management System

A full-stack Employee Management System built with React, Node.js, Express, and MongoDB.

## Features

- 👥 Employee Management
- 🏢 Department Management
- 📅 Leave Management
- 💰 Salary Management
- 👤 User Authentication
- 📊 Admin Dashboard
- 📱 Employee Dashboard

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Deployment:** Vercel

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/employee-management-system.git
cd employee-management-system
```

2. Install dependencies:

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

3. Set up environment variables:

**Backend (`server/.env`):**
```env
MONGO_URI=mongodb://127.0.0.1:27017/ems
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Frontend (Vercel Environment Variables):**
```
VITE_API_URL=http://localhost:5000/api
```

4. Run the application:

**Start Backend:**
```bash
npm start
# or
cd server && npm start
```

**Start Frontend:**
```bash
cd frontend && npm run dev
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deployment Steps:

1. **Push to GitHub:**
   - Create a repository on GitHub
   - Run: `.\setup-github.ps1` (PowerShell) or follow manual steps

2. **Deploy to Vercel:**
   - Deploy backend first
   - Deploy frontend second
   - Update environment variables

3. **Set up MongoDB Atlas:**
   - Create free cluster
   - Get connection string
   - Add to Vercel environment variables

## Project Structure

```
Employee Management System/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── context/
│   └── vercel.json
├── server/            # Node.js backend application
│   ├── controllers/
│   ├── routes/
│   ├── model/
│   ├── middlewares/
│   └── vercel.json
└── DEPLOYMENT.md      # Deployment guide
```

## API Endpoints

- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department
- `GET /api/employee/list` - Get all employees
- `POST /api/employee/create` - Create employee
- `POST /api/auth/login` - User login
- `POST /api/leave/add` - Add leave request
- `GET /api/leave/:id` - Get leaves by user
- `POST /api/salary/add` - Add salary record
- `GET /api/dashboard/summary` - Get dashboard summary

## License

MIT

## Author

Your Name

