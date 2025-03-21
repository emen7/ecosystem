@echo off
echo Pushing text layout improvements to GitHub...

git add app/components/ReadingArea.tsx
git add app/ui-fixes.css
git add app/components/ui/EnhancedReadingArea.tsx

git commit -m "Fix text layout and centering issues for both standard and enhanced UI"
git push

echo Done!
pause
