// Default dark-mode Style Dictionary config, created by the tokens-sync skill
// only when tokens.dark.json exists (i.e. the Figma collection had a second
// mode). Only color tokens are re-emitted here, under [data-theme="dark"] —
// spacing/radius/typography don't vary by theme, so re-writing them into a
// second file would just be dead weight.
export default {
  source: ["tokens.json", "tokens.dark.json"],
  usesDtcg: true,
  platforms: {
    css: {
      transformGroup: "web",
      buildPath: "src/styles/",
      files: [
        {
          destination: "tokens.dark.css",
          format: "css/variables",
          filter: (token) => token.path[0] === "color",
          options: { selector: '[data-theme="dark"]' },
        },
      ],
    },
  },
};
