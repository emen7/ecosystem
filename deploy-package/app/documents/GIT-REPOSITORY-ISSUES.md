# UB-Reader Git Repository Issues

Based on our investigation, there appear to be multiple Git repositories in the project structure, which is causing confusion with commits and pushes. This document outlines the issues and proposes a solution.

## Identified Issues

1. **Multiple Git Repositories**: You mentioned having .git directories in three different locations:

   - `reader/` (the root working directory)
   - `reader/UB-Reader/`
   - `reader/deploy-ub-reader/`

2. **Commit and Push Problems**: Our commits to the UB-Reader repository are not showing up in GitHub's source control graph.

3. **GLITCH-FIXES.md Duplication**: The same file exists in two locations:
   - `reader/GLITCH-FIXES.md`
   - `reader/UB-Reader/GLITCH-FIXES.md`

## Why This Is Problematic

Having multiple Git repositories in nested directories can cause several issues:

1. **Confusion about which repository you're working with**: Commands might be operating on different repositories than intended.

2. **Nested repositories aren't tracked properly**: Changes in a nested repository aren't automatically tracked by the parent repository.

3. **File duplication**: The same file might exist in multiple repositories, leading to inconsistencies.

## Recommended Solution

The standard practice is to have one Git repository per project. Here's what I recommend:

1. **Decide on a primary repository**:

   - If `reader/UB-Reader/` is your main project, then that should be the only Git repository.
   - If the root `reader/` directory is meant to contain multiple projects, then each subdirectory should be a separate repository, but they shouldn't be nested.

2. **Remove unnecessary .git directories**:

   - Keep only the .git directory in your primary project
   - Remove the others to avoid confusion

3. **Organize files properly**:
   - Move important files to the correct repository
   - Update documentation to reflect the correct project structure

## Specific Steps to Fix

1. **Determine the correct repository**:

   ```powershell
   # Check for GitHub remote in the root directory
   cd c:\Users\neufe\Documents\aaWebHub\reader
   git remote -v

   # Check for GitHub remote in the UB-Reader directory
   cd c:\Users\neufe\Documents\aaWebHub\reader\UB-Reader
   git remote -v

   # Check for GitHub remote in the deploy-ub-reader directory
   cd c:\Users\neufe\Documents\aaWebHub\reader\deploy-ub-reader
   git remote -v
   ```

2. **Choose the repository with the correct GitHub remote URL** (likely something like `github.com/yourusername/UB-Reader.git`)

3. **Copy any needed files to that repository**:

   ```powershell
   # Example: If UB-Reader is the correct repo but files are in root directory
   copy c:\Users\neufe\Documents\aaWebHub\reader\GLITCH-FIXES.md c:\Users\neufe\Documents\aaWebHub\reader\UB-Reader\
   ```

4. **Commit and push from the correct repository**:
   ```powershell
   cd [correct-repository-path]
   git add .
   git commit -m "Add documentation and UI fixes"
   git push origin develop
   ```

This structure confusion likely explains why commits weren't appearing in the GitHub source control - they were being made to a different Git repository than the one connected to GitHub.
