@echo off
echo WSL-Based Deployment Script
echo ==========================
echo.

echo 1. Checking WSL installation...
wsl.exe --status
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: WSL is not properly installed or configured.
  echo Please install WSL according to the WSL-DEPLOYMENT-GUIDE.md.
  goto :end
)

echo 2. Creating WSL deployment directory...
wsl.exe mkdir -p ~/ecosystem-deploy

echo 3. Copying files to WSL...
echo Copying ReadingArea.tsx...
wsl.exe cp -f "/mnt/c%CD:\=/%/app/components/ReadingArea.tsx" ~/ecosystem-deploy/ReadingArea.tsx

echo Copying ui-fixes.css...
wsl.exe cp -f "/mnt/c%CD:\=/%/app/ui-fixes.css" ~/ecosystem-deploy/ui-fixes.css

echo Copying EnhancedReadingArea.tsx...
wsl.exe cp -f "/mnt/c%CD:\=/%/app/components/ui/EnhancedReadingArea.tsx" ~/ecosystem-deploy/EnhancedReadingArea.tsx

echo Copying page.tsx...
wsl.exe cp -f "/mnt/c%CD:\=/%/app/page.tsx" ~/ecosystem-deploy/page.tsx

echo 4. Setting up Git in WSL...
wsl.exe bash -c "cd ~/ecosystem-deploy && git init && git config user.name 'WSL Deployment' && git config user.email 'wsl-deployment@example.com'"

echo 5. Cloning the repository in WSL...
wsl.exe bash -c "cd ~ && git clone https://github.com/emen7/ecosystem.git ecosystem-repo || (cd ecosystem-repo && git pull)"

echo 6. Copying modified files to the repository...
wsl.exe bash -c "cp -f ~/ecosystem-deploy/ReadingArea.tsx ~/ecosystem-repo/app/components/ReadingArea.tsx"
wsl.exe bash -c "cp -f ~/ecosystem-deploy/ui-fixes.css ~/ecosystem-repo/app/ui-fixes.css"
wsl.exe bash -c "cp -f ~/ecosystem-deploy/EnhancedReadingArea.tsx ~/ecosystem-repo/app/components/ui/EnhancedReadingArea.tsx"
wsl.exe bash -c "cp -f ~/ecosystem-deploy/page.tsx ~/ecosystem-repo/app/page.tsx"

echo 7. Committing and pushing changes...
wsl.exe bash -c "cd ~/ecosystem-repo && git add app/components/ReadingArea.tsx app/ui-fixes.css app/components/ui/EnhancedReadingArea.tsx app/page.tsx && git commit -m 'Improve text layout and fix home page' && git push"

echo.
echo Deployment completed!
echo Check the GitHub repository for the latest commit.
echo.

:end
pause
