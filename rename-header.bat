@echo off
echo ===================================================
echo UB-Reader - Fix Header Component Issue
echo ===================================================
echo This script will:
echo 1. Rename the problematic Header.tsx file to Header.old.tsx
echo 2. Verify our new minimal/Header.tsx is in place
echo 3. Commit and push changes
echo.
echo Press Ctrl+C to cancel or any key to continue...
pause > nul

cd deploy-ub-reader

echo.
echo Renaming problematic Header.tsx to Header.old.tsx...
ren app\components\Header.tsx Header.old.tsx

echo.
echo Verifying minimal Header.tsx exists...
if exist app\components\minimal\Header.tsx (
    echo Minimal Header.tsx exists, this is good.
) else (
    echo WARNING: Minimal Header.tsx doesn't exist! This may cause problems.
    echo Please check app\components\minimal\Header.tsx
)

echo.
echo Checking app\page.tsx to ensure it uses the minimal Header...
findstr /C:"import Header from './components/minimal/Header'" app\page.tsx
if %ERRORLEVEL% EQU 0 (
    echo Page correctly imports from minimal/Header - good!
) else (
    echo WARNING: Page might not be using the minimal Header!
    echo Please check app\page.tsx imports.
)

echo.
echo Committing changes...
git add app\components\Header.old.tsx
git add -u app\components\Header.tsx
git commit -m "Rename problematic Header.tsx to avoid build errors"

echo.
echo Pushing changes to GitHub...
git push

echo.
echo ===================================================
echo Done! Now the build should no longer try to use the
echo problematic Header.tsx component.
echo.
echo Wait a few minutes and check Vercel for a new build.
echo ===================================================
