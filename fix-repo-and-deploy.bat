@echo off
echo Repository Repair and Deployment Script
echo =======================================
echo.

echo 1. Checking repository status...
git status
echo.

echo 2. Checking if files are in .gitignore...
findstr /i "ui-fixes.css ReadingArea.tsx EnhancedReadingArea.tsx" .gitignore
echo.

echo 3. Resetting Git's cache to force it to see the changes...
git rm --cached -r .
git reset --hard
echo.

echo 4. Simplifying repository structure...
echo - Removing temporary deployment-specific files and directories

REM Create backups of our key modified files
echo Creating backups of modified files...
copy /Y app\components\ReadingArea.tsx app\components\ReadingArea.tsx.bak
copy /Y app\ui-fixes.css app\ui-fixes.css.bak
copy /Y app\components\ui\EnhancedReadingArea.tsx app\components\ui\EnhancedReadingArea.tsx.bak

REM Remove all unnecessary dual directory structures
if exist vercel-deploy (
  echo Removing vercel-deploy directory...
  rmdir /S /Q vercel-deploy
)
if exist deploy-package (
  echo Removing deploy-package directory...
  rmdir /S /Q deploy-package
)
if exist clean-deploy (
  echo Removing clean-deploy directory...
  rmdir /S /Q clean-deploy
)
if exist temp-check (
  echo Removing temp-check directory...
  rmdir /S /Q temp-check
)

echo 5. Updating .gitignore to ensure our files aren't excluded...
echo Creating updated .gitignore...
echo # Dependencies > .gitignore.new
echo node_modules >> .gitignore.new
echo .pnp >> .gitignore.new
echo .pnp.js >> .gitignore.new
echo .yarn/install-state.gz >> .gitignore.new
echo # Next.js build output >> .gitignore.new
echo .next/ >> .gitignore.new
echo out/ >> .gitignore.new
echo # Misc >> .gitignore.new
echo .DS_Store >> .gitignore.new
echo *.pem >> .gitignore.new
echo # Debug logs >> .gitignore.new
echo npm-debug.log* >> .gitignore.new
echo yarn-debug.log* >> .gitignore.new
echo yarn-error.log* >> .gitignore.new
echo # Local env files >> .gitignore.new
echo .env*.local >> .gitignore.new
echo # Vercel >> .gitignore.new
echo .vercel >> .gitignore.new
echo # Typescript >> .gitignore.new
echo *.tsbuildinfo >> .gitignore.new
echo next-env.d.ts >> .gitignore.new
echo # Backup files >> .gitignore.new
echo *.bak >> .gitignore.new
move /Y .gitignore.new .gitignore

echo 6. Restoring modified files from backups...
copy /Y app\components\ReadingArea.tsx.bak app\components\ReadingArea.tsx
copy /Y app\ui-fixes.css.bak app\ui-fixes.css
copy /Y app\components\ui\EnhancedReadingArea.tsx.bak app\components\ui\EnhancedReadingArea.tsx

echo 7. Adding files to Git...
git add .

echo 8. Committing changes...
git commit -m "Major repository cleanup and text layout improvements"

echo 9. Pushing to GitHub...
git push

echo.
echo IMPORTANT: 
echo This script has simplified the repository structure to use a single directory approach.
echo It has removed the dual directory structure (vercel-deploy) and other deployment-specific files.
echo All the text layout improvements are now included in this commit.
echo.
echo Done!
pause
