---
name: tokens-sync
description: Automates the full pipeline that pulls Figma Variables (colors, spacing, radii, typography) into this repo's tokens.json/tokens.dark.json (W3C DTCG format), rebuilds src/styles/tokens.css via Style Dictionary, and commits + pushes the result. Use this whenever the user invokes /tokens-sync, pastes a Figma file URL and asks to sync/update/pull/refresh design tokens, says things like "update the tokens from Figma", "regenerate tokens.css", "pull the latest colors/spacing from Figma", or wants to keep the design system's CSS/Tailwind output in sync with Figma Variables. Always use this instead of hand-writing a one-off Figma export script or manually editing tokens.json in this project — it already knows how to detect renamed/removed variables safely and won't overwrite anything without showing a diff first.
---

# tokens-sync

Syncs this repo's design tokens from a Figma file's Variables, end to end:
Figma → `tokens.json` (+ `tokens.dark.json` for a second mode) → `src/styles/*.css` → a git commit, pushed only after the human has seen the diff.

The reason this is a skill and not "just run a script" is that step 1 (reading
Figma) has to happen live, through the Figma MCP tools, in this conversation
— it can't be pre-baked into a Node script the way the rest of the pipeline
can. Everything downstream of the raw Figma read *is* a deterministic
transform, so it lives in `scripts/sync-tokens-from-figma-export.mjs` and you
should call that script rather than re-deriving the DTCG conversion or the
rename-detection logic by hand each time — it's already been tested against
edge cases (alias chains, renamed variables, unitless-vs-dimension numbers)
that are easy to get subtly wrong if you rewrite them from scratch.

## Step 1 — EXPORT

1. Extract the file key from the given Figma URL: the path segment right
   after `/design/` (e.g. `https://www.figma.com/design/g3Ibcx1ZyRuIenXrmCq65P/...`
   → `g3Ibcx1ZyRuIenXrmCq65P`). If the user invoked `/tokens-sync` with no URL,
   ask for one — don't guess a previously-used file.
2. Load the `figma-use` skill (required before any `use_figma` call).
3. Run the exact script in [references/figma-export-snippet.md](references/figma-export-snippet.md)
   via `use_figma`, passing the extracted `fileKey`. This reads **all** local
   Variable collections via `figma.variables.getLocalVariableCollectionsAsync()`
   / `getLocalVariablesAsync()` — not `get_variable_defs`, which only returns
   variables bound to one specific node and mixes in legacy Styles, so it
   would silently miss variables and misreport what's actually a Variable.
4. Save the returned JSON to a temp file, e.g. `/tmp/figma-export-<fileKey>.json`.
   If the file has a huge Variables collection and the `use_figma` call's
   output gets truncated or hits a size limit, split it: re-run the snippet
   once per collection (filter the `collections` array in the script to a
   single collection by name) and save each to its own temp file — the
   converter script accepts multiple input files and merges them.
5. Run the converter in **dry-run mode** (no `--apply`):
   ```bash
   node .claude/skills/tokens-sync/scripts/sync-tokens-from-figma-export.mjs /tmp/figma-export-<fileKey>.json
   ```
   Run this from the repo root — the script resolves `tokens.json` etc.
   relative to the current working directory, not its own location.
6. **Show the printed diff to the user as-is** (added / changed / renamed /
   removed counts, with the specific token paths). Do not paraphrase away the
   renamed/removed sections — those are exactly what needs a human look.
   - If there's a `?` section ("no longer matched, but had NO Figma id on
     file") — that means the existing `tokens.json` predates this skill (it
     has no `$extensions."com.figma.variableId"` to match against). This is
     expected on the *first* sync after adopting the skill and will produce a
     noisy-looking diff even though nothing is actually wrong — explain that
     to the user rather than treating it as a real removal.
7. **Get explicit confirmation before writing anything** — this is a hard
   requirement, not a suggestion, especially for renames and removals: a
   silently-renamed token that keeps its old name in someone's CSS is a
   worse bug than the one this skill exists to prevent. Once confirmed,
   re-run the same command with `--apply` appended.

## Step 2 — BUILD

Check whether `config.js` (and, if `tokens.dark.json` was produced, `config.dark.js`)
already exist at the repo root.

- **If they exist, reuse them as-is.** Don't regenerate or "improve" a
  working config — if this project already has a Tailwind-preset format
  hook or other customization in `config.js`, that's deliberate and should
  survive a token sync untouched.
- **If `config.js` is missing**, copy [assets/config.default.js](assets/config.default.js)
  to `config.js` at the repo root. If `tokens.dark.json` exists and
  `config.dark.js` is missing, also copy [assets/config.dark.default.js](assets/config.dark.default.js)
  to `config.dark.js`. Tell the user you created these with sensible
  defaults (light `:root` + optional `[data-theme="dark"]` override) and
  that they're free to customize them — e.g. to add a Tailwind preset like
  this project's own `config.js` already does, if `tailwind.tokens.js` output
  is wanted.
- Then run:
  ```bash
  npx style-dictionary build --config config.js
  ```
  and, if `config.dark.js` exists:
  ```bash
  npx style-dictionary build --config config.dark.js
  ```
  (or `npm run build:tokens` if that script already exists in `package.json`
  and wraps both — check first, don't duplicate it).

## Step 3 — DIFF

Before touching git, show what actually changed in the generated CSS, not
just raw line noise:
```bash
git diff --stat -- tokens.json tokens.dark.json src/styles/
```
Pair this with the token-level diff from Step 1 so the user sees both "which
Figma Variables changed" and "which CSS files that produced" in one place.
If `git diff --stat` reports nothing changed here despite Step 1 reporting
additions/changes, that's worth flagging — it likely means the build step
didn't pick up the new tokens.json (wrong config `source`, or the build
command failed silently upstream).

## Step 4 — COMMIT

Only after the user has seen both diffs and confirmed:
```bash
git add tokens.json tokens.dark.json src/styles/tokens.css src/styles/tokens.dark.css src/styles/tailwind.tokens.js
git commit -m "chore(tokens): sync from Figma"
```
(Only `add` the files that actually exist/changed — not every path in that
list is guaranteed to be present in every project.)

Then **ask before pushing** — a push is visible to anyone else with access to
the repo, so it needs its own confirmation even if the commit itself didn't.
Once confirmed:
```bash
git push
```
to the current branch. Standard git safety rules apply here same as
anywhere else in this repo: real commit, never `--amend`, never
`--force`, never skip hooks. If the working tree has *other* unrelated
uncommitted changes when you get to this step, don't sweep them into this
commit — `git status` first and stage only the token/CSS files above.

## Final report

End every run with a short summary, regardless of how it went:
```
Tokens synced from <Figma file name/URL>.
Total: <N> tokens (<X> added, <Y> changed, <Z> renamed, <W> removed)
Commit: <short sha> — <link if the repo has a remote>
```
If the run stopped early (rate limit, user declined to confirm, build
failed), say so plainly instead of a partial success report — e.g. "Export
done, diff shown, waiting on your confirmation before writing anything" is a
valid and honest end state, not a failure to hide.
