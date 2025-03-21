@echo off
echo Pushing home page fix to GitHub...

git add app/page.tsx

git commit -m "Fix home page to directly show enhanced UI instead of redirecting"
git push

echo Done!
pause
