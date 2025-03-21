@echo off
echo Manual Deployment Script
echo ======================
echo.

echo 1. Checking Git status...
git status
echo.

echo 2. Checking Git remote...
git remote -v
echo.

echo 3. If no remote is configured, we'll set it up now...
if not "%errorlevel%"=="0" (
    echo Setting up remote...
    git remote add origin https://github.com/emen7/ecosystem.git
    echo Remote set to: https://github.com/emen7/ecosystem.git
)

echo 4. Adding files to track...
git add app/page.tsx
git add vercel-deploy/app/page.tsx
git add app/ui-fixes.css
git add app/components/ReadingArea.tsx
git add app/components/ui/EnhancedReadingArea.tsx
echo.

echo 5. Committing changes...
git commit -m "Fix home page and improve text layout"
echo.

echo 6. Pushing changes to main branch...
git push -u origin main
echo.

echo If push failed, an alternative approach is to try:
echo git push -f origin main
echo.

echo Done!
pause
