# Immediate UI Fix: Reading Area Width Limitation

To begin addressing the UI improvements, let's start with the simplest fix: limiting the reading area width for better readability on large screens. This is a straightforward CSS change that can be implemented quickly.

## Reading Area Width Fix

Based on the HTML demo, the reading area should have a maximum width of around 800px to prevent text lines from becoming too long on wide screens. Here's how to implement this:

### Step 1: Modify ReadingArea.tsx

Open `app/components/ReadingArea.tsx` and update the main container div by adding a max-width class:

```tsx
return (
  <div
    className={`
    ${getFontFamilyClass()} 
    ${getFontSizeClass()} 
    ${getLineSpacingClass()} 
    ${getMarginWidthClass()} 
    p-4 transition-colors duration-300 max-w-4xl mx-auto
    ${isModernTheme ? "modern-theme" : "traditional-theme"}
  `}
  >
    {/* ... rest of the component ... */}
  </div>
);
```

The key changes are:

1. Added `max-w-4xl` (Tailwind class for max-width: 56rem or ~896px)
2. Added `mx-auto` to center the content

### Step 2: Testing the Change

1. Run the development server to test the change locally:

   ```
   npm run dev
   ```

2. Navigate to a paper page (e.g., http://localhost:3000/paper/1)

3. Resize your browser window to see how the text container behaves on different screen sizes.

### Step 3: Push the Change

Once you're satisfied with the width limitation, push the change to GitHub:

1. Stage the modified file:

   ```
   git add app/components/ReadingArea.tsx
   ```

2. Commit the change:

   ```
   git commit -m "Fix reading area width for better readability"
   ```

3. Push to GitHub:
   ```
   git push
   ```

## Next Steps After This Fix

After implementing and deploying this change, we can proceed with the other UI improvements in order of priority:

1. Light/Dark mode implementation
2. Sticky headers for paper and section titles
3. Navigation dropdown styling
4. Paper hierarchy organization

Each of these will be addressed in a similar step-by-step fashion.
