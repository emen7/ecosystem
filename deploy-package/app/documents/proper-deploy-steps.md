# Proper Next.js Deployment to Vercel - Step by Step Guide

## Verifying and Setting Repository Connection

First, let's ensure we're pushing to the correct GitHub repository:

1. **Check current remote connection**:

   ```
   cd deploy-ub-reader
   git remote -v
   ```

   - If this shows `origin` pointing to `next-js` repository, you're correctly set up
   - If it shows `ub-reader-deploy` or is empty, we need to fix it

2. **If needed, set the correct remote**:
   ```
   cd deploy-ub-reader
   git remote set-url origin https://github.com/yourusername/next-js.git
   ```
   (Replace "yourusername" with your actual GitHub username)

## Making Changes and Pushing to GitHub

1. **Make changes** to files in the `deploy-ub-reader` directory

2. **Commit changes** specifically to the `deploy-ub-reader` directory:

   ```
   cd deploy-ub-reader
   git add .
   git commit -m "Your descriptive commit message"
   git push origin main
   ```

3. **Verify in GitHub** that your commits appear in the `next-js` repository

## Triggering Vercel Redeployment

1. **Automatic deployment**:

   - If Vercel is configured for automatic deployments, it should start deploying automatically when you push to GitHub
   - Wait a few minutes for the deployment to complete

2. **Manual deployment** (if needed):

   - Go to your Vercel dashboard: https://vercel.com/dashboard
   - Select your project
   - Click on "Deployments" in the left sidebar
   - Find your latest commit and click "Redeploy" if it didn't deploy automatically

3. **Check deployment settings** in Vercel:
   - Go to "Settings" > "Git"
   - Ensure the Production Branch is set to "main"
   - Verify the GitHub repository is "next-js"

## Troubleshooting

If you're seeing commit issues:

1. Ensure you're in the `deploy-ub-reader` directory when running git commands
2. Check which repository VSCode is trying to commit to in Source Control
3. If there's confusion between repositories, always use the command line with explicit paths

If Vercel deployment fails:

1. Check the build logs in Vercel for specific errors
2. Verify that your `next.config.js` and other configuration files are correctly set up
3. Ensure your package.json has the correct dependencies and scripts for Next.js

## Best Practice Going Forward

To avoid confusion between repositories:

1. Always commit from `deploy-ub-reader` directory using terminal commands
2. Double-check the remote before pushing important changes
3. Consider deleting or renaming the outdated `ub-reader-deploy` repository to avoid confusion
