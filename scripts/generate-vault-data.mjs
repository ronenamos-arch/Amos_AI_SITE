import fs from 'fs';

const html = fs.readFileSync('content/resources/102-prompt.html', 'utf8');
const match = html.match(/const DATA = (\{[\s\S]*?\});\s*(?:const|function|\/\/|<)/);
if (!match) throw new Error('No DATA match found in 102-prompt.html');

const rawData = eval('(' + match[1] + ')');

// Set of prompt numbers that are accessible for free
const FREE_NUMBERS = new Set([
  1, 2, 3, 6, 7, 8,    // Claude App (Variance, Board Brief, Expense Savings, IR Q&A, Audit finding, Town hall)
  26, 27, 31, 32,      // Claude in Excel (Dynamic models, Variance helper, Cleaning, Reconcile)
  51, 52, 58,          // Artifacts (Interactive P&L, Sensitivity simulator, Working capital)
  76, 77, 86,          // Claude Code (PDF extractor, Bank reconciliation, Trial balance validator)
  101                  // Demo Apps (CFO Interactive Terminal)
]);

const allPrompts = [];

for (const surface in rawData) {
  const group = rawData[surface];
  for (const item of group.items) {
    allPrompts.push({
      id: `prompt-${item.num}`,
      num: item.num,
      surface: surface,
      surfaceLabel: group.label,
      category: item.cat,
      level: item.level,
      title: item.text,
      prompt: item.prompt,
      isFree: FREE_NUMBERS.has(item.num),
    });
  }
}

const fileContent = `// Generated file containing all 102 prompts for the Skill Vault
export interface VaultPrompt {
  id: string;
  num: number;
  surface: string;
  surfaceLabel: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  prompt: string;
  isFree: boolean;
}

export const ALL_VAULT_PROMPTS: VaultPrompt[] = ${JSON.stringify(allPrompts, null, 2)};

export const VAULT_SURFACES = [
  { id: "all", label: "כל הכלים (102)" },
  { id: "Claude App", label: "Claude App (25)" },
  { id: "Claude in Excel", label: "Claude ב-Excel (25)" },
  { id: "Artifacts", label: "Artifacts ודשבורדים (25)" },
  { id: "Claude Code", label: "Claude Code וסקריפטים (25)" },
  { id: "Demo Apps", label: "אפליקציות דמו (2)" },
];

export const VAULT_CATEGORIES = Array.from(new Set(ALL_VAULT_PROMPTS.map(p => p.category)));

export const VAULT_LEVELS = [
  { id: "all", label: "כל הרמות" },
  { id: "Beginner", label: "מתחילים" },
  { id: "Intermediate", label: "בינוני" },
  { id: "Advanced", label: "מתקדם" },
] as const;
`;

fs.writeFileSync('lib/prompts-vault-data.ts', fileContent, 'utf8');
console.log(`Successfully generated lib/prompts-vault-data.ts with ${allPrompts.length} prompts.`);
