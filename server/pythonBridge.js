import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Locate virtualenv Python or fallback to system python
const projectRoot = path.resolve(__dirname, '..');
const venvPythonWin = path.join(projectRoot, '.venv', 'Scripts', 'python.exe');
const venvPythonUnix = path.join(projectRoot, '.venv', 'bin', 'python');
const cliScript = path.join(projectRoot, 'python', 'cli.py');

function getPythonExecutable() {
  if (fs.existsSync(venvPythonWin)) return venvPythonWin;
  if (fs.existsSync(venvPythonUnix)) return venvPythonUnix;
  return 'python';
}

/**
 * Executes python/cli.py with an action and input payload via stdin
 */
export function executePythonBridge(action, payload = {}) {
  return new Promise((resolve, reject) => {
    const pythonExe = getPythonExecutable();
    const args = [cliScript, '--action', action, '--stdin'];

    const child = spawn(pythonExe, args, {
      cwd: projectRoot,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString('utf-8');
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString('utf-8');
    });

    child.on('error', (err) => {
      reject(new Error(`Failed to spawn Python process: ${err.message}`));
    });

    child.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`Python bridge exited with code ${code}: ${stderr || stdout}`));
      }
      try {
        const parsed = JSON.parse(stdout);
        resolve(parsed);
      } catch (err) {
        reject(new Error(`Failed to parse Python output: ${err.message}. Raw output: ${stdout}`));
      }
    });

    // Write input payload to stdin and close
    child.stdin.write(JSON.stringify(payload));
    child.stdin.end();
  });
}

export async function checkPythonEngineHealth() {
  try {
    const res = await executePythonBridge('health');
    return { available: true, ...res };
  } catch (err) {
    return { available: false, error: err.message };
  }
}

export async function runPythonForensics(message, context = '', concerns = '') {
  return executePythonBridge('metrics', { message, context, concerns });
}

export async function runPythonInvestigate(message, context = '', concerns = '') {
  return executePythonBridge('investigate', { message, context, concerns });
}

export async function runPythonCourtroom(caseData) {
  return executePythonBridge('courtroom', caseData);
}
