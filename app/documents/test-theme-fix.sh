#!/bin/bash
# Test script for ThemeContext fix
# This script builds and serves the Next.js app locally to verify routes work correctly

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}===== Testing ThemeContext Fix =====${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo -e "${RED}Error: Node.js is not installed${NC}"
  echo "Please install Node.js before running this script."
  exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
  echo -e "${RED}Error: npm is not installed${NC}"
  echo "Please install npm before running this script."
  exit 1
fi

# Make sure we're in the project root
if [ ! -f package.json ] || [ ! -d app ]; then
  echo -e "${RED}Error: Script must be run from the project root directory${NC}"
  echo "Current directory: $(pwd)"
  echo "Please navigate to the directory containing package.json and the app folder."
  exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d node_modules ]; then
  echo -e "${YELLOW}Installing dependencies...${NC}"
  npm install
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install dependencies${NC}"
    exit 1
  fi
fi

# Build the Next.js app
echo -e "${YELLOW}Building Next.js app...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed${NC}"
  echo "Check the error messages above for details."
  exit 1
fi

# Start the Next.js app
echo -e "${GREEN}Build successful!${NC}"
echo -e "${YELLOW}Starting Next.js app...${NC}"
echo -e "The app will now start on http://localhost:3000"
echo -e "${GREEN}Please test the following routes:${NC}"
echo -e "1. Home page: ${YELLOW}http://localhost:3000${NC}"
echo -e "2. Paper route: ${YELLOW}http://localhost:3000/paper/1${NC}"
echo
echo -e "Press Ctrl+C to stop the server when done testing."
echo

# Start the server
npm start
