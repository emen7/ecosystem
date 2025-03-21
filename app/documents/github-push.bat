@echo off
:: GitHub Push Batch Script for Windows
:: This script commits all changes and pushes them to GitHub

echo ===== GitHub Push for Direct Vercel Integration =====
echo.

:: Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Error: Git is not installed
  exit /b 1
)

:: Check if we're in a git repository
git rev-parse --is-inside-work-tree >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Error: Not in a git repository
  echo Please run this script from within the project repository.
  exit /b 1
)

:: Verify the remote repository
echo Checking GitHub remote...
git remote -v | findstr /C:"origin" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Error: No GitHub remote found
  echo Setting up GitHub remote...
  git remote add origin https://github.com/emen7/ecosystem.git
) else (
  echo GitHub remote found
)

:: Show status of changes
echo Current status of changes:
git status

echo.
echo These changes will be committed:
echo 1. ThemeContext fixes in layout.tsx, page.tsx, and paper/[paperNumber]/page.tsx
echo 2. Documentation in app/documents/
echo 3. Setup scripts (wsl-repository-setup.sh, test-theme-fix.sh, github-push.sh)
echo 4. GitHub Actions workflow in .github/workflows/
echo 5. Updated .gitignore and README.md
echo.

:: Prompt for confirmation
set /p CONFIRM=Do you want to commit and push these changes? (y/n) 
if /i "%CONFIRM%" NEQ "y" (
  echo Operation cancelled
  exit /b 0
)

:: Add all files
echo Adding files...
git add .

:: Commit the changes
echo Committing changes...
git commit -m "Implement GitHub to Vercel deployment workflow with ThemeContext fixes"

:: Push to GitHub
echo Pushing to GitHub...
git push origin main

if %ERRORLEVEL% EQU 0 (
  echo Successfully pushed to GitHub!
  echo.
  echo Next steps:
  echo 1. Log in to your Vercel account
  echo 2. Create a new project and link it to your GitHub repository
  echo 3. Configure as described in app/documents/VERCEL-GITHUB-INTEGRATION.md
) else (
  echo Failed to push to GitHub
  echo Please check your GitHub credentials and try again.
)

pause
