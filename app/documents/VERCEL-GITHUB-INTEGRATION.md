# Vercel-GitHub Integration Guide for UB Reader

This guide provides detailed steps for configuring direct GitHub to Vercel integration, eliminating the need for manual deployment workarounds.

## Prerequisites

Before setting up Vercel integration, ensure you have:

1. A GitHub account with access to the repository
2. A Vercel account (create one at [vercel.com](https://vercel.com) if needed)
3. Properly structured repository following Next.js conventions

## Step 1: Prepare Your Repository

Ensure your repository is properly structured and optimized for deployment:

1. The project should follow the Next.js App Router structure:

   - All pages under `/app` directory
   - Configuration files at the root
   - Proper ThemeContext implementation (see ThemeContext fixes in the codebase)

2. Your repository should include these essential configuration files:
   - `next.config.js` - Next.js configuration
   - `package.json` - Dependencies and scripts
   - `vercel.json` - Vercel-specific configuration
   - `tsconfig.json` - TypeScript configuration

## Step 2: Connect GitHub to Vercel

1. **Log in to Vercel Dashboard**

   - Go to [vercel.com](https://vercel.com) and sign in
   - Click on "Dashboard" to access your projects

2. **Import Repository**

   - Click "Add New..."
   - Select "Project"
   - Choose "Continue with GitHub" to connect your GitHub account
   - Find and select the `ecosystem` repository

3. **Configure Project Settings**

   - **Framework Preset**: Select "Next.js" from the dropdown
   - **Root Directory**: Leave as `.` (repository root)
   - **Build Command**: Verify it shows `npm run build` (default)
   - **Output Directory**: Verify it shows `.next` (default)
   - **Environment Variables**: Add any required variables for your project

4. **Deploy**
   - Click "Deploy" to start the initial deployment
   - Vercel will clone your repository, install dependencies, build the project, and deploy it

## Step 3: Configure Deployment Settings

After initial deployment, set up proper configuration:

1. **Go to Project Settings**

   - From your project dashboard, click "Settings"

2. **Configure Git Integration**

   - Click on "Git" in the left sidebar
   - Verify "Production Branch" is set to `main`
   - Enable "Automatically expose System Environment Variables" if needed

3. **Configure Build & Development Settings**

   - Click on "Build & Development Settings" in the left sidebar
   - Verify framework preset is "Next.js"
   - Verify build command is `npm run build`
   - Verify output directory is `.next`
   - Verify install command is `npm install` or `npm ci`

4. **Set Up Custom Domain (Optional)**
   - Click on "Domains" in the left sidebar
   - Add your custom domain if needed
   - Follow the verification steps provided by Vercel

## Step 4: Test Automatic Deployments

Ensure automatic deployments are working correctly:

1. **Make a Small Change**

   - Edit a file in your repository (e.g., README.md)
   - Commit and push to your main branch

2. **Monitor Deployment**

   - Go to your Vercel dashboard
   - You should see a new deployment in progress
   - Monitor build logs for any errors
   - Once complete, verify your changes are live on the deployed site

3. **Test Preview Environments (Optional)**
   - Create a new branch in your repository
   - Make some changes and push the branch
   - Create a pull request
   - Vercel should automatically create a preview deployment for your pull request
   - The preview URL will be available in the pull request comments

## Step 5: Setup GitHub Actions for Enhanced CI/CD (Optional)

For more advanced control, you can add GitHub Actions:

1. **Create GitHub Actions Workflow File**

Create `.github/workflows/vercel-deploy.yml` with the following content:

```yaml
name: Vercel Production Deployment
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test || true
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

2. **Add GitHub Secrets**

Add the following secrets in your GitHub repository settings:

- `VERCEL_TOKEN`: Your Vercel personal access token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

You can find these values in your Vercel account settings.

## Troubleshooting Common Issues

### Build Failures

- **Problem**: Build fails with TypeScript errors

  - **Solution**: Ensure your `next.config.js` includes `typescript: { ignoreBuildErrors: true }`

- **Problem**: Dependency installation errors
  - **Solution**: Verify `package.json` contains all required dependencies with correct versions

### Deployment Errors

- **Problem**: "Page Not Found" errors after deployment

  - **Solution**: Check Next.js route configuration and ensure dynamic routes are properly set up

- **Problem**: Environment variables not working
  - **Solution**: Verify they are correctly set in Vercel project settings and properly accessed in code

### Theme Context Errors

- **Problem**: "useTheme must be used within a ThemeProvider" error
  - **Solution**: Ensure the ThemeProvider is implemented in the root layout and not duplicated in pages

## Accessing Your Vercel Deployment

Once deployment is complete, your site will be accessible at:

- Production URL: `https://your-project-name.vercel.app`
- Custom Domain (if configured): `https://your-custom-domain.com`

Preview deployments for branches and pull requests will have unique URLs following this pattern:
`https://your-project-name-git-branch-name-username.vercel.app`
