// Default Style Dictionary config, created by the tokens-sync skill because
// no config.js existed yet. Customize freely — tokens-sync reuses this file
// as-is on future syncs and never regenerates it once it exists.
//
// transformGroup "web" (not "css") is deliberate: Style Dictionary's "css"
// group emits `rem` for $type "dimension" tokens, while "web" emits `px` —
// which is what tokens produced by this pipeline's converter script expect.
export default {
  source: ["tokens.json"],
  usesDtcg: true,
  platforms: {
    css: {
      transformGroup: "web",
      buildPath: "src/styles/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
        },
      ],
    },
  },
};
