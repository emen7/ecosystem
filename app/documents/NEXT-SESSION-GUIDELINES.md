# Next Session Guidelines

This document outlines specific technical details about changes made in the current session and provides guidance for continuing development in the next session.

## Key Components Modified

1. **StickyHeaders.tsx**

   - Moved dropdown menu from right to left side
   - Added section numbering display
   - Fixed null title handling
   - Added ref to header element for theme control

2. **EnhancedReadingArea.tsx**

   - Removed separator lines between sections
   - Added section numbering display
   - Added null checks for section titles
   - Added handling for section indexing

3. **app/page.tsx**
   - Updated redirect to point to the enhanced UI demo
   - Changed loading text to reflect enhanced experience

## Files Requiring Immediate Attention

1. **app/components/ui/StickyHeaders.tsx**

   - Fix the section jumping functionality by updating the scroll handler
   - Improve theme handling in the header elements

2. **app/hooks/useSectionObserver.ts**

   - Adjust intersection observer thresholds for better section detection
   - Improve the algorithm for determining the most visible section

3. **app/contexts/EnhancedThemeContext.tsx**

   - Ensure theme changes properly propagate to all components
   - Add CSS variables for consistent theme application

4. **app/components/ui/EnhancedSettingsPanel.tsx**
   - Connect settings panel to theme context properly
   - Implement functional theme controls

## Technical Details for Next Steps

### 1. Fix Jump to Section Functionality

The current implementation uses the following code to handle section scrolling:

```typescript
const scrollToSection = (sectionId: string) => {
  const sectionElement = document.getElementById(sectionId);
  if (sectionElement) {
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 60;
    const stickyHeadersHeight = 70; // Height of sticky part and paper headers

    // Use larger offset to account for headers
    const offset = headerHeight + stickyHeadersHeight;

    window.scrollTo({
      top: sectionElement.offsetTop - offset,
      behavior: "smooth",
    });
  }
};
```

This needs to be improved by:

- Adding proper error handling
- Accounting for dynamic header heights
- Ensuring the section is fully visible after scrolling
- Adding a callback or promise resolution to verify scroll completion

### 2. Improve Theme Handling

The current theme implementation needs:

- DOM-based updates for immediate theme changes
- CSS variables for consistent theme application
- Event listeners for theme changes

Example implementation for theme handling in components:

```typescript
useEffect(() => {
  // Apply theme to DOM elements
  const element = elementRef.current;
  if (element) {
    // Set CSS variables based on theme
    element.style.setProperty(
      "--background-color",
      theme.colorScheme === "dark"
        ? "#1a1a1a"
        : theme.colorScheme === "light"
        ? "#ffffff"
        : "#fdf6e3"
    );
    element.style.setProperty(
      "--text-color",
      theme.colorScheme === "dark"
        ? "#ffffff"
        : theme.colorScheme === "light"
        ? "#1a1a1a"
        : "#593600"
    );
    element.style.setProperty(
      "--border-color",
      theme.colorScheme === "dark"
        ? "#333333"
        : theme.colorScheme === "light"
        ? "#e5e5e5"
        : "#eaddbc"
    );
  }
}, [theme]);
```

### 3. Section Observer Improvement

The current section observer can be improved by:

- Using more granular thresholds
- Implementing a weighted visibility algorithm
- Adding debouncing for better performance

## Testing Strategy

When testing these changes in the next session:

1. Create isolated test cases for each feature
2. Test section jumping with papers of different lengths
3. Test theme switching across all components
4. Verify mobile responsiveness
5. Check performance with both small and large papers

## Branch Management

Current changes are made directly to the main branch. Consider:

- Creating a feature branch for the next round of changes
- Using appropriate commit messages with prefixes (fix:, feat:, docs:)
- Writing tests for critical components

## Deployment Strategy

Continue using the existing Vercel deployment, but:

- Test changes locally before pushing
- Consider adding feature flags for incremental rollout
- Document deployment steps for each major change

This documentation should provide sufficient context to continue development in the next session, even if the current session gets disconnected.
