import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to recursively find all .ts files
function findTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to check if a file contains JSX syntax
function containsJsx(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Simple check for JSX syntax - looks for tag-like patterns
  return /<[a-zA-Z][a-zA-Z0-9]*(\s+[^>]*)?\/?>/.test(content);
}

// Function to convert .ts to .tsx if needed
function convertToTsxIfNeeded(filePath) {
  if (containsJsx(filePath)) {
    const newPath = filePath.replace(/\.ts$/, '.tsx');
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file already imports React
    const hasReactImport = /import.*React.*from.*['"]react['"]/.test(content);
    
    // Add React import if needed
    let newContent = content;
    if (!hasReactImport) {
      newContent = `import * as React from 'react';\n${content}`;
    }
    
    // Write to new .tsx file
    fs.writeFileSync(newPath, newContent);
    
    // Remove old .ts file
    fs.unlinkSync(filePath);
    
    console.log(`Converted ${filePath} to ${newPath}`);
    return true;
  }
  return false;
}

// Main execution
try {
  // Find and check all .ts files in src/
  const srcPath = path.join(__dirname, 'src');
  const files = findTsFiles(srcPath);
  
  let convertedCount = 0;
  files.forEach(file => {
    if (convertToTsxIfNeeded(file)) {
      convertedCount++;
    }
  });
  
  console.log(`Conversion completed. Converted ${convertedCount} files.`);
} catch (error) {
  console.error('Error fixing extensions:', error);
}
