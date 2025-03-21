#!/bin/bash
# WSL Repository Setup Script for UB Reader
# This script automates the cleanup and setup of the repository for WSL deployment

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}===== UB Reader WSL Repository Setup =====${NC}"
echo

# Check if script is running in WSL
if ! grep -q Microsoft /proc/version; then
  echo -e "${RED}Error: This script should be run in WSL (Windows Subsystem for Linux)${NC}"
  exit 1
fi

# Make sure we're in the project root
if [ ! -f package.json ] || [ ! -d app ]; then
  echo -e "${RED}Error: Script must be run from the project root directory${NC}"
  echo "Current directory: $(pwd)"
  echo "Please navigate to the directory containing package.json and the app folder."
  exit 1
fi

# Create backup branch
echo -e "${YELLOW}Creating backup branch...${NC}"
git checkout -b wsl-backup-$(date +%Y%m%d)
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Backup branch created successfully${NC}"
  git checkout main
else
  echo -e "${RED}Failed to create backup branch. Make sure git is configured correctly.${NC}"
  exit 1
fi

# Cleanup deployment workarounds
echo -e "${YELLOW}Cleaning up deployment workarounds...${NC}"

echo "Removing batch files and deployment scripts..."
find . -maxdepth 1 -name "*.bat" -type f -delete
rm -f deploy-manually.js enforce-ts-ignore.js find-theme-issues.js fix-direct.js fix-theme-context.js fix-section-jump-menu.txt

echo "Removing duplicate deployment directories..."
rm -rf vercel-deploy clean-deploy deploy-package temp-check

# Set proper line endings for all text files
echo -e "${YELLOW}Setting proper line endings for text files...${NC}"
find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*" \
  \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.json" -o -name "*.md" -o -name "*.css" \) \
  -exec dos2unix {} \; 2>/dev/null

if [ $? -eq 0 ]; then
  echo -e "${GREEN}Line endings converted successfully${NC}"
else
  echo -e "${YELLOW}Warning: dos2unix not installed or error occurred. Consider installing it with:${NC}"
  echo "sudo apt install dos2unix"
fi

# Set proper file permissions
echo -e "${YELLOW}Setting proper file permissions...${NC}"
find . -type d -not -path "*/node_modules/*" -not -path "*/.git/*" -exec chmod 755 {} \;
find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*" -exec chmod 644 {} \;

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm ci

echo -e "${GREEN}===== Repository setup complete! =====${NC}"
echo
echo -e "Next steps:"
echo -e "1. Test your changes locally with: ${YELLOW}npm run dev${NC}"
echo -e "2. Build for production with: ${YELLOW}npm run build${NC}"
echo -e "3. Connect your GitHub repo to Vercel"
echo -e "4. Push changes to GitHub with: ${YELLOW}git add . && git commit -m \"WSL deployment setup\" && git push origin main${NC}"
echo
echo -e "See ${YELLOW}app/documents/WSL-DEPLOYMENT-GUIDE.md${NC} for detailed deployment instructions."
