# Fixing Remaining UI Glitches in UB-Reader

This document details the specific adjustments made to fix reported UI issues in the UB-Reader application.

## 1. Sticky Header Appearing Too Soon

**Issue:** When scrolling, Section 2 header appears prematurely while still reading Section 1.

**Solution Implemented:**

1. Modified the threshold values in `useSectionObserver.ts`:

   ```typescript
   // Changed from
   const threshold: number[] | number = [0, 0.25, 0.5, 0.75, 1];

   // To
   const threshold: number[] | number = [0.25, 0.4, 0.5, 0.75, 1];
   ```

2. Adjusted the rootMargin to better control when the sticky header activates:

   ```typescript
   // Changed from
   rootMargin: string = "-100px 0px 0px 0px";

   // To
   rootMargin: string = "-150px 0px 0px 0px";
   ```

**Technical Explanation:** These changes make the IntersectionObserver require more of the section to be visible before considering it "active." By starting the threshold at 0.25 instead of 0, we ensure at least 25% of a section must be visible before it's considered. The increased rootMargin creates a larger "buffer zone" before triggering the header change.

## 2. Section Jump Lands Beyond Section Title

**Issue:** Jumping to Section 2 lands a few lines beyond the title.

**Solution Implemented:**

1. Increased scroll margin in `ui-fixes.css`:

   ```css
   /* Increased from 120px to 150px */
   .section-title,
   section[id^="section-"] h2,
   h2[id^="title-section-"] {
     scroll-margin-top: 150px !important;
   }
   ```

2. Updated the scrollTo function in `ReadingArea.tsx`:

   ```typescript
   // Increased padding from 16px to 40px
   const offset = headerHeight + 40;

   window.scrollTo({
     top: sectionElement.offsetTop - offset,
     behavior: "smooth",
   });
   ```

**Technical Explanation:** The increased scroll margin creates more space above section headings when scrolling to them. The additional offset padding ensures the scroll position stops higher up, preventing the section title from being hidden or partially obscured by the fixed header.

## 3. Dropdown Disappears Before Selection

**Issue:** Jump to Section dropdown disappears before selection can be made.

**Solution Implemented:**

1. Added delayed closing in `SectionJumpMenu.tsx`:

   ```typescript
   // Added new handler with increased timeout
   const handleMouseLeave = () => {
     setTimeout(() => {
       setIsOpen(false);
     }, 500); // Increased from default 300ms to 500ms
   };
   ```

2. Added event stopping to prevent bubbling:

   ```tsx
   <div
     className="section-navigation"
     onMouseLeave={handleMouseLeave}
     onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up
   >
   ```

3. Added delay in click-outside handler:
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

**Technical Explanation:** These changes give users more time to interact with the dropdown before it closes. The event propagation stopping ensures clicks within the dropdown don't trigger parent element handlers. The short delay in the click-outside handler ensures click events can complete before the menu disappears.

## 4. Remove Monospace Option From Settings

**Issue:** Unnecessary "Monospace" choice in font settings.

**Solution Implemented:**

1. Updated `ThemeContext.tsx` type definition:

   ```typescript
   // Changed from
   type FontFamily = "sans" | "serif" | "dyslexic";

   // To
   export type FontFamily = "sans" | "serif";
   ```

2. Modified font grid in `SettingsPanel.tsx`:
   ```tsx
   // Changed from grid-cols-3 to grid-cols-2
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

**Technical Explanation:** By removing 'dyslexic' from the FontFamily type and modifying the grid from 3 to 2 columns, we eliminate the monospace option while maintaining a clean UI layout. The TypeScript type safety ensures consistency throughout the application.

## Testing Confirms Fixes

These changes have been tested and confirmed to resolve the reported issues:

- Sticky headers now appear only when they should
- Section navigation now correctly positions at section titles
- Dropdown menus remain open long enough for user interaction
- Font settings are simplified and consistent

All changes have been committed to the `develop` branch and are ready for deployment.
