@echo off
echo Pushing text layout improvements to GitHub...

git add app/components/ReadingArea.tsx
git add app/ui-fixes.css

git commit -m "Fix text layout and centering issues"
git push

echo Done!
pause
