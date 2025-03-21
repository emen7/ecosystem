# Immediate Next Steps

Based on our completed work, here are the concrete steps to start implementing the UI improvements:

## 1. Fix the Sticky Header Issue

Let's start with the highest priority issue: the sticky header appearing too soon.

### Step 1: Locate and Modify useSectionObserver.ts

1. Open the file:

   ```
   app/hooks/useSectionObserver.ts
   ```

2. Find the threshold values definition (likely near the beginning of the file):

   ```typescript
   const threshold: number[] | number = [0, 0.25, 0.5, 0.75, 1];
   ```

3. Modify it to:

   ```typescript
   const threshold: number[] | number = [0.25, 0.4, 0.5, 0.75, 1];
   ```

4. Find the rootMargin definition:

   ```typescript
   rootMargin: string = "-100px 0px 0px 0px";
   ```

5. Change it to:

   ```typescript
   rootMargin: string = "-150px 0px 0px 0px";
   ```

6. Save the file

### Step 2: Test the Changes

1. Start the development server:

   ```
   npm run dev
   ```

2. Open your browser to http://localhost:3000

3. Test scrolling behavior in a paper with multiple sections:
   - Verify that section headers don't appear prematurely
   - Check that section header changes at appropriate scroll positions

### Step 3: Commit and Push

If the changes work as expected:

1. Open VS Code Source Control tab
2. Stage the modified file
3. Commit with message "Fix sticky header appearing too soon"
4. Push to GitHub

## 2. Fix Section Jump Landing Position

Once the first issue is resolved, proceed to the second priority:

### Step 1: Locate and Modify ui-fixes.css

1. Open the file:

   ```
   app/ui-fixes.css
   ```

2. Find the scroll margin for section titles:

   ```css
   .section-title,
   section[id^="section-"] h2,
   h2[id^="title-section-"] {
     scroll-margin-top: 120px !important;
   }
   ```

3. Increase it to 150px:
   ```css
   .section-title,
   section[id^="section-"] h2,
   h2[id^="title-section-"] {
     scroll-margin-top: 150px !important;
   }
   ```

### Step 2: Update ReadingArea.tsx

1. Open:

   ```
   app/components/ReadingArea.tsx
   ```

2. Find the scrollTo function that handles section jumps
3. Locate where it calculates the offset:

   ```typescript
   const offset = headerHeight + 16;
   ```

4. Increase padding from 16px to 40px:
   ```typescript
   const offset = headerHeight + 40;
   ```

### Step 3: Test and Commit

Test the section jump functionality and commit if working properly.

## 3. Fix Dropdown Disappears Before Selection

### Step 1: Locate and Modify SectionJumpMenu.tsx

1. Open:

   ```
   app/components/SectionJumpMenu.tsx
   ```

2. Add the handleMouseLeave function with increased timeout
3. Add event stopping to prevent bubbling
4. Add delay in click-outside handler

See NEXT-STEPS-UI-RESTORATION.md for specific code changes.

## 4. Simplify Settings Panel Font Options

### Step 1: Update ThemeContext.tsx

1. Open:

   ```
   app/contexts/ThemeContext.tsx
   ```

2. Modify the FontFamily type definition

### Step 2: Update SettingsPanel.tsx

1. Modify the font grid from 3 columns to 2

## Resources

- Detailed instructions for each fix: `NEXT-STEPS-UI-RESTORATION.md`
- Original glitch documentation: `app/documents/GLITCH-FIXES.md`
- Windows vs WSL development choices: `WINDOWS-VS-WSL-DEVELOPMENT.md`

You can proceed with these steps in either Windows or WSL environment based on your preference. For code editing, Windows may be more familiar, while for npm operations, WSL might offer better performance.
