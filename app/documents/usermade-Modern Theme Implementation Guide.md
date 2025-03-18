<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# 

---

# Modern Theme Implementation Guide

Based on the project notes from revelationary.net, here are the specific requirements for implementing the theme choice functionality in the UB Reader:

## Theme Options

The UB Reader should offer two distinct theme options:

1. **Modern Theme** (Default)
    - Sans-serif font for improved digital legibility
    - Increased boldness for italicized words and words in ALL CAPS
    - Proper alignment for numbered lists and tables (numbers under numbers, text under text)
    - Visual indicators (faint lines) between paragraphs that indicate topic changes
    - Text that wraps more naturally for better readability
    - Optimized for reading on digital devices, especially phones and tablets
2. **Traditional Theme** (Fallback option)
    - Formatting that matches the original book's presentation
    - Numbered lists displayed as numbered paragraphs
    - Standard emphasis for italicized text
    - Traditional paragraph spacing without visual indicators
    - Preserves the historical presentation familiar to long-time readers

## Implementation Requirements

### Typography System

- Create a typography configuration that can switch between sans-serif (modern) and serif (traditional) font families
- Implement conditional styling for emphasis (bold italics in modern, standard italics in traditional)
- Ensure proper font scaling across device sizes in both themes


### List and Table Formatting

- Develop two distinct rendering approaches for numbered lists:
    - Modern: Proper column alignment with numbers under numbers and text under text
    - Traditional: Paragraph-style with numbers inline with text
- Implement proper table formatting in the modern theme while preserving original formatting in traditional theme
- Handle special cases like lists with rows of dots between elements


### User Preferences

- Set Modern Theme as the default option
- Store theme preference in localStorage to persist across sessions
- Provide clear visual indicators of which theme is currently active
- Include a theme toggle in the settings panel with descriptive labels


### Theme Toggle Component

- Create an easily accessible theme toggle in the settings menu
- Include brief descriptions of each theme option
- Provide a visual preview of how each theme affects the text
- Implement smooth transitions when switching between themes


### Accessibility Considerations

- Ensure both themes maintain proper contrast ratios
- Test readability of both themes across different device sizes
- Verify that screen readers properly handle both formatting approaches
- Maintain proper heading structure regardless of theme selection

This implementation will allow users to choose their preferred reading experience while defaulting to the modern theme that offers improved readability on digital devices.

