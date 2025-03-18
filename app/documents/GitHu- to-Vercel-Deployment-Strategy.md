\# GitHub to Vercel Deployment Strategy for Almanac

This document outlines a comprehensive strategy to establish proper GitHub to Vercel deployment for the Almanac project, eliminating the current "vercel deploy folder" workaround and implementing a sustainable development workflow.

\#\# Current Situation Assessment

The current deployment approach uses a custom "vercel deploy folder" that bypasses standard GitHub to Vercel integration. This workaround:  
\- Requires manual intervention for each deployment  
\- Prevents automatic preview deployments for pull requests  
\- Complicates version tracking and rollbacks  
\- Creates additional maintenance overhead

\#\# Recommended Deployment Strategy

\#\#\# Phase 1: Repository Restructuring

1\. \*\*Backup Current Implementation\*\*:  
   \- Create a backup branch of the current working state  
   \- Document the current manual deployment process

2\. \*\*Implement Standard Repository Structure\*\*:

ecosystem/  
├── public/ \# Static assets  
├── src/ \# Application source code  
│ ├── components/ \# UI components  
│ ├── pages/ \# Next.js pages  
│ ├── styles/ \# CSS/styling files  
│ └── lib/ \# Utility functions  
├── .github/  
│ └── workflows/ \# GitHub Actions configurations (Phase 2\)  
├── .gitignore \# Git ignore file  
├── package.json \# Dependencies and scripts  
├── next.config.js \# Next.js configuration  
└── vercel.json \# Optional Vercel-specific configuration

3\. \*\*Migrate Application Code\*\*:  
\- Move core application files from the workaround folder to the appropriate locations in the new structure  
\- Ensure configuration files (package.json, next.config.js) are at the correct levels

\#\#\# Phase 2: Native Vercel-GitHub Integration

1\. \*\*Disconnect Current Vercel Project\*\*:  
\- If a project already exists in Vercel using the workaround approach, prepare to disconnect it

2\. \*\*Connect GitHub Repository to Vercel\*\*:  
\- Navigate to Vercel dashboard → "New Project"  
\- Select your GitHub repository  
\- Configure project settings:  
  \- Framework preset: Next.js  
  \- Root directory: / (repository root) or specify subdirectory if needed  
  \- Build command: Verify default or customize as needed  
  \- Output directory: Confirm default or specify custom location  
\- Set environment variables needed by your application  
\- Deploy the project

3\. \*\*Configure Production Settings\*\*:  
\- Verify production branch is correctly set (typically \`main\`)  
\- Customize the production branch in Project Settings \> Git if needed  
\- Set up any necessary domain configurations

\#\#\# Phase 3: Advanced CI/CD Configuration (Optional)

For enhanced control, implement GitHub Actions workflows:

1\. \*\*Create GitHub Actions Configuration\*\*:  
\- Create \`.github/workflows/deploy.yml\` with the following content:

name: Deploy to Vercel  
on:  
push:  
branches: \[main\]  
pull\_request:  
types: \[opened, synchronize, reopened\]  
jobs:  
deploy:  
runs-on: ubuntu-latest  
steps:  
\- name: Checkout  
uses: actions/checkout@v3

     \- name: Setup Node.js  
       uses: actions/setup-node@v3  
       with:  
         node-version: '18'  
           
     \- name: Install dependencies  
       run: npm ci  
         
     \- name: Run tests  
       run: npm test  
         
     \- name: Deploy to Vercel  
       uses: BetaHuhn/deploy-to-vercel-action@v1  
       with:  
         GITHUB\_TOKEN: ${{ secrets.GITHUB\_TOKEN }}  
         VERCEL\_TOKEN: ${{ secrets.VERCEL\_TOKEN }}  
         VERCEL\_ORG\_ID: ${{ secrets.VERCEL\_ORG\_ID }}  
         VERCEL\_PROJECT\_ID: ${{ secrets.VERCEL\_PROJECT\_ID }}  
         PRODUCTION: ${{ github.ref \== 'refs/heads/main' }}

2\. \*\*Configure GitHub Secrets\*\*:  
\- Add the following secrets to your GitHub repository:  
  \- \`VERCEL\_TOKEN\`: Your Vercel API token  
  \- \`VERCEL\_ORG\_ID\`: Your Vercel organization ID  
  \- \`VERCEL\_PROJECT\_ID\`: Your Vercel project ID

\#\#\# Troubleshooting Common Issues

\- \*\*Build Failures\*\*: Check build logs for specific errors and resolve dependencies  
\- \*\*Authentication Problems\*\*: Ensure Vercel has proper permissions to access your GitHub repository  
\- \*\*Repository Size/Structure\*\*: Large repositories or complex structures might need additional configuration  
\- \*\*Environment Variables\*\*: Verify all required variables are properly set in Vercel

\#\# Implementation Plan

1\. \*\*Preparation (Day 1)\*\*:  
\- Backup current implementation  
\- Create new branch for restructuring

2\. \*\*Restructuring (Day 1-2)\*\*:  
\- Implement standard repository structure  
\- Migrate application code  
\- Test locally

3\. \*\*Integration (Day 2)\*\*:  
\- Set up Vercel-GitHub integration  
\- Deploy initial version  
\- Verify production deployment

4\. \*\*Validation (Day 3)\*\*:  
\- Create test branches to verify preview deployments  
\- Validate PR workflows  
\- Implement advanced CI/CD if needed  
\- Document the new deployment process

5\. \*\*Cleanup (Day 3-4)\*\*:  
\- Remove workaround "vercel deploy folder"  
\- Update documentation  
\- Train team on new workflow



