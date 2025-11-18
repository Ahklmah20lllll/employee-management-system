# PowerShell script to set up GitHub remote
# Run this after creating your GitHub repository

Write-Host "=== GitHub Repository Setup ===" -ForegroundColor Cyan
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "Error: Username cannot be empty!" -ForegroundColor Red
    exit 1
}

# Get repository name
$repoName = Read-Host "Enter your repository name (default: employee-management-system)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "employee-management-system"
}

# Construct remote URL
$remoteUrl = "https://github.com/$username/$repoName.git"

Write-Host ""
Write-Host "Adding remote: $remoteUrl" -ForegroundColor Yellow

# Add remote
git remote add origin $remoteUrl

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Remote added successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Pushing code to GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✓ Code pushed successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Set up MongoDB Atlas (see DEPLOYMENT.md)"
        Write-Host "2. Deploy to Vercel (see DEPLOYMENT.md)"
    } else {
        Write-Host "Error: Failed to push code. Make sure the repository exists on GitHub." -ForegroundColor Red
    }
} else {
    Write-Host "Error: Failed to add remote. It might already exist." -ForegroundColor Red
    Write-Host "Run: git remote -v to check existing remotes" -ForegroundColor Yellow
}

