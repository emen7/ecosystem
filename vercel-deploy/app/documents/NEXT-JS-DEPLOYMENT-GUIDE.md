# UB-Reader Next.js Deployment Guide

This guide outlines the steps to properly deploy the UB-Reader Next.js application to Vercel, addressing the repository structure and deployment issues.

## Problem Summary

We've identified several issues with the current deployment:

1. **Repository Structure Issue**: Multiple Git repositories exist in different directories, causing confusion about which repository is connected to Vercel.

2. **HTML vs Next.js**: The deployment is currently using the HTML demo files instead of the Next.js application.

3. **Vercel Configuration**: The current configuration is set up for static HTML files rather than a Next.js application.

## Solution

We've created scripts to migrate the Next.js application to a dedicated deployment repository. This approach ensures a clean deployment and separates the Next.js app from the HTML prototypes.

## Deployment Steps

### Step 1: Run the Migration Script

1. Open a command prompt in the project root directory (`c:/Users/neufe/Documents/aaWebHub/reader`).
2. Run the deployment script:

```bash
deploy-nextjs-to-vercel.bat
```

This script will:

- Create a staging directory with the proper Next.js structure
- Copy all Next.js components and files from UB-Reader/ub-reader-app
- Set up proper Vercel configuration files
- Copy everything to the deploy-ub-reader directory
- Prepare the Git repository

### Step 2: Commit and Push Changes

After the script completes, follow these steps:

```bash
cd deploy-ub-reader
git add .
git commit -m "Switch to Next.js application deployment"
git push
```

### Step 3: Update Vercel Project Settings

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to your UB-Reader project
3. Navigate to Project Settings
4. Under "Build & Development Settings":

   - Set Framework Preset to "Next.js"
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. Deploy again or wait for the automatic deployment to complete

## Verification

After deployment completes:

1. Visit your Vercel deployment URL
2. Verify that the Next.js application is loading, not the HTML demo
3. Test navigation and functionality to ensure everything works correctly

## Troubleshooting

If you encounter issues:

### Issue: Old HTML version still showing

- Clear your browser cache
- Check that Vercel is using the latest deployment
- Verify that the build settings are correctly set to Next.js

### Issue: Build fails

- Check the Vercel build logs for specific errors
- Verify that all required files are in the repository
- Ensure package.json includes all necessary dependencies

### Issue: Components not displaying correctly

- Check the browser console for errors
- Verify that the component paths are correct for the Next.js structure

## Recovery Plan

If deployment fails and you need to revert:

1. In Vercel dashboard, go to Deployments
2. Find the last working deployment
3. Click the three dots menu (⋮) and select "Redeploy"
4. This will restore the previous version while you troubleshoot

## Next Steps

After successful deployment:

1. Clean up any unnecessary files in the repository
2. Implement proper CI/CD workflows
3. Consider setting up environment variables for configuration
