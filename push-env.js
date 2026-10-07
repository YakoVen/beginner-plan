const { execSync } = require('child_process');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const lines = envFile.split('\n');

for (const line of lines) {
  if (line.trim() === '' || line.startsWith('#')) continue;
  const [key, ...valueParts] = line.split('=');
  if (!key) continue;
  const value = valueParts.join('=').trim();
  
  console.log(`Setting ${key}...`);
  try {
    execSync(`npx vercel env add ${key} production --force`, {
      input: value,
      stdio: ['pipe', 'inherit', 'inherit']
    });
  } catch (err) {
    console.error(`Failed to set ${key}`);
  }
}
