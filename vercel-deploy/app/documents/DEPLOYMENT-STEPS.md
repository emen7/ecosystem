# UB Reader Vercel Deployment Steps

## Step-by-Step Instructions

### 1. Create a New GitHub Repository

- Go to GitHub.com
- Click the "+" icon in the top right and select "New repository"
- Name it something like "ub-reader-deploy"
- Do NOT initialize it with README, .gitignore, or license
- Click "Create repository"

### 2. Run the Deployment Script

- Open VS Code Terminal
- Make sure you're in the ROOT directory: `c:/Users/neufe/Documents/aaWebHub/reader`
  (This is the directory where index.html, improved-demo.html, json folder, and vercel.json are located)
- Run the script: `.\deploy-to-vercel.bat`

### 3. Connect to GitHub

- Stay in the SAME ROOT directory: `c:/Users/neufe/Documents/aaWebHub/reader`
- Run these commands (replace with your actual repository URL):
  ```
  git remote add origin https://github.com/your-username/ub-reader-deploy.git
  git branch -M main
  git push -u origin main
  ```

### 4. Deploy on Vercel

- Go to Vercel.com
- Create a new project
- Import your new GitHub repository "ub-reader-deploy"
- Keep all default settings
- Click "Deploy"

### 5. Verify Deployment

- Once deployment is complete, click on the generated URL
- It should take you to your UB Reader

## Troubleshooting

If you encounter any issues:

- Check that the correct files (index.html, improved-demo.html, json folder, and vercel.json) were pushed to GitHub
- Verify the vercel.json file contains the correct configuration
- Check Vercel deployment logs for any errors
