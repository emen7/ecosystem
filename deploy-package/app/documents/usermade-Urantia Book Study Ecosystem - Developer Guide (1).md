<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# 

---

# Urantia Book Study Ecosystem - Developer Guide

## Project Overview

This ecosystem consists of four integrated applications designed to enhance the study and exploration of The Urantia Book:

1. **UB Reader** - A modern, responsive reading application
2. **Almanac** - A reference tool with curated content cards linking to the Reader
3. **CMS** - A content management system for maintaining the Almanac
4. **UBAI** - An AI guide for exploring Urantia Book concepts

This document focuses primarily on the UB Reader, which serves as the foundation for the entire ecosystem.

## Development Priorities

1. Focus first on the UB Reader as the core application
2. Ensure the Reader is fully functional before proceeding to the Almanac
3. Implement the CMS once the Almanac structure is defined
4. Develop UBAI as a final phase after the other components are established

## UB Reader Specifications

### Core Principles

- **Responsive Design**: Fully functional across all device sizes (mobile, tablet, desktop)
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **Performance**: Fast loading with optimized assets
- **Offline Capability**: Core reading functionality available offline


### Technical Stack

- Modern JavaScript frameworks (React preferred)
- CSS-in-JS or styled-components for styling
- JSON format for book content
- LocalStorage/IndexedDB for user preferences and annotations
- Progressive Web App (PWA) capabilities


### Content Structure

The Urantia Book consists of:

- 196 Papers (chapters)
- Sections within papers
- Paragraphs with unique reference numbers (e.g., 1:5.16 = Paper 1, Section 5, Paragraph 16)


### User Interface Components

#### Navigation

- Persistent header with title and navigation controls
- Hamburger menu for accessing papers and sections
- Bottom navigation bar for mobile devices
- Paper/section selection sidebar
- Table of contents with collapsible sections
- Search functionality with highlighted results
- History of recently viewed sections


#### Reading Interface

- Clean, distraction-free reading area
- Adjustable text size (5 levels from small to extra large)
- Font selection (serif, sans-serif, dyslexic-friendly options)
- Line spacing adjustment
- Margin width control
- Light/dark theme toggle (default to dark mode)
- Toggle for showing/hiding reference numbers
- Paragraph-level navigation


#### Annotation System

- Text highlighting with multiple color options
- Note-taking capability tied to specific paragraphs
- Bookmarking functionality
- Collection system for saving quotes and passages
- Export options for annotations and highlights


#### Multi-language Support

- Initially support for English, Spanish, French, and German
- Language selector in settings
- Maintain reference numbers across translations
- Preserve user annotations when switching languages


### Advanced Features

#### Reference System

- Toggle for displaying reference numbers (1:5.16 format)
- Exclude reference numbers from text-to-speech reading
- Deep linking to specific paragraphs (e.g., example.com/reader/1/5/16)
- Copy reference with text option


#### Audio Integration (Later Phase)

- Browser-based text-to-speech functionality
- Voice selection from available system voices
- Reading speed adjustment
- Fallback to pre-recorded MP3 library when browser TTS unavailable
- Paragraph highlighting during audio playback


#### Performance Optimizations

- Lazy loading for content outside the viewport
- Code splitting for improved initial load time
- Asset optimization (images, fonts, etc.)
- Service worker for offline capabilities
- Efficient state management to minimize re-renders


## Almanac Integration

The Reader should support:

- Deep linking from Almanac content cards to specific UB passages
- Contextual information display when navigating from Almanac
- Shared user preferences between Reader and Almanac
- Consistent styling and interaction patterns


## User Preferences

Store and respect user preferences for:

- Font size and family
- Theme selection
- Reference number display
- Reading position (remember where user left off)
- Annotation display settings
- Language preference


## Design Inspiration

Draw inspiration from these exemplary reading applications:

### Kindle Reader

- Clean, distraction-free interface
- Customizable reading experience
- Robust annotation system
- Progress tracking


### YouVersion Bible App

- Efficient navigation between books/chapters
- Reference number handling
- Audio integration
- Highlighting and note-taking


## Development Approach

- Component-based architecture
- Mobile-first responsive design
- Progressive enhancement
- Accessibility as a core requirement, not an afterthought
- Comprehensive testing across devices and browsers


## Future Considerations

- Integration with study groups
- Social sharing capabilities
- Enhanced search with concept-based results
- Reading plans and guided study paths
- Expanded language support

---

This document serves as a guide for GitHub Copilot to assist in developing the UB Reader application. The implementation details are flexible, but the core functionality and user experience described above should be maintained. 

If the human developer (HD) suggests something unwise for the overall, the AI should point that out. The HD will do the same for AI. AI is asked to create, when appropriate, [info] points in the chat window to briefly inform the HD about coding concepts that can help the HD learn shorthand concepts that will facilitate the working partnership.

The Urantia Book is about truth, beauty, and goodness. This App and its sub-apps should reflect these values.

