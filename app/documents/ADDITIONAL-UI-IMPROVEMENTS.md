# Additional UI Improvements Needed

Based on your feedback after reviewing the deployed site, there are several additional UI improvements that should be implemented to match the functionality shown in the HTML demo:

## 1. Light/Dark Mode Implementation

- The light/dark theme toggle in the settings panel doesn't appear to be properly changing the theme
- Need to ensure ThemeContext is correctly applying color scheme changes throughout the application

## 2. Paper/Section Sticky Headers

- The sticky header functionality for paper titles and section titles is not working as expected
- When scrolling, these headers should stick to the top of the viewport with proper hierarchy and formatting

## 3. Navigation Dropdown Styling

- The navigation dropdown is showing with a white background instead of matching the dark theme
- Dropdown menus need proper theming to match the rest of the application

## 4. Paper Hierarchy Organization

- Papers should be organized into their respective Parts (I, II, III, IV) in the navigation menu
- The proper hierarchy should be:
  - Part I: The Central and Superuniverses (includes Preface)
    - Paper 1: The Universal Father
    - Paper 2: The Nature of God
    - ...
  - Part II: The Local Universe
    - ...
  - Part III: The History of Urantia
    - ...
  - Part IV: The Life and Teachings of Jesus
    - ...
- Each Part should be collapsible/expandable
- When expanding a Part, other Parts should collapse

## 5. Reading Area Width Limitation

- The text in the reading area should have a maximum width limit for better readability on large screens
- This prevents text lines from becoming too long on wide screens
- Recommended max-width would be around 800px (as shown in the demo HTML)

## 6. Console Errors

- Check for and fix any console errors that may be affecting functionality
- Ensure all components are properly rendering without errors

## Next Steps

These UI improvements should be implemented in the following phases:

1. **Push the home page redirect** (already implemented)
2. **Fix reading area width limitation** - this is a simple CSS change
3. **Implement proper light/dark mode** - ensure ThemeContext is working correctly
4. **Fix sticky headers** - implement proper scrolling behavior for headers
5. **Fix navigation dropdowns** - style and functionality improvements
6. **Implement paper hierarchy** - restructure the navigation component

The HTML demo file in app/documents/improved-demo.html provides a reference implementation for all these features. The CSS and JavaScript in that file can be adapted to work with the React components.

Each of these improvements should be implemented one at a time, tested, and then pushed to GitHub for automatic deployment to Vercel.
