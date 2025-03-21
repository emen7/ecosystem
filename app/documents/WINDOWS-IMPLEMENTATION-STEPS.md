# Windows Implementation Steps for GitHub-Vercel Integration

This guide provides step-by-step instructions for implementing the GitHub to Vercel deployment workflow on Windows.

## Step 1: Test the ThemeContext Fix

Before pushing changes to GitHub, test that the ThemeContext fix works correctly:

1. Open Command Prompt or PowerShell
2. Navigate to the project root directory
3. Run the test script:

   **In Command Prompt:**

   ```
   test-theme-fix.bat
   ```

   **In PowerShell:**

   ```
   .\test-theme-fix.bat
   ```

4. This will build and start the application
5. Test these routes in your browser:
   - Home page: http://localhost:3000
   - Paper route: http://localhost:3000/paper/1
6. Press Ctrl+C in the terminal to stop the server when done

## Step 2: Push Changes to GitHub

After confirming the fixes work properly, push the changes to GitHub:

1. Open Command Prompt or PowerShell
2. Navigate to the project root directory
3. Run the GitHub push script:

   **In Command Prompt:**

   ```
   github-push.bat
   ```

   **In PowerShell:**

   ```
   .\github-push.bat
   ```

4. Follow the prompts to confirm and complete the push
5. The script will commit all changes and push them to your GitHub repository

## Step 3: Connect GitHub to Vercel

Now set up the Vercel integration:

1. Log in to your Vercel account at [vercel.com](https://vercel.com)
2. Click "Add New..."
3. Select "Project"
4. Choose "Continue with GitHub" to connect your GitHub account
5. Find and select the `ecosystem` repository
6. Configure project settings:
   - **Framework Preset**: Select "Next.js" from the dropdown
   - **Root Directory**: Leave as `.` (repository root)
   - **Build Command**: Verify it shows `npm run build` (default)
   - **Output Directory**: Verify it shows `.next` (default)
   - **Environment Variables**: Add any required variables
7. Click "Deploy" to start the initial deployment

## Step 4: Verify Deployment

After Vercel completes the deployment:

1. Check the Vercel dashboard for deployment status
2. Click on the deployment URL to view your site
3. Test both the home page and the paper route (e.g., `/paper/1`)
4. Verify that the ThemeContext issues are resolved

## Step 5: Future Workflow

For future updates:

1. Make changes to your code locally
2. Test changes using `test-theme-fix.bat`
3. Commit and push using `github-push.bat` or standard Git commands
4. Vercel will automatically deploy new changes when pushed to GitHub

## Troubleshooting

If you encounter issues:

1. **Build failures**:

   - Check Vercel build logs for specific errors
   - Ensure your `next.config.js` includes TypeScript error handling

2. **Paper route errors**:

   - Make sure ThemeProvider is only used in the root layout
   - Verify all components use the useTheme hook correctly

3. **GitHub push issues**:
   - Check your Git configuration and credentials
   - Ensure you have proper access to the repository

## Reference Documentation

For more detailed information, see:

- [GitHub-Vercel Integration Guide](app/documents/VERCEL-GITHUB-INTEGRATION.md)
- [Deployment Strategy Summary](app/documents/DEPLOYMENT-STRATEGY-SUMMARY.md)
- [WSL Deployment Guide](app/documents/WSL-DEPLOYMENT-GUIDE.md) (for future WSL setup)
