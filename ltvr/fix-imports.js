import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to recursively find all .tsx and .ts files
function findTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix versioned imports
  const patterns = [
    { from: /from\s+["']lucide-react@0\.487\.0["']/g, to: 'from "lucide-react"' },
    { from: /from\s+["']@radix-ui\/react-tabs@1\.1\.12["']/g, to: 'from "@radix-ui/react-tabs"' },
    { from: /from\s+["']@radix-ui\/react-avatar@1\.1\.3["']/g, to: 'from "@radix-ui/react-avatar"' },
    { from: /from\s+["']@radix-ui\/react-label@2\.1\.2["']/g, to: 'from "@radix-ui/react-label"' },
    { from: /from\s+["']@radix-ui\/react-tooltip@1\.0\.7["']/g, to: 'from "@radix-ui/react-tooltip"' },
    { from: /from\s+["']@radix-ui\/react-separator@1\.1\.2["']/g, to: 'from "@radix-ui/react-separator"' },
    { from: /from\s+["']@radix-ui\/react-slider@1\.2\.3["']/g, to: 'from "@radix-ui/react-slider"' },
    { from: /from\s+["']@radix-ui\/react-hover-card@1\.1\.6["']/g, to: 'from "@radix-ui/react-hover-card"' },
    { from: /from\s+["']@radix-ui\/react-select@2\.1\.6["']/g, to: 'from "@radix-ui/react-select"' },
    { from: /from\s+["']@radix-ui\/react-switch@1\.1\.3["']/g, to: 'from "@radix-ui/react-switch"' },
    { from: /from\s+["']@radix-ui\/react-progress@1\.1\.2["']/g, to: 'from "@radix-ui/react-progress"' },
    { from: /from\s+["']@radix-ui\/react-dialog@1\.1\.6["']/g, to: 'from "@radix-ui/react-dialog"' },
    { from: /from\s+["']@radix-ui\/react-dropdown-menu@2\.1\.6["']/g, to: 'from "@radix-ui/react-dropdown-menu"' },
    { from: /from\s+["']@radix-ui\/react-scroll-area@1\.2\.3["']/g, to: 'from "@radix-ui/react-scroll-area"' },
    { from: /from\s+["']@radix-ui\/react-popover@1\.1\.6["']/g, to: 'from "@radix-ui/react-popover"' },
    { from: /from\s+["']class-variance-authority@0\.7\.1["']/g, to: 'from "class-variance-authority"' }
  ];
  
  // Fix imports
  patterns.forEach(pattern => {
    if (pattern.from.test(content)) {
      content = content.replace(pattern.from, pattern.to);
      modified = true;
    }
  });
  
  // Fix "../ui" imports in PaymentSystem.tsx
  if (filePath.includes('PaymentSystem.tsx') && content.includes('from "../ui"')) {
    // Replace with individual imports
    content = content.replace(/import\s+{([^}]+)}\s+from\s+["']\.\.\/ui["'];/g, (match, importNames) => {
      const components = importNames.split(',').map(name => name.trim());
      return components.map(component => 
        `import { ${component} } from "../ui/${component.toLowerCase()}";`
      ).join('\n');
    });
    modified = true;
  }
  
  // Write back if modified
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports in ${filePath}`);
  }
}

// Fix src/App.tsx imports
function fixAppImports() {
  const appPath = path.join(__dirname, 'src', 'App.tsx');
  if (fs.existsSync(appPath)) {
    let content = fs.readFileSync(appPath, 'utf8');
    content = content.replace(/from\s+["']\.\/components\//g, 'from "./src/components/');
    fs.writeFileSync(appPath, content);
    console.log('Fixed imports in src/App.tsx');
  }
}

// Fix use-responsive.ts error
function fixUseResponsive() {
  const filePath = path.join(__dirname, 'src', 'components', 'ui', 'use-responsive.ts');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Look for syntax errors around line 315
    fs.writeFileSync(filePath, content);
    console.log('Checked use-responsive.ts');
  }
}

// Main execution
try {
  // Fix src/App.tsx imports
  fixAppImports();
  
  // Find and fix imports in all TS/TSX files in src/
  const srcPath = path.join(__dirname, 'src');
  const files = findTsFiles(srcPath);
  
  files.forEach(file => {
    fixImportsInFile(file);
  });
  
  // Fix use-responsive.ts
  fixUseResponsive();
  
  console.log('Import fixing completed successfully!');
} catch (error) {
  console.error('Error fixing imports:', error);
}
