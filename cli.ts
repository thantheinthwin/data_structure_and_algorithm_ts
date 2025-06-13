import { runWithStats } from "./utils/run-with-stats";
import fs from 'fs';
import path from 'path';

const [, , funcName, ...rawArgs] = process.argv;

// Smart parse: number, boolean, string, array
function parseArg(arg: string): any {
  // Try to parse as array first
  if (arg.startsWith('[') && arg.endsWith(']')) {
    try {
      return JSON.parse(arg);
    } catch (e) {
      // If JSON.parse fails, continue with other parsing
    }
  }
  
  if (!isNaN(Number(arg))) return Number(arg);
  if (arg.toLowerCase() === 'true') return true;
  if (arg.toLowerCase() === 'false') return false;
  return arg;
}

const args = rawArgs.map(parseArg);

function listAvailableFunctions() {
  const srcDir = path.join(__dirname, 'src');
  const files = fs.readdirSync(srcDir);
  const functions = files
    .filter(file => file.endsWith('.ts'))
    .map(file => file.replace('.ts', ''));
  
  console.log('Available functions:');
  functions.forEach(func => console.log(`- ${func}`));
}

async function showFunctionHelp(funcName: string) {
  try {
    const filePath = path.join(__dirname, 'src', `${funcName}.ts`);
    const sourceCode = fs.readFileSync(filePath, 'utf-8');
    
    // Extract JSDoc comment
    const jsDocMatch = sourceCode.match(/\/\*\*([\s\S]*?)\*\/\s*export/);
    
    if (jsDocMatch) {
      const doc = jsDocMatch[1]
        .split('\n')
        .map((line: string) => line.trim().replace(/^\s*\*\s?/, ''))
        .filter((line: string) => line)
        .join('\n');
      console.log(doc);
    } else {
      console.log(`No documentation available for ${funcName}`);
    }
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}

async function main() {
  // Handle --list or -l flag
  if (funcName === '--list' || funcName === '-l') {
    listAvailableFunctions();
    return;
  }

  // Handle --help or -h flag
  if (funcName === '--help' || funcName === '-h') {
    console.log('Usage:');
    console.log('  npm run cli -- [function] [args...]');
    console.log('  npm run cli -- --list (-l)');
    console.log('  npm run cli -- [function] --help (-h)');
    return;
  }

  // Handle function-specific help
  if (args.includes('--help') || args.includes('-h')) {
    await showFunctionHelp(funcName);
    return;
  }

  if (!funcName) {
    console.error('❌ Please provide a function name.');
    process.exit(1);
  }

  try {
    const module = await import(`./src/${funcName}.ts`);
    const fn = module.default || module[funcName];

    if (typeof fn !== 'function') {
      throw new Error(`'${funcName}' is not exported as a function`);
    }

    const { result, executionTime } = runWithStats(() => fn(...args));

    console.log('==========================================');
    console.log('Result:');
    console.log(result);
    console.log('==========================================');
    console.log('Execution Time:', executionTime, 'ms');
    console.log('==========================================');
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}

main();
