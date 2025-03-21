<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# 

---

# Instructions for Cline AI: Implementing the Modern Theme for Urantia Book JSON Files

These instructions will guide you in modifying the paper JSON files to implement an optional Modern Theme for the UB Reader component of the Almanac.

## JSON Structure Modifications

**Locate the Paper JSON Files:**

- Find the repository directory containing the JSON files for the 196 papers
- Each file should follow a structure with papers, sections, and paragraphs with unique reference numbers

**Create Theme Property:**

- Add a `themes` property to the JSON structure if not already present
- Include both `standard` and `modern` as sub-properties


## Modern Theme Formatting Rules

**Text Emphasis Enhancement:**

- Convert all emphasis words (currently in uppercase or italic) to proper bold formatting
- Example: "DEITY" becomes `<strong>DEITY</strong>` or appropriate JSON representation
- Preserve original emphasis in the standard theme format

**List Formatting Improvements:**

- Identify numbered and bulleted lists within paragraphs
- For the modern theme, modify list rendering to use proper HTML list structures:
    - Ordered lists (`<ol>`) for numbered items
    - Unordered lists (`<ul>`) for bulleted items
- Ensure proper indentation of nested list items in the JSON structure

**Paragraph Spacing:**

- Remove paragraph indentation for the modern theme
- Implement consistent spacing between paragraphs (recommend 1.5× the standard line height)
- Do not break words at line ends (disable hyphenation)

**Section Headers:**

- Enhance the hierarchy of section headers
- Use appropriate heading levels (h2 for main sections, h3 for subsections)
- Add subtle visual separation between sections


## Implementation Strategy

**Theme Toggle Mechanism:**

- Modify the Reader component to include a theme selection toggle
- Add "Modern" as an option alongside other reading preferences
- Store the selected theme in user preferences using LocalStorage/IndexedDB

**CSS Modifications:**

- Create dedicated CSS rules for the modern theme that target:
    - Paragraph spacing and alignment (no indentation)
    - List presentation (enhanced visual hierarchy)
    - Emphasis styling (more prominent)
    - Disabled hyphenation (`hyphens: none;` in CSS)

**Preserve Special Features:**

- Ensure reference numbers (e.g., 1.5.16) remain properly aligned in both themes
- Maintain compatibility with the annotation system
- Preserve highlighting functionality across theme switching


## Testing Recommendations

- Verify theme switching preserves reading position
- Ensure annotations and highlights remain properly positioned when switching themes
- Test on multiple device sizes to confirm responsive behavior
- Validate that accessibility is maintained or improved with the modern theme


## Performance Considerations

- Use lazy loading to prevent unnecessary styling calculations
- Consider implementing theme-specific assets only when the respective theme is active
- Optimize CSS selectors to minimize rendering impact when switching themes

Implement these modifications to create an elegant, readable Modern Theme option that enhances the study experience while maintaining compatibility with all existing UB Reader features.

<div style="text-align: center">⁂</div>

[^1]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/6754629/6e00ddad-578f-4bdc-a48a-e991491b5c6e/The-Urantia-Book_-Foreword.html

[^2]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/collection_d465a0d1-77b9-4901-9664-a29d172aef04/f7cedec8-c87e-4541-a705-bbdea860b359/Urantia-Book-Study-Ecosystem-Developer-Guide-1.md

