# WSL Setup Instructions for UB Reader Development

This guide provides step-by-step instructions for using your existing WSL (Ubuntu-22.04) installation for UB Reader development.

## Step 1: WSL Status

Great news! You already have WSL properly installed with Ubuntu-22.04 as your default distribution.

From your command output:

```
Default Distribution: Ubuntu-22.04
Default Version: 2
```

This means you can skip the installation steps and proceed directly to working with your existing WSL setup.

## Step 2: Repository Setup in WSL

There are two approaches to set up the repository in WSL:

### Option A: Use the Provided Setup Script

1. **Launch Ubuntu**:

   In PowerShell:

   ```
   wsl
   ```

   This will open the Ubuntu terminal.

2. **Navigate to the project**:

   The Windows file system is accessible under `/mnt/` in WSL. For example:

   ```
   cd /mnt/c/Users/neufe/Documents/aaWebHub/reader/deploy-ub-reader
   ```

3. **Make the setup script executable**:

   ```
   chmod +x wsl-repository-setup.sh
   ```

4. **Run the setup script**:

   ```
   ./wsl-repository-setup.sh
   ```

   This will:

   - Create a backup branch
   - Clean up deployment workarounds
   - Fix line endings for cross-platform compatibility
   - Set proper file permissions
   - Install dependencies

### Option B: Follow the Manual Setup Process

If you prefer to set up manually or the script has issues, follow these steps in the WSL terminal:

1. **Create a project directory**:

   ```
   mkdir -p ~/projects
   cd ~/projects
   ```

2. **Clone the repository**:

   ```
   git clone https://github.com/emen7/ecosystem.git
   cd ecosystem
   ```

3. **Create a backup branch**:

   ```
   git checkout -b wsl-backup-$(date +%Y%m%d)
   git checkout main
   ```

4. **Clean repository structure**:

   ```
   rm -f *.bat deploy-manually.js enforce-ts-ignore.js find-theme-issues.js
   rm -f fix-direct.js fix-theme-context.js fix-section-jump-menu.txt
   rm -rf vercel-deploy clean-deploy deploy-package temp-check
   ```

5. **Install dependencies**:
   ```
   npm install
   ```

## Step 3: Development in WSL

Once set up, you can develop using Ubuntu:

1. **Start the development server**:

   ```
   npm run dev
   ```

2. **Access the site**:

   The development server will be accessible in your Windows browser at http://localhost:3000

## Development Tips

1. **Using VS Code with WSL**:

   Install the "Remote - WSL" extension in VS Code, then:

   - In the WSL terminal, navigate to your project
   - Run `code .` to open VS Code connected to WSL

2. **File access**:

   - Access Windows files from WSL: `/mnt/c/Users/...`
   - Access WSL files from Windows: `\\wsl$\Ubuntu\home\yourusername\...`

3. **Git configuration**:

   Set up Git in WSL:

   ```
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

## Troubleshooting

1. **Can't find WSL in Windows**:

   Make sure Windows is up to date. WSL requires Windows 10 version 2004 or higher.

2. **Permission denied errors**:

   Fix file permissions:

   ```
   chmod -R 755 .
   ```

3. **Package installation errors**:

   Update Ubuntu packages:

   ```
   sudo apt update && sudo apt upgrade -y
   ```

See `app/documents/WSL-DEPLOYMENT-GUIDE.md` for more detailed guidance on working with the repository in WSL.
