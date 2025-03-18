const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);

// Files we've already looked at to avoid duplicates
const visited = new Set();

async function findFiles(dir, fileExtensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const files = await readdir(dir);
  const result = [];

  for (const file of files) {
    if (file === 'node_modules') continue;
    
    const filePath = path.join(dir, file);
    if (visited.has(filePath)) continue;
    
    visited.add(filePath);
    const stats = await stat(filePath);

    if (stats.isDirectory()) {
      const subDirFiles = await findFiles(filePath, fileExtensions);
      result.push(...subDirFiles);
    } else if (fileExtensions.includes(path.extname(file))) {
      result.push(filePath);
    }
  }

  return result;
}

async function findThemeContext(startPath) {
  console.log(`Searching for ThemeContext usage in: ${startPath}`);
  const files = await findFiles(startPath);
  const issues = [];

  for (const file of files) {
    try {
      const content = await readFile(file, 'utf8');
      
      // Look for issues like destructuring colorScheme directly
      if (content.includes('useTheme()') && 
          (content.includes('{ colorScheme }') || 
           content.includes('{ fontSize }') || 
           content.includes('{ fontFamily }') || 
           content.includes('{ lineSpacing }') || 
           content.includes('{ marginWidth }') || 
           content.includes('{ showReferenceNumbers }'))) {
        
        // Get line information for better context
        const lines = content.split('\n');
        const lineInfo = [];
        
        lines.forEach((line, index) => {
          if (line.includes('useTheme()') && 
             (line.includes('colorScheme') || 
              line.includes('fontSize') || 
              line.includes('fontFamily') || 
              line.includes('lineSpacing') || 
              line.includes('marginWidth') || 
              line.includes('showReferenceNumbers'))) {
            lineInfo.push({ line: index + 1, content: line.trim() });
          }
        });
        
        if (lineInfo.length > 0) {
          issues.push({
            file: file.replace(startPath, ''),
            lines: lineInfo
          });
        }
      }
    } catch (err) {
      console.error(`Error reading file ${file}:`, err);
    }
  }

  return issues;
}

// Start the search
(async () => {
  try {
    const issues = await findThemeContext('app');
    
    console.log('\n=============================================');
    console.log('ThemeContext Usage Issues Found:');
    console.log('=============================================\n');
    
    if (issues.length === 0) {
      console.log('No issues found!');
    } else {
      issues.forEach(issue => {
        console.log(`File: ${issue.file}`);
        issue.lines.forEach(line => {
          console.log(`  Line ${line.line}: ${line.content}`);
        });
        console.log('');
      });
      
      console.log(`Total files with issues: ${issues.length}`);
    }
  } catch (err) {
    console.error('Error:', err);
  }
})();
