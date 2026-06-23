import fs from 'fs';
import path from 'path';

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      filelist = walkSync(fullPath, filelist);
    } else {
      filelist.push(fullPath);
    }
  });
  return filelist;
};

const srcDir = '/home/aswin_m_s/workspace/edustreamproject/backend/src';
const files = walkSync(srcDir);

files.forEach(file => {
  if (file.endsWith('.ts')) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Replace .js at the end of imports
    const newContent1 = content.replace(/(import\s+.*?from\s+['"].*?)\.js(['"])/g, '$1$2');
    if (newContent1 !== content) {
      content = newContent1;
      modified = true;
    }
    
    // Replace relative paths with @/
    const fileDir = path.dirname(file);
    const newContent2 = content.replace(/(import\s+.*?from\s+['"])(\.\.?\/.*?)(['"])/g, (match, p1, p2, p3) => {
        const resolvedPath = path.resolve(fileDir, p2);
        const relativeToSrc = path.relative(srcDir, resolvedPath);
        return `${p1}@/${relativeToSrc}${p3}`;
    });

    if (newContent2 !== content) {
      content = newContent2;
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(file, content);
      console.log(`Updated imports in ${file}`);
    }
  }
});
