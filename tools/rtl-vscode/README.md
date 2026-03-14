# RTL for VS Code Agents

Source: https://github.com/GuyRonnen/rtl-for-vs-code-agents (v8.2.1)

Adds proper RTL (Right-to-Left) support for AI chat agents in VS Code, Cursor, and Antigravity.
Relevant for this project since the site content is in Hebrew.

## Quick Install (Mac/Linux)

```bash
cd tools/rtl-vscode
bash install.sh
```

## Quick Install (Windows)

```powershell
cd tools\rtl-vscode
.\install.ps1
```

## What it does

- Auto-detects Hebrew/Arabic/Persian text and applies RTL styling
- Works with Claude Code, GitHub Copilot Chat, and Gemini Code Assist
- Code blocks stay LTR
- Includes YOLO mode (auto-approve tool calls with countdown)
- User message navigation buttons (↑↓)

## Claude Code only (Windows)

```powershell
.\claude-install.ps1
```

## Diagnose issues

```bash
bash diagnose-rtl.sh   # Mac/Linux
.\diagnose-rtl.ps1     # Windows
```

## Uninstall

```bash
bash uninstall.sh      # Mac/Linux
.\uninstall.ps1        # Windows
```

## VSIX Install (Alternative)

Download the latest `.vsix` from [Releases](https://github.com/GuyRonnen/rtl-for-vs-code-agents/releases),
then in VS Code: `Ctrl+Shift+X` → `...` → "Install from VSIX..."
