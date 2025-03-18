const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create a clean deployment directory
const deployDir = path.join(__dirname, 'clean-deploy');

try {
  console.log('Creating clean deployment directory...');
  
  // Remove existing directory if it exists
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true, force: true });
  }
  
  // Create directory structure
  fs.mkdirSync(deployDir, { recursive: true });
  fs.mkdirSync(path.join(deployDir, 'app'), { recursive: true });
  fs.mkdirSync(path.join(deployDir, 'app', 'components'), { recursive: true });
  fs.mkdirSync(path.join(deployDir, 'app', 'components', 'minimal'), { recursive: true });
  fs.mkdirSync(path.join(deployDir, 'app', 'contexts'), { recursive: true });
  fs.mkdirSync(path.join(deployDir, 'app', 'paper'), { recursive: true });
  fs.mkdirSync(path.join(deployDir, 'app', 'paper', '[paperNumber]'), { recursive: true });
  
  // Copy necessary files
  console.log('Copying files...');
  
  // Root files
  fs.copyFileSync(
    path.join(__dirname, 'next.config.js'),
    path.join(deployDir, 'next.config.js')
  );
  fs.copyFileSync(
    path.join(__dirname, 'package.json'),
    path.join(deployDir, 'package.json')
  );
  fs.copyFileSync(
    path.join(__dirname, 'tsconfig.json'),
    path.join(deployDir, 'tsconfig.json')
  );
  fs.copyFileSync(
    path.join(__dirname, 'postcss.config.js'),
    path.join(deployDir, 'postcss.config.js')
  );
  fs.copyFileSync(
    path.join(__dirname, 'tailwind.config.js'),
    path.join(deployDir, 'tailwind.config.js')
  );
  
  // App files
  fs.copyFileSync(
    path.join(__dirname, 'app', 'layout.tsx'),
    path.join(deployDir, 'app', 'layout.tsx')
  );
  fs.copyFileSync(
    path.join(__dirname, 'app', 'page.tsx'),
    path.join(deployDir, 'app', 'page.tsx')
  );
  fs.copyFileSync(
    path.join(__dirname, 'app', 'globals.css'),
    path.join(deployDir, 'app', 'globals.css')
  );
  
  // Components
  fs.copyFileSync(
    path.join(__dirname, 'app', 'components', 'ReadingArea.tsx'),
    path.join(deployDir, 'app', 'components', 'ReadingArea.tsx')
  );
  fs.copyFileSync(
    path.join(__dirname, 'app', 'components', 'SettingsPanel.tsx'),
    path.join(deployDir, 'app', 'components', 'SettingsPanel.tsx')
  );
  fs.copyFileSync(
    path.join(__dirname, 'app', 'components', 'minimal', 'HeaderWithButtons.tsx'),
    path.join(deployDir, 'app', 'components', 'minimal', 'HeaderWithButtons.tsx')
  );
  
  // Context
  fs.copyFileSync(
    path.join(__dirname, 'app', 'contexts', 'ThemeContext.tsx'),
    path.join(deployDir, 'app', 'contexts', 'ThemeContext.tsx')
  );
  
  // Paper route
  fs.copyFileSync(
    path.join(__dirname, 'app', 'paper', '[paperNumber]', 'page.tsx'),
    path.join(deployDir, 'app', 'paper', '[paperNumber]', 'page.tsx')
  );
  
  // Create vercel.json to ensure proper configuration
  const vercelConfig = {
    "version": 2,
    "buildCommand": "next build",
    "devCommand": "next dev",
    "installCommand": "npm install",
    "framework": "nextjs",
    "outputDirectory": ".next"
  };
  
  fs.writeFileSync(
    path.join(deployDir, 'vercel.json'),
    JSON.stringify(vercelConfig, null, 2)
  );
  
  // Create direct deployment command
  console.log('Setting up deployment...');
  process.chdir(deployDir);
  
  console.log('Ready for deployment!');
  console.log('');
  console.log('To deploy:');
  console.log('1. cd clean-deploy');
  console.log('2. vercel --prod');
  
} catch (error) {
  console.error('Error:', error);
}
