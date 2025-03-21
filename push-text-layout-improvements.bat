@echo off
echo Pushing text layout improvements to GitHub...

git add app/components/ReadingArea.tsx
git add app/ui-fixes.css

git commit -m "Improve text layout for better centering on PC browsers"
git push

echo Done!
pause
