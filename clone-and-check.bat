@echo off
echo Creating a temporary directory to check what's in GitHub...
mkdir temp-check
cd temp-check

echo Cloning the ecosystem repository...
git clone https://github.com/emen7/ecosystem.git
cd ecosystem

echo Checking SectionJumpMenu.tsx content...
if exist app\components\SectionJumpMenu.tsx (
  type app\components\SectionJumpMenu.tsx | findstr "const { colorScheme }" || echo No colorScheme found in file
  type app\components\SectionJumpMenu.tsx | findstr "const { theme }" || echo No theme found in file
) else (
  echo SectionJumpMenu.tsx doesn't exist in the repository
)

cd ..\..
echo You can delete the temp-check directory when done
