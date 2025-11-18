# Open all deployment pages in your browser
Write-Host "Opening deployment pages..." -ForegroundColor Cyan
Write-Host ""

# MongoDB Atlas
Write-Host "Opening MongoDB Atlas..." -ForegroundColor Yellow
Start-Process "https://www.mongodb.com/cloud/atlas/register"

Start-Sleep -Seconds 2

# Vercel
Write-Host "Opening Vercel..." -ForegroundColor Yellow
Start-Process "https://vercel.com/signup"

Start-Sleep -Seconds 2

# GitHub Repository
Write-Host "Opening GitHub Repository..." -ForegroundColor Yellow
Start-Process "https://github.com/Ahklmah20lllll/employee-management-system"

Start-Sleep -Seconds 2

# Deployment Guide
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Pages opened in your browser!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Follow DEPLOY_NOW.md for detailed instructions" -ForegroundColor White
Write-Host "2. Or use QUICK_DEPLOY_CHECKLIST.txt for quick reference" -ForegroundColor White
Write-Host ""
Write-Host "Files created:" -ForegroundColor Cyan
Write-Host "  - DEPLOY_NOW.md (detailed step-by-step guide)" -ForegroundColor White
Write-Host "  - QUICK_DEPLOY_CHECKLIST.txt (quick checklist)" -ForegroundColor White
Write-Host ""

