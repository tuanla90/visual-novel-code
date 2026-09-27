# Antigravity CDP execution contract

Use this contract only after the user explicitly asks Codex to delegate a Google Flow browser run to Antigravity.

## Delegation prompt

Resolve every value in angle brackets before sending this prompt:

```text
You are the execution worker for a Google Flow image-generation run. Codex is the coordinator and final reviewer.

Authorized inputs:
- Prompt file: <absolute-prompt-file>
- Ordered asset IDs: <ids>
- Reference images: <absolute-reference-paths-or-none>

Authorized outputs:
- Image directory: <absolute-output-directory>
- Debug screenshots: <absolute-debug-directory>

Authorized Antigravity browser profile: <profile-number>

Use Antigravity's native browser/CDP capability with the named existing profile and operate only the Google Flow tab. Reuse the same profile and tab for the complete batch. Do not execute chrome.exe, cmd.exe /c chrome.exe, launch-chrome-cdp.ps1, launch-chrome-cdp.bat, or any command that creates a user-data-dir, opens a remote-debugging port, or relaunches Chrome with logging flags. If the named profile is unavailable, return BLOCKED_USER_ACTION instead of launching another browser.

You may run non-launching helper scripts under .agents/skills/google-flow-image/scripts, read the named inputs, write generated images/debug screenshots to the named output paths, and overwrite only the current target image during a retry.

Run assets sequentially in manifest order. Allow the initial attempt plus at most two retries per asset. Local reference images are text-prompt research only and must not be uploaded unless the user explicitly requests attachment. Prefer prompts with the visual characteristics written directly into the text and no `[ref]` tag.

If login, CAPTCHA, consent, account recovery, quota/payment, an account warning, or navigation outside Google Flow is required, stop and report BLOCKED_USER_ACTION. Do not inspect unrelated tabs or account data. Do not install software, modify project source, delete unrelated files, or write outside the authorized paths.

After each asset, verify the downloaded file exists, is decodable, and record its dimensions. Continue past an exhausted independent failure; skip dependent assets if their anchor failed. Return one row per ID with: ID, attempts, output path, dimensions, reference attached yes/no/n-a, result PASS/FAILED/SKIPPED/BLOCKED, and concise evidence/error.
```

## Coordinator review

Codex independently compares the report with the manifest, confirms output locations, opens every successful image, checks dimensions and prompt constraints, and marks each asset `pass`, `regenerate`, or `blocked`.

Antigravity's `PASS` means execution succeeded; it is not final creative approval.
