# Complete Deployment Automation Script
# This script will guide you through the entire deployment process

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Employee Management System Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Git status
Write-Host "Step 1: Checking Git status..." -ForegroundColor Yellow
$gitStatus = git status --short
if ($gitStatus) {
    Write-Host "⚠️  You have uncommitted changes!" -ForegroundColor Red
    $commit = Read-Host "Do you want to commit them now? (y/n)"
    if ($commit -eq "y" -or $commit -eq "Y") {
        git add .
        $message = Read-Host "Enter commit message (or press Enter for default)"
        if ([string]::IsNullOrWhiteSpace($message)) {
            $message = "Prepare for deployment"
        }
        git commit -m $message
        Write-Host "✓ Changes committed!" -ForegroundColor Green
    }
} else {
    Write-Host "✓ All changes committed!" -ForegroundColor Green
}
Write-Host ""

# Step 2: GitHub Setup
Write-Host "Step 2: GitHub Repository Setup" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow
Write-Host ""

$hasRemote = git remote -v
if ($hasRemote) {
    Write-Host "✓ Remote repository already configured:" -ForegroundColor Green
    git remote -v
    Write-Host ""
    $push = Read-Host "Do you want to push to GitHub now? (y/n)"
    if ($push -eq "y" -or $push -eq "Y") {
        Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
        git push -u origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Code pushed successfully!" -ForegroundColor Green
        }
    }
} else {
    Write-Host "⚠️  No GitHub remote configured yet." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To set up GitHub:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
    Write-Host "2. Create a new repository (name: employee-management-system)" -ForegroundColor White
    Write-Host "3. DO NOT initialize with README, .gitignore, or license" -ForegroundColor White
    Write-Host "4. Then run: .\setup-github.ps1" -ForegroundColor White
    Write-Host ""
    $setup = Read-Host "Have you created the GitHub repository? (y/n)"
    if ($setup -eq "y" -or $setup -eq "Y") {
        .\setup-github.ps1
    }
}
Write-Host ""

# Step 3: MongoDB Atlas Setup
Write-Host "Step 3: MongoDB Atlas Setup" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow
Write-Host ""
Write-Host "To set up MongoDB Atlas:" -ForegroundColor Cyan
Write-Host "1. Go to: https://www.mongodb.com/cloud/atlas/register" -ForegroundColor White
Write-Host "2. Create a free account" -ForegroundColor White
Write-Host "3. Create a free cluster (M0 - 512MB)" -ForegroundColor White
Write-Host "4. Create database user (username: employee, password: employee123)" -ForegroundColor White
Write-Host "5. Network Access: Add IP 0.0.0.0/0 (Allow from anywhere)" -ForegroundColor White
Write-Host "6. Get connection string from: Connect → Drivers → Node.js" -ForegroundColor White
Write-Host ""
Write-Host "Your connection string should look like:" -ForegroundColor Yellow
Write-Host "mongodb+srv://employee:employee123@cluster0.xxxxx.mongodb.net/employeeDB?retryWrites=true&w=majority" -ForegroundColor Gray
Write-Host ""
$mongoDone = Read-Host "Have you set up MongoDB Atlas? (y/n)"
if ($mongoDone -eq "n" -or $mongoDone -eq "N") {
    Write-Host "Please set up MongoDB Atlas first, then continue with deployment." -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Vercel Deployment Instructions
Write-Host "Step 4: Vercel Deployment" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Deployment Checklist:" -ForegroundColor Cyan
Write-Host ""
Write-Host "BACKEND DEPLOYMENT:" -ForegroundColor Yellow
Write-Host "  [ ] Go to: https://vercel.com" -ForegroundColor White
Write-Host "  [ ] Sign in with GitHub" -ForegroundColor White
Write-Host "  [ ] Click 'Add New Project'" -ForegroundColor White
Write-Host "  [ ] Import your repository" -ForegroundColor White
Write-Host "  [ ] Framework: Other" -ForegroundColor White
Write-Host "  [ ] Root Directory: server" -ForegroundColor White
Write-Host "  [ ] Environment Variables:" -ForegroundColor White
Write-Host "      - MONGO_URI = (your MongoDB connection string)" -ForegroundColor Gray
Write-Host "      - PORT = 5000" -ForegroundColor Gray
Write-Host "      - FRONTEND_URL = (leave empty for now)" -ForegroundColor Gray
Write-Host "  [ ] Click Deploy" -ForegroundColor White
Write-Host "  [ ] Copy your backend URL" -ForegroundColor White
Write-Host ""
Write-Host "FRONTEND DEPLOYMENT:" -ForegroundColor Yellow
Write-Host "  [ ] In Vercel, click 'Add New Project' again" -ForegroundColor White
Write-Host "  [ ] Import the same repository" -ForegroundColor White
Write-Host "  [ ] Framework: Vite" -ForegroundColor White
Write-Host "  [ ] Root Directory: frontend" -ForegroundColor White
Write-Host "  [ ] Environment Variable:" -ForegroundColor White
Write-Host "      - VITE_API_URL = https://your-backend-url.vercel.app/api" -ForegroundColor Gray
Write-Host "  [ ] Click Deploy" -ForegroundColor White
Write-Host "  [ ] Copy your frontend URL" -ForegroundColor White
Write-Host ""
Write-Host "UPDATE ENVIRONMENT VARIABLES:" -ForegroundColor Yellow
Write-Host "  [ ] Update FRONTEND_URL in backend with your frontend URL" -ForegroundColor White
Write-Host "  [ ] Redeploy both projects" -ForegroundColor White
Write-Host ""

# Step 5: Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Code is ready and committed" -ForegroundColor Green
Write-Host "✅ Deployment files created (vercel.json)" -ForegroundColor Green
Write-Host "✅ Helper scripts created" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create GitHub repository (if not done)" -ForegroundColor White
Write-Host "2. Run: .\setup-github.ps1" -ForegroundColor White
Write-Host "3. Set up MongoDB Atlas" -ForegroundColor White
Write-Host "4. Deploy to Vercel (follow checklist above)" -ForegroundColor White
Write-Host ""
Write-Host "📚 Detailed guides:" -ForegroundColor Cyan
Write-Host "   - NEXT_STEPS.md (complete step-by-step guide)" -ForegroundColor White
Write-Host "   - DEPLOYMENT.md (deployment documentation)" -ForegroundColor White
Write-Host "   - QUICK_START.md (quick reference)" -ForegroundColor White
Write-Host ""
Write-Host "Need help? Check the guides or ask for assistance!" -ForegroundColor Yellow
Write-Host ""

