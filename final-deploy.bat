@echo off
echo Creating a new project for direct deployment...

echo Installing Vercel CLI globally if not already installed...
npm install -g vercel

echo Choosing a unique project name...
set PROJECT_NAME=ub-reader-%RANDOM%

echo Creating a vercel.json configuration file...
echo {> vercel.json
echo   "version": 2,>> vercel.json
echo   "buildCommand": "next build",>> vercel.json
echo   "devCommand": "next dev",>> vercel.json
echo   "installCommand": "npm install",>> vercel.json
echo   "framework": "nextjs">> vercel.json
echo }>> vercel.json

echo Deploying with a new project name to avoid conflicts...
echo ========================================================
echo WHEN PROMPTED:
echo 1. Create a NEW project (do not link to existing)
echo 2. Use project name: %PROJECT_NAME%
echo 3. Use the default directory ./ when prompted
echo 4. Say YES to override settings detected
echo ========================================================

echo.
echo Press any key to start deployment...
pause > nul

echo Running deployment...
vercel --prod

echo.
echo If the deployment succeeded, your site should now be available at:
echo https://%PROJECT_NAME%.vercel.app
echo.
echo You can also visit the paper route at:
echo https://%PROJECT_NAME%.vercel.app/paper/1
echo.
