# UB Reader - Next.js Application

The UB Reader is a Next.js application for reading The Urantia Book, providing a modern responsive interface with theme customization options.

## Repository Overview

The JSON files in `public/json/` contain the text content of The Urantia Book, structured for efficient access through the application.

## Project Structure

- `/app` - Next.js App Router directory containing all pages and components
- `/public` - Static files and JSON data
- `/app/components` - React components
- `/app/contexts` - Context providers (including ThemeContext)
- `/app/paper/[paperNumber]` - Dynamic route for paper pages

## Getting Started

### Prerequisites

- Node.js (16.x or later)
- npm or yarn

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/emen7/ecosystem.git
   cd ecosystem
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### WSL Development Environment

For development using Windows Subsystem for Linux (WSL), see the detailed guide at:

- [WSL Deployment Guide](app/documents/WSL-DEPLOYMENT-GUIDE.md)

## Deployment

This project uses direct GitHub to Vercel integration for automated deployments.

### Deployment Workflow

1. Changes pushed to the `main` branch are automatically deployed to Vercel
2. Pull requests generate preview deployments for testing
3. For detailed deployment instructions, see:
   - [Vercel GitHub Integration Guide](app/documents/VERCEL-GITHUB-INTEGRATION.md)
   - [Deployment Strategy Summary](app/documents/DEPLOYMENT-STRATEGY-SUMMARY.md)

### Quick Setup Scripts

The repository includes scripts to automate setup and testing:

- `wsl-repository-setup.sh` - Prepares the repository for WSL development
- `test-theme-fix.sh` - Tests the ThemeContext fix locally

Make them executable and run:

```bash
chmod +x wsl-repository-setup.sh test-theme-fix.sh
./wsl-repository-setup.sh
```

## Features

- Responsive UI for desktop and mobile devices
- Dark/light/sepia theme options
- Font size and spacing customization
- Section navigation
- Paper selection

## Troubleshooting

For common issues and solutions, see the troubleshooting sections in:

- [WSL Deployment Guide](app/documents/WSL-DEPLOYMENT-GUIDE.md)
- [Vercel GitHub Integration Guide](app/documents/VERCEL-GITHUB-INTEGRATION.md)
