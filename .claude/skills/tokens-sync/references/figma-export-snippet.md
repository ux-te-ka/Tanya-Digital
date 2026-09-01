# Figma Plugin API export snippet

Pass this **exact code** as the `code` argument to the `use_figma` tool (fill in
nothing — it's generic, works on any file's local Variables). Do not use
`get_variable_defs` for this — it only returns variables bound to one
specific node and mixes in legacy Color/Text Styles, which is not what a full
Variable export needs.

Load the `figma-use` skill first, as `use_figma` itself requires. Pass
`skillNames: "figma-use"` and the file's `fileKey` (extracted from the Figma
URL: the path segment right after `/design/`).

```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const allVars = await figma.variables.getLocalVariablesAsync();
const byId = Object.fromEntries(allVars.map((v) => [v.id, v]));

function formatDirect(val, type) {
  if (type === "COLOR" && val && typeof val === "object" && "r" in val) {
    const h = (n) => Math.round(n * 255).toString(16).padStart(2, "0");
    return `#${h(val.r)}${h(val.g)}${h(val.b)}${val.a !== undefined && val.a < 1 ? h(val.a) : ""}`;
  }
  return val;
}

// Keep direct ALIASes as aliases (don't resolve them) so the converter script
// can emit a proper DTCG `{group.token}` reference instead of a flattened value.
function formatValue(val, type) {
  if (val && typeof val === "object" && val.type === "VARIABLE_ALIAS") {
    return { $alias: val.id };
  }
  return formatDirect(val, type);
}

const result = collections.map((c) => ({
  name: c.name,
  modes: c.modes.map((m) => m.name),
  variables: allVars
    .filter((v) => v.variableCollectionId === c.id)
    .map((v) => ({
      id: v.id,
      name: v.name,
      type: v.resolvedType,
      valuesByMode: Object.fromEntries(
        c.modes.map((m) => [m.name, formatValue(v.valuesByMode[m.modeId], v.resolvedType)])
      ),
    })),
}));

return { collections: result };
```

**Large files:** if a collection has hundreds of variables, the result can
exceed the tool's output size limit. If that happens, split the export into
one `use_figma` call per collection (filter `collections` in the script above
to a single collection by name) instead of all at once — the converter
script accepts either a full `{ collections: [...] }` dump or a single
collection object and merges multiple JSON files if you save them
separately (see SKILL.md step 1).
