// Дарк-тема: ті самі семантичні color-токени, значення з tokens.dark.json
// (tokens.dark.json накладається поверх tokens.json — перевизначає лише color.*).
// Пишеться в окремий файл і обгортається в [data-theme="dark"], тож tokens.css
// лишається валідним джерелом light-значень за замовчуванням.
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
