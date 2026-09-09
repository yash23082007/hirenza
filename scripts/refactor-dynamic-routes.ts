import fs from 'fs';
import path from 'path';

// This script will split the index pages into dynamic segment pages
const dirs = [
  { name: 'dsa-sheets', param: 'sheetId', queryParam: 'sheet', dataExport: 'dsaSheets', file: 'dsaSheets' },
  { name: 'company-wise-dsa', param: 'companyId', queryParam: 'company', dataExport: 'companies', file: 'companies' },
  { name: '20-patterns', param: 'patternId', queryParam: 'pattern', dataExport: 'dsaPatterns', file: 'patterns' },
  { name: 'most-asked-questions', param: 'tech', queryParam: 'tech', dataExport: 'techQuestions', file: 'techQuestions' },
];

for (const dir of dirs) {
  const dirPath = path.join(process.cwd(), 'src', 'app', 'preparation', dir.name);
  const oldPagePath = path.join(dirPath, 'page.tsx');
  
  if (!fs.existsSync(oldPagePath)) continue;

  const content = fs.readFileSync(oldPagePath, 'utf8');

  // We won't try to parse and modify React code via regex, it's too complex.
  // Instead, we will do it manually for these 4 files using the agent's edit tools or a script.
}
