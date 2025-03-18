const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function findFiles(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const files = await readdir(dir);
  const result = [];

  for (const file of files) {
    if (file === 'node_modules') continue;
    
    const filePath = path.join(dir, file);
    const stats = await stat(filePath);

    if (stats.isDirectory()) {
      const subDirFiles = await findFiles(filePath, extensions);
      result.push(...subDirFiles);
    } else if (extensions.includes(path.extname(file))) {
      result.push(filePath);
    }
  }

  return result;
}

async function fixThemeContextIssues() {
  console.log('Searching for ThemeContext usage issues...');
  const files = await findFiles('app');
  let fixedFiles = 0;

  for (const file of files) {
    try {
      const content = await readFile(file, 'utf8');
      
      // Check if file uses ThemeContext
      if (content.includes('useTheme()')) {
        console.log(`Checking ${file}...`);
        
        // Fix pattern 1: const { colorScheme } = useTheme();
        const pattern1 = /const\s*\{\s*(colorScheme|fontSize|fontFamily|lineSpacing|marginWidth|showReferenceNumbers)(?:,\s*(colorScheme|fontSize|fontFamily|lineSpacing|marginWidth|showReferenceNumbers))*\s*\}\s*=\s*useTheme\(\);/g;
        if (pattern1.test(content)) {
          console.log(`  Found direct destructuring in ${file}`);
          
          // Replace with const { theme } = useTheme();
          const newContent = content.replace(
            pattern1,
            'const { theme } = useTheme();'
          );
          
          // Fix pattern 2: Replace all direct uses of the destructured variables
          let finalContent = newContent;
          const properties = ['colorScheme', 'fontSize', 'fontFamily', 'lineSpacing', 'marginWidth', 'showReferenceNumbers'];
          
          properties.forEach(prop => {
            // Standalone property reference (not theme.property or part of a word)
            const propRegex = new RegExp(`(?<!(theme\\.|\\w))${prop}(?!\\w)`, 'g');
            finalContent = finalContent.replace(propRegex, `theme.${prop}`);
          });
          
          // Write the fixed content back to the file
          await writeFile(file, finalContent, 'utf8');
          console.log(`  Fixed ${file}`);
          fixedFiles++;
        }
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  return fixedFiles;
}

// Run the fixer script
(async () => {
  try {
    const fixedCount = await fixThemeContextIssues();
    console.log(`\nFixed ThemeContext issues in ${fixedCount} files.`);
  } catch (err) {
    console.error('Error:', err);
  }
})();
