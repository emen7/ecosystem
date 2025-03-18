# WSL Deployment Guide for UB Reader

This guide provides step-by-step instructions for setting up a proper GitHub to Vercel deployment workflow using WSL (Windows Subsystem for Linux).

## Setting Up WSL Environment

### 1. Install Required Packages

```bash
# Update package repositories
sudo apt update && sudo apt upgrade -y

# Install essential development tools
sudo apt install -y curl git build-essential

# Install Node.js using NVM (recommended for better version control)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install 16  # Install Node.js 16 (or newer version if needed)

# Verify installations
node -v
npm -v
git --version
```

### 2. Configure Git

```bash
# Set your Git identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Configure line endings for cross-platform compatibility
git config --global core.autocrlf input
```

## Repository Setup

### 1. Clone Repository

Clone the repository directly into the WSL filesystem (not on a Windows-mounted drive):

```bash
# Create projects directory
mkdir -p ~/projects
cd ~/projects

# Clone the repository
git clone https://github.com/emen7/ecosystem.git
cd ecosystem
```

### 2. Create Backup Branch

```bash
# Create a backup branch before making any changes
git checkout -b backup-current-implementation
git push origin backup-current-implementation
git checkout main
```

### 3. Clean Repository Structure

Remove all deployment workaround directories and scripts:

```bash
# Remove Windows batch files and deployment scripts
rm -f *.bat deploy-manually.js enforce-ts-ignore.js find-theme-issues.js
rm -f fix-direct.js fix-theme-context.js fix-section-jump-menu.txt

# Remove duplicate deployment directories
rm -rf vercel-deploy clean-deploy deploy-package temp-check
```

### 4. Install Dependencies

```bash
# Install project dependencies
npm install
```

## Deployment Process

### 1. Local Development

```bash
# Start development server
npm run dev
```

This will start the Next.js development server, typically on http://localhost:3000

### 2. Testing Production Build Locally

```bash
# Build the application
npm run build

# Start the production server locally
npm start
```

### 3. GitHub Deployment

```bash
# Stage all changes
git add .

# Commit changes
git commit -m "Your descriptive commit message"

# Push to GitHub
git push origin main
```

Once pushed to GitHub, Vercel will automatically build and deploy your application.

## Vercel Setup

### 1. Connect GitHub Repository

1. Log in to your Vercel account
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: ./ (repository root)
   - Build Command: npm run build (should be auto-detected)
   - Output Directory: .next (should be auto-detected)
   - Environment Variables: Add any required variables
5. Click "Deploy"

### 2. Domain Configuration

1. Go to your project settings in Vercel
2. Navigate to the "Domains" section
3. Add your custom domain if needed

## Troubleshooting

### Common Issues

1. **Build Failures**: Check Vercel build logs for specific errors

   - TypeScript errors should be ignored via next.config.js configuration
   - Missing dependencies might require updating package.json

2. **Theme Context Errors**:

   - Ensure ThemeProvider is set up in layout.tsx (client component)
   - Check that pages are correctly using useTheme()
   - Verify component props are properly typed

3. **WSL File Permission Issues**:

   - If you encounter permission errors: `chmod -R 755 .`

4. **Path Separator Issues**:
   - Ensure all paths use forward slashes (/) not backslashes (\)
   - Check import statements for Windows-style paths

## WSL Tips

1. **File Access**:

   - Access your WSL files from Windows: `\\wsl$\Ubuntu\home\username\projects\ecosystem`
   - Access Windows files from WSL: `/mnt/c/Users/...`

2. **Terminal**:

   - Use Windows Terminal for better WSL integration
   - VSCode Remote WSL extension is recommended for development

3. **Performance**:
   - Keep repositories in the WSL filesystem, not on mounted Windows drives
   - Use native Linux commands rather than Windows alternatives

## Project Structure

The standard Next.js App Router structure is:

```
ecosystem/
├── public/            # Static assets
├── app/               # Next.js app directory
│   ├── components/    # UI components
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom hooks
│   ├── paper/         # Paper route directory
│   │   └── [paperNumber]/ # Dynamic route
│   ├── utils/         # Utility functions
│   ├── page.tsx       # Home page
│   └── layout.tsx     # Root layout
├── .gitignore         # Git ignore file
├── package.json       # Dependencies and scripts
├── next.config.js     # Next.js configuration
└── vercel.json        # Vercel configuration
```
