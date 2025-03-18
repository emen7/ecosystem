@echo off
:: Test script for ThemeContext fix on Windows
:: This batch file builds and serves the Next.js app locally to verify routes work correctly

echo ===== Testing ThemeContext Fix =====
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Error: Node.js is not installed
  echo Please install Node.js before running this script.
  exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Error: npm is not installed
  echo Please install npm before running this script.
  exit /b 1
)

:: Make sure we're in the project root
if not exist package.json (
  echo Error: Script must be run from the project root directory
  echo Current directory: %CD%
  echo Please navigate to the directory containing package.json and the app folder.
  exit /b 1
)

if not exist app (
  echo Error: Script must be run from the project root directory
  echo Current directory: %CD%
  echo Please navigate to the directory containing package.json and the app folder.
  exit /b 1
)

:: Install dependencies if node_modules doesn't exist
if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies
    exit /b 1
  )
)

:: Build the Next.js app
echo Building Next.js app...
call npm run build
if %ERRORLEVEL% NEQ 0 (
  echo Build failed
  echo Check the error messages above for details.
  exit /b 1
)

:: Start the Next.js app
echo Build successful!
echo Starting Next.js app...
echo The app will now start on http://localhost:3000
echo.
echo Please test the following routes:
echo 1. Home page: http://localhost:3000
echo 2. Paper route: http://localhost:3000/paper/1
echo.
echo Press Ctrl+C to stop the server when done testing.
echo.

:: Start the server
call npm start
