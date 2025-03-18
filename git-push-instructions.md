# How to Push to ecosystem GitHub Repository

Follow these steps to ensure your files go to the ecosystem repository:

## 1. Check Current Remote

```
git remote -v
```

Verify the output shows:

```
origin  https://github.com/emen7/ecosystem.git (fetch)
origin  https://github.com/emen7/ecosystem.git (push)
```

## 2. If Remote is Incorrect:

```
git remote remove origin
git remote add origin https://github.com/emen7/ecosystem.git
```

## 3. Stage and Commit Files in VS Code

1. Open Source Control tab in VS Code (Ctrl+Shift+G)
2. Enter a commit message like "Initial UB Reader files"
3. Click the checkmark ✓ to commit

## 4. Push to GitHub

1. After commit, click "..." menu in Source Control
2. Select "Push"
3. If prompted, select "ecosystem" as the remote repository

This will push all 249 files to the ecosystem repository.
