import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
const fragment = readFileSync('rules/leads.rules.fragment', 'utf8');
mkdirSync('tests/generated', { recursive: true });
// This isolated policy is test-only and cannot replace shared project rules.
writeFileSync('tests/generated/firestore.rules', `rules_version = '2';
service cloud.firestore { match /databases/{database}/documents {
${fragment}
} }\n`);
const envPath = 'functions/.env.demo-desarrollosweb';
if (!existsSync(envPath)) {
  writeFileSync(envPath, 'CONTACT_EMAIL_PROVIDER=emulator\nCONTACT_EMAIL_FROM=test@example.com\n');
}
