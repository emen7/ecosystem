@echo off
:: Deployment Workaround Cleanup Script
:: This script removes files that were necessary for the old deployment approach
:: but are no longer needed with direct GitHub-Vercel integration

echo ===== Cleaning Up Old Deployment Files =====
echo.

:: Verify with user before proceeding
echo This script will remove deployment workaround files that are no longer needed.
echo The following directories and files will be removed:
echo  - vercel-deploy (old deployment directory)
echo  - clean-deploy (alternative deployment directory)
echo  - deploy-package (package deployment directory)
echo  - temp-check (temporary check directory)
echo  - *.bat files (except this cleanup script, github-push.bat, and test-theme-fix.bat)
echo  - deploy-manually.js, enforce-ts-ignore.js, find-theme-issues.js, fix-direct.js, etc.
echo.
echo Note: GitHub-Vercel integration has been set up, so these files are no longer needed.
echo.

:: Prompt for confirmation
set /p CONFIRM=Are you sure you want to proceed with cleanup? (y/n) 
if /i "%CONFIRM%" NEQ "y" (
  echo Operation cancelled
  goto :end
)

echo.
echo Removing old deployment directories...

:: Remove deployment directories
if exist vercel-deploy (
  rmdir /s /q vercel-deploy
  echo - Removed vercel-deploy directory
)

if exist clean-deploy (
  rmdir /s /q clean-deploy
  echo - Removed clean-deploy directory
)

if exist deploy-package (
  rmdir /s /q deploy-package
  echo - Removed deploy-package directory
)

if exist temp-check (
  rmdir /s /q temp-check
  echo - Removed temp-check directory
)

echo.
echo Removing old deployment scripts...

:: Keep important batch files
echo Not removing: github-push.bat, test-theme-fix.bat, cleanup-deployment-files.bat

:: Remove obsolete batch files
for %%f in (
  clone-and-check.bat
  deploy.bat
  final-deploy.bat
  rename-header.bat
  vercel-direct-deploy.bat
) do (
  if exist %%f (
    del %%f
    echo - Removed %%f
  )
)

:: Remove obsolete JS files
for %%f in (
  deploy-manually.js
  enforce-ts-ignore.js
  find-theme-issues.js
  fix-direct.js
  fix-theme-context.js
) do (
  if exist %%f (
    del %%f
    echo - Removed %%f
  )
)

:: Remove other obsolete files
if exist fix-section-jump-menu.txt (
  del fix-section-jump-menu.txt
  echo - Removed fix-section-jump-menu.txt
)

echo.
echo Cleanup complete! The repository now follows standard GitHub-Vercel structure.
echo Future deployments will happen automatically when pushing to GitHub.

:end
echo.
echo Press any key to exit...
pause > nul
