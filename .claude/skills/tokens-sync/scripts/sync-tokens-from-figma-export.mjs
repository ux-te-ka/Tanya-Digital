#!/usr/bin/env node
// Converts a raw Figma Plugin API variable dump (see ../references/figma-export-snippet.md)
// into W3C DTCG tokens.json (+ a second file per extra mode, e.g. tokens.dark.json),
// diffs it against whatever tokens.json already exists, and only writes files when
// called with --apply. Without --apply it only prints the diff — this is what makes
// "show the diff before committing anything" possible without a second code path.
//
// Usage:
//   node sync-tokens-from-figma-export.mjs <export.json> [<export2.json> ...] [--apply]
//
// Multiple export JSON files are merged (their `collections` arrays are concatenated) —
// use this when a file's Variables collection was too big to fetch in one use_figma call
// and had to be split into one export per collection.
//
// Repo layout assumed (matches this project's existing Style Dictionary setup):
//   tokens.json        <- mode[0] of every collection (the "default" mode)
//   tokens.<mode>.json <- mode[1] of every collection, one file per extra mode
//                         (named "tokens.dark.json" if the mode name contains "dark",
//                         otherwise a slugified version of the mode name)

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const inputPaths = args.filter((a) => a !== "--apply");

if (inputPaths.length === 0) {
  console.error("Usage: node sync-tokens-from-figma-export.mjs <export.json> [...] [--apply]");
  process.exit(1);
}

// Assumes this script is invoked with the repo root as the working directory
// (that's how SKILL.md instructs Claude to run it) — deliberately not derived
// from the script's own location, since that arithmetic is one relocation
// away from being wrong and silently writing files to the wrong place.
const repoRoot = process.cwd();

// ---------- 1. load + merge raw exports ----------

const allCollections = [];
for (const p of inputPaths) {
  const data = JSON.parse(readFileSync(p, "utf-8"));
  const collections = data.collections ?? [data]; // accept a bare single-collection object too
  allCollections.push(...collections);
}

// ---------- 2. name/path helpers ----------

// Figma variable/collection names sometimes carry a descriptive suffix, e.g.
// "50-#FCFCFD" or "Semibold - 600" — strip that for a clean token path segment,
// but leave things like "alpha-30" alone (no spaces around that dash).
function slugSegment(seg) {
  return seg
    .replace(/-#[0-9A-Fa-f]{3,8}(\(\d+%\))?$/, "")
    .replace(/\s+-\s+.*$/, "")
    .trim();
}

function collectionSlug(name) {
  return slugSegment(name.replace(/^_+/, "")) || "tokens";
}

// Numbers whose token name suggests a pixel dimension should get $type "dimension"
// (Style Dictionary's "web" transform group only appends "px" to that type — this
// list exists because that exact mismatch produced unitless CSS in an earlier manual
// run of this pipeline: `--radius-full: 9999;` instead of `9999px`).
const DIMENSION_HINTS = /size|radius|width|height|spacing|gap|padding|margin|indent|offset|thickness|blur|font-size|line-height|paragraph-spacing/i;

// Matched against the full raw Figma variable name (e.g. "border-radius/full"),
// not just the last path segment — the hint word is often in an earlier segment.
function inferType(figmaType, rawName) {
  if (figmaType === "COLOR") return "color";
  if (figmaType === "STRING") return /font-family/i.test(rawName) ? "fontFamily" : "string";
  if (figmaType === "BOOLEAN") return "boolean";
  // FLOAT
  if (/font-weight/i.test(rawName)) return "number";
  return DIMENSION_HINTS.test(rawName) ? "dimension" : "number";
}

function modeFileName(modeName, index) {
  if (index === 0) return "tokens.json";
  const slug = /dark/i.test(modeName) ? "dark" : slugSegment(modeName).toLowerCase().replace(/\s+/g, "-");
  return `tokens.${slug}.json`;
}

// ---------- 3. build id -> path map (needed to turn aliases into DTCG references) ----------

const idToPath = new Map();
for (const col of allCollections) {
  const colPath = [collectionSlug(col.name)];
  for (const v of col.variables) {
    const segs = v.name.split("/").map(slugSegment).filter(Boolean);
    idToPath.set(v.id, [...colPath, ...segs]);
  }
}

function setPath(root, path, leaf) {
  let node = root;
  for (let i = 0; i < path.length - 1; i++) {
    node[path[i]] = node[path[i]] || {};
    node = node[path[i]];
  }
  node[path[path.length - 1]] = leaf;
}

// ---------- 4. build the DTCG tree(s), one per mode-file ----------

/** @type {Map<string, {tree: object, tokens: Map<string,{path:string[], value:any, type:string, figmaId:string}>}>} */
const files = new Map();

for (const col of allCollections) {
  const colPath = [collectionSlug(col.name)];
  col.modes.forEach((modeName, modeIndex) => {
    const fileName = modeFileName(modeName, modeIndex);
    if (!files.has(fileName)) files.set(fileName, { tree: {}, tokens: new Map() });
    const { tree, tokens } = files.get(fileName);

    for (const v of col.variables) {
      const segs = v.name.split("/").map(slugSegment).filter(Boolean);
      const path = [...colPath, ...segs];
      const raw = v.valuesByMode[modeName];
      const type = inferType(v.type, v.name);

      let value;
      if (raw && typeof raw === "object" && "$alias" in raw) {
        const targetPath = idToPath.get(raw.$alias);
        value = targetPath ? `{${targetPath.join(".")}}` : "MISSING_REFERENCE";
      } else {
        value = raw;
      }

      const token = {
        $value: value,
        $type: type,
        $extensions: {
          "com.figma.variableId": v.id,
          "com.figma.variableName": v.name,
          "com.figma.collection": col.name,
        },
      };
      setPath(tree, path, token);
      tokens.set(v.id, { path, value, type });
    }
  });
}

// ---------- 5. diff against existing files ----------

function flattenExisting(obj, path = [], out = new Map()) {
  if (!obj || typeof obj !== "object") return out;
  if ("$value" in obj) {
    const figmaId = obj.$extensions?.["com.figma.variableId"];
    out.set(figmaId ?? `path:${path.join(".")}`, { path, value: obj.$value, hasId: !!figmaId });
    return out;
  }
  for (const [k, v] of Object.entries(obj)) flattenExisting(v, [...path, k], out);
  return out;
}

const report = [];

for (const [fileName, { tree, tokens }] of files) {
  const filePath = resolve(repoRoot, fileName);
  const existing = existsSync(filePath) ? JSON.parse(readFileSync(filePath, "utf-8")) : {};
  const oldMap = flattenExisting(existing);

  const added = [];
  const changed = [];
  const renamed = [];
  const unchanged = [];

  for (const [id, { path, value }] of tokens) {
    const old = oldMap.get(id);
    if (!old) {
      added.push(path.join("."));
    } else if (old.path.join(".") !== path.join(".")) {
      renamed.push(`${old.path.join(".")} -> ${path.join(".")}`);
      oldMap.delete(id);
    } else if (JSON.stringify(old.value) !== JSON.stringify(value)) {
      changed.push(`${path.join(".")}: ${JSON.stringify(old.value)} -> ${JSON.stringify(value)}`);
      oldMap.delete(id);
    } else {
      unchanged.push(path.join("."));
      oldMap.delete(id);
    }
  }

  // whatever's left in oldMap was not matched by id this round
  const removed = [];
  const untrackedNoLongerMatched = [];
  for (const [, { path, hasId }] of oldMap) {
    (hasId ? removed : untrackedNoLongerMatched).push(path.join("."));
  }

  report.push({ fileName, added, changed, renamed, removed, untrackedNoLongerMatched, unchangedCount: unchanged.length, totalNew: tokens.size });

  if (apply) {
    writeFileSync(filePath, JSON.stringify(tree, null, 2) + "\n");
  }
}

// ---------- 6. print report ----------

for (const r of report) {
  console.log(`\n=== ${r.fileName} ===`);
  console.log(`total tokens: ${r.totalNew}  (unchanged: ${r.unchangedCount})`);
  if (r.added.length) console.log(`+ added (${r.added.length}):\n  ${r.added.join("\n  ")}`);
  if (r.changed.length) console.log(`~ changed (${r.changed.length}):\n  ${r.changed.join("\n  ")}`);
  if (r.renamed.length) console.log(`* renamed (${r.renamed.length}):\n  ${r.renamed.join("\n  ")}`);
  if (r.removed.length) console.log(`- removed (${r.removed.length}), was tracked by Figma id:\n  ${r.removed.join("\n  ")}`);
  if (r.untrackedNoLongerMatched.length)
    console.log(
      `? no longer matched, but had NO Figma id on file (likely from an older manual tokens.json — first sync after adopting this skill will show a batch of these; that's expected, not a real removal):\n  ${r.untrackedNoLongerMatched.join("\n  ")}`
    );
}

if (!apply) {
  console.log("\n(dry run — no files written; re-run with --apply after the user confirms this diff)");
}
