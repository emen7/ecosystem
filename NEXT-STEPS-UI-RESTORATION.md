# Next Steps: Restoring Full UB Reader UI Experience

Now that we've successfully implemented the GitHub to Vercel deployment strategy and configured WSL, the next logical step is to restore the full UI experience that was previously working. Based on our review of the `GLITCH-FIXES.md` file, there are several UI improvements that can be implemented.

## UI Issues to Address

### 1. Sticky Header Appearing Too Soon

**Implementation Plan:**

1. Modify `useSectionObserver.ts` threshold values:

   ```typescript
   // Change from
   const threshold: number[] | number = [0, 0.25, 0.5, 0.75, 1];
   // To
   const threshold: number[] | number = [0.25, 0.4, 0.5, 0.75, 1];
   ```

2. Adjust rootMargin for better sticky header activation control:
   ```typescript
   // Change from
   rootMargin: string = "-100px 0px 0px 0px";
   // To
   rootMargin: string = "-150px 0px 0px 0px";
   ```

### 2. Section Jump Lands Beyond Section Title

**Implementation Plan:**

1. Increase scroll margin in `ui-fixes.css`:

   ```css
   /* Increase from 120px to 150px */
   .section-title,
   section[id^="section-"] h2,
   h2[id^="title-section-"] {
     scroll-margin-top: 150px !important;
   }
   ```

2. Update the scrollTo function in `ReadingArea.tsx`:

   ```typescript
   // Increase padding from 16px to 40px
   const offset = headerHeight + 40;

   window.scrollTo({
     top: sectionElement.offsetTop - offset,
     behavior: "smooth",
   });
   ```

### 3. Dropdown Disappears Before Selection

**Implementation Plan:**

1. Add delayed closing in `SectionJumpMenu.tsx`:

   ```typescript
   // Add new handler with increased timeout
   const handleMouseLeave = () => {
     setTimeout(() => {
       setIsOpen(false);
     }, 500); // Increase from default 300ms to 500ms
   };
   ```

2. Add event stopping to prevent bubbling:

   ```tsx
   <div
     className="section-navigation"
     onMouseLeave={handleMouseLeave}
     onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up
   >
   ```

3. Add delay in click-outside handler:
   ```typescript
   if (
     dropdownRef.current &&
     !dropdownRef.current.contains(event.target as Node)
   ) {
     // Add delay before closing dropdown
     setTimeout(() => {
       setIsOpen(false);
     }, 200); // Short delay to ensure clicks register
   }
   ```

### 4. Remove Monospace Option From Settings

**Implementation Plan:**

1. Update `ThemeContext.tsx` type definition:

   ```typescript
   // Change from
   type FontFamily = "sans" | "serif" | "dyslexic";
   // To
   export type FontFamily = "sans" | "serif";
   ```

2. Modify font grid in `SettingsPanel.tsx`:
   ```tsx
   // Change from grid-cols-3 to grid-cols-2
   <div className="grid grid-cols-2 gap-2">
     <FontFamilyOption
       value="sans"
       current={fontFamily}
       onChange={setFontFamily}
       label="Sans"
     />
     <FontFamilyOption
       value="serif"
       current={fontFamily}
       onChange={setFontFamily}
       label="Serif"
     />
   </div>
   ```

## Implementation Process

1. **Development Environment**:

   - Use either Windows or WSL for development (both are now properly configured)
   - Start development server with `npm run dev`
   - Make changes to the files listed above

2. **Testing**:

   - Test each change individually to verify it resolves the issue
   - Test on both the home page and paper routes
   - Verify theme context works correctly throughout

3. **Deployment**:
   - Once changes are tested locally, commit and push to GitHub
   - Vercel will automatically deploy the changes
   - Verify on the deployed site that the issues are resolved

## Priority Order

1. Sticky Header Issue (most noticeable to users)
2. Section Jump Landing Position (important for navigation)
3. Dropdown Persistence (helps with usability)
4. Settings Panel Clean-up (improves UI consistency)

Would you like to proceed with implementing these UI improvements? If so, we can start with the highest priority item first.
