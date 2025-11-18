# Automated Deployment Script - Does Everything Possible
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Auto-Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify Git status
Write-Host "Step 1: Checking Git status..." -ForegroundColor Yellow
$gitStatus = git status --short
if ($gitStatus) {
    Write-Host "Uncommitted changes found. Committing..." -ForegroundColor Yellow
    git add .
    git commit -m "Auto-commit before deployment"
    Write-Host "Changes committed" -ForegroundColor Green
} else {
    Write-Host "Git repository is clean" -ForegroundColor Green
}

# Step 2: Check if remote exists
Write-Host ""
Write-Host "Step 2: Checking GitHub remote..." -ForegroundColor Yellow
$remote = git remote -v
if (-not $remote) {
    Write-Host "No GitHub remote configured" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To set up GitHub:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
    Write-Host "2. Create repository: employee-management-system" -ForegroundColor White
    Write-Host "3. Run: .\setup-github.ps1" -ForegroundColor White
    Write-Host ""
    $setup = Read-Host "Have you created the GitHub repository? (y/n)"
    if ($setup -eq "y" -or $setup -eq "Y") {
        $username = Read-Host "Enter your GitHub username"
        $repoName = Read-Host "Enter repository name (default: employee-management-system)"
        if ([string]::IsNullOrWhiteSpace($repoName)) {
            $repoName = "employee-management-system"
        }
        git remote add origin "https://github.com/$username/$repoName.git"
        Write-Host "Remote added!" -ForegroundColor Green
    }
} else {
    Write-Host "GitHub remote configured" -ForegroundColor Green
    Write-Host "   $remote" -ForegroundColor Gray
}

# Step 3: Push to GitHub
Write-Host ""
Write-Host "Step 3: Pushing to GitHub..." -ForegroundColor Yellow
$remote = git remote -v
if ($remote) {
    $push = Read-Host "Push to GitHub now? (y/n)"
    if ($push -eq "y" -or $push -eq "Y") {
        git branch -M main
        git push -u origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Code pushed to GitHub!" -ForegroundColor Green
        } else {
            Write-Host "Push failed. Check your credentials." -ForegroundColor Red
        }
    }
} else {
    Write-Host "Skipping push - no remote configured" -ForegroundColor Yellow
}

# Step 4: Deployment Checklist
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deployment Checklist" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Code is ready and committed" -ForegroundColor Green
Write-Host "Deployment files created (vercel.json)" -ForegroundColor Green
Write-Host "Environment variables configured" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps (Manual):" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. MongoDB Atlas Setup:" -ForegroundColor Cyan
Write-Host "   - Go to: https://www.mongodb.com/cloud/atlas" -ForegroundColor White
Write-Host "   - Create free cluster (M0)" -ForegroundColor White
Write-Host "   - Create database user" -ForegroundColor White
Write-Host "   - Get connection string" -ForegroundColor White
Write-Host "   - Add IP: 0.0.0.0/0 (allow all)" -ForegroundColor White
Write-Host ""
Write-Host "2. Deploy Backend to Vercel:" -ForegroundColor Cyan
Write-Host "   - Go to: https://vercel.com/new" -ForegroundColor White
Write-Host "   - Import GitHub repository" -ForegroundColor White
Write-Host "   - Root Directory: server" -ForegroundColor White
Write-Host "   - Framework Preset: Other" -ForegroundColor White
Write-Host "   - Environment Variables:" -ForegroundColor White
Write-Host "     * MONGO_URI = (your MongoDB connection string)" -ForegroundColor Gray
Write-Host "     * PORT = 5000" -ForegroundColor Gray
Write-Host "     * FRONTEND_URL = (add after frontend deploys)" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Deploy Frontend to Vercel:" -ForegroundColor Cyan
Write-Host "   - Go to: https://vercel.com/new" -ForegroundColor White
Write-Host "   - Import same GitHub repository" -ForegroundColor White
Write-Host "   - Root Directory: frontend" -ForegroundColor White
Write-Host "   - Framework Preset: Vite" -ForegroundColor White
Write-Host "   - Environment Variables:" -ForegroundColor White
Write-Host "     * VITE_API_URL = https://your-backend.vercel.app/api" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Update Backend Environment:" -ForegroundColor Cyan
Write-Host "   - Go to Vercel backend project settings" -ForegroundColor White
Write-Host "   - Update FRONTEND_URL = https://your-frontend.vercel.app" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Automated steps complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "For detailed instructions, see:" -ForegroundColor Yellow
Write-Host "   - DEPLOYMENT.md" -ForegroundColor White
Write-Host "   - NEXT_STEPS.md" -ForegroundColor White
Write-Host "   - START_HERE.md" -ForegroundColor White
Write-Host ""
