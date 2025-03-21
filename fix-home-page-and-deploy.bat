@echo off
echo Fixing home page and deploying to Vercel...

REM Fix main app/page.tsx
echo Updating main app/page.tsx...
git add app/page.tsx

REM If vercel-deploy directory exists, update it too
if exist vercel-deploy\app\page.tsx (
    echo Updating vercel-deploy/app/page.tsx...
    
    REM Copy the updated page.tsx to the vercel-deploy directory
    copy /Y app\page.tsx vercel-deploy\app\page.tsx
    
    REM Add to git
    git add vercel-deploy/app/page.tsx
)

REM Commit changes
git commit -m "Fix home page to directly show Enhanced UI without redirecting"

REM Push to deploy
git push

echo Done!
pause
