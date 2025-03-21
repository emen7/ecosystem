@echo off
echo Force Applying UI Improvements
echo ===========================
echo.

echo 1. Re-saving files with text layout improvements...

REM Save the changes to ReadingArea.tsx again
echo Updating ReadingArea.tsx...
type app\components\ReadingArea.tsx > app\components\ReadingArea.tsx.tmp
move /Y app\components\ReadingArea.tsx.tmp app\components\ReadingArea.tsx

REM Save the changes to ui-fixes.css again
echo Updating ui-fixes.css...
type app\ui-fixes.css > app\ui-fixes.css.tmp
move /Y app\ui-fixes.css.tmp app\ui-fixes.css

REM Save the changes to EnhancedReadingArea.tsx again
echo Updating EnhancedReadingArea.tsx...
type app\components\ui\EnhancedReadingArea.tsx > app\components\ui\EnhancedReadingArea.tsx.tmp
move /Y app\components\ui\EnhancedReadingArea.tsx.tmp app\components\ui\EnhancedReadingArea.tsx

echo.
echo 2. Force adding files to Git...
git add -f app\components\ReadingArea.tsx
git add -f app\ui-fixes.css
git add -f app\components\ui\EnhancedReadingArea.tsx

echo.
echo 3. Checking Git status...
git status

echo.
echo 4. Committing changes...
git commit -m "Improve text layout and centering across all UI components"

echo.
echo 5. Pushing changes...
git push

echo.
echo Done!
pause
