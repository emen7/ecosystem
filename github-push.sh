#!/bin/bash
# GitHub Push Script
# This script commits all changes and pushes them to GitHub

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}===== GitHub Push for Direct Vercel Integration =====${NC}"
echo

# Check if git is installed
if ! command -v git &> /dev/null; then
  echo -e "${RED}Error: Git is not installed${NC}"
  exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
  echo -e "${RED}Error: Not in a git repository${NC}"
  echo "Please run this script from within the project repository."
  exit 1
fi

# Verify the remote repository
echo -e "${YELLOW}Checking GitHub remote...${NC}"
REMOTE=$(git remote -v | grep 'origin.*push' | grep -oE 'github.com[:/][^[:space:]]+' | head -1)
if [[ -z "$REMOTE" ]]; then
  echo -e "${RED}Error: No GitHub remote found${NC}"
  echo "Setting up GitHub remote..."
  git remote add origin https://github.com/emen7/ecosystem.git
else
  echo -e "${GREEN}GitHub remote found: $REMOTE${NC}"
fi

# Show status of changes
echo -e "${YELLOW}Current status of changes:${NC}"
git status

echo
echo -e "${YELLOW}These changes will be committed:${NC}"
echo "1. ThemeContext fixes in layout.tsx, page.tsx, and paper/[paperNumber]/page.tsx"
echo "2. Documentation in app/documents/"
echo "3. Setup scripts (wsl-repository-setup.sh, test-theme-fix.sh, github-push.sh)"
echo "4. GitHub Actions workflow in .github/workflows/"
echo "5. Updated .gitignore and README.md"
echo

# Prompt for confirmation
read -p "Do you want to commit and push these changes? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}Operation cancelled${NC}"
  exit 1
fi

# Add all files
echo -e "${YELLOW}Adding files...${NC}"
git add .

# Commit the changes
echo -e "${YELLOW}Committing changes...${NC}"
git commit -m "Implement GitHub to Vercel deployment workflow with ThemeContext fixes"

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git push origin main

if [ $? -eq 0 ]; then
  echo -e "${GREEN}Successfully pushed to GitHub!${NC}"
  echo
  echo -e "Next steps:"
  echo -e "1. Log in to your Vercel account"
  echo -e "2. Create a new project and link it to your GitHub repository"
  echo -e "3. Configure as described in app/documents/VERCEL-GITHUB-INTEGRATION.md"
else
  echo -e "${RED}Failed to push to GitHub${NC}"
  echo "Please check your GitHub credentials and try again."
fi
