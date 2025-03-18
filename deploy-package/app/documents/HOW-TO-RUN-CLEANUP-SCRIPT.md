# How to Run the Git Repository Cleanup Script

This guide explains how to run the `fix-git-repositories.bat` script that will help consolidate your multiple Git repositories into a single, clean repository structure.

## Prerequisites

Before running the script, please make sure that:

1. You have committed any important changes you're currently working on
2. You have a backup of any critical files (though the script will create a backup automatically)
3. You close any applications that might be accessing files in the repositories

## Running the Script

The script is located at: `C:\Users\neufe\Documents\aaWebHub\reader\fix-git-repositories.bat`

### Step-by-Step Instructions:

1. **Open File Explorer** and navigate to `C:\Users\neufe\Documents\aaWebHub\reader\`

2. **Double-click** on the `fix-git-repositories.bat` file to run it.

   - Alternatively, right-click and select "Run as administrator" if you encounter any permission issues

3. **Follow the on-screen instructions**:

   - The script will first back up all your files to a timestamped folder
   - You'll be asked to choose which repository you want to keep as primary:
     - Option 1: Root repository (ub-reader-deploy)
     - Option 2: UB-Reader repository (ub-reader2)
     - Option 3: Exit without making changes

4. **Review the changes** the script will make before confirming

5. **Confirm** to complete the consolidation process

## Alternative Running Methods

If double-clicking doesn't work, you can also:

### From Windows Command Prompt:

1. Open Command Prompt
2. Navigate to the script location:
   ```
   cd C:\Users\neufe\Documents\aaWebHub\reader
   ```
3. Run the script:
   ```
   fix-git-repositories.bat
   ```

### From Windows PowerShell:

1. Open PowerShell
2. Navigate to the script location:
   ```
   cd C:\Users\neufe\Documents\aaWebHub\reader
   ```
3. Run the script:
   ```
   .\fix-git-repositories.bat
   ```

## What the Script Does

The script will:

1. Create a backup of all your files in all three repositories
2. Depending on your choice:
   - Either configure the root repository as the main one and remove the nested .git directories
   - Or copy all important files to a clean clone of the UB-Reader repository in a new location

## After Running the Script

After running the script:

1. If you chose Option 1 (root repository):

   - Continue working in `C:\Users\neufe\Documents\aaWebHub\reader\`
   - All your files will be under the ub-reader-deploy repository

2. If you chose Option 2 (UB-Reader repository):

   - You'll need to start working in the new location: `C:\Users\neufe\Documents\ub-reader-temp\ub-reader2\`
   - This will be a clean repository with all your files copied over

3. Verify that everything works as expected:
   - Check that your files are all present
   - Ensure Git commands work properly (try `git status`)
   - Make a small test commit to ensure everything is set up correctly

## Troubleshooting

If the script fails or you encounter issues:

1. Check the backup folder that was created (the script will show the path)
2. All your original files will be there, organized by repository
3. You can refer to the detailed manual instructions in `GIT-REPO-CLEANUP.md`

## Need Help?

If you encounter any issues or need assistance, refer to:

- `GIT-REPOSITORY-ISSUES.md` - For understanding the repository structure issues
- `GIT-REPO-CLEANUP.md` - For detailed manual steps if the script doesn't work

[test entry]
