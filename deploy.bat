@echo off
echo Creating deployment directory...
mkdir deploy-package
echo Copying essential files...
xcopy /E /I /Y app deploy-package\app
xcopy /Y package.json deploy-package\
xcopy /Y next.config.js deploy-package\
xcopy /Y postcss.config.js deploy-package\
xcopy /Y tailwind.config.js deploy-package\
xcopy /Y tsconfig.json deploy-package\
xcopy /Y vercel.json deploy-package\
xcopy /E /I /Y public deploy-package\public

echo Deployment package ready in deploy-package directory
echo You can now:
echo 1. cd deploy-package
echo 2. vercel
echo to deploy directly to Vercel
