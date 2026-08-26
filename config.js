// Основний білд: primitives + typography + shape + semantic-кольори (Light — за замовчуванням).
// Кольори виводяться як CSS-змінні; Tailwind-preset посилається на ці змінні через var(...),
// тому перемикання теми (див. config.dark.js) не вимагає перебудови Tailwind-класів.
// Клас Tailwind (ключ) відрізняється від CSS-змінної (значення var(...)):
//   semantic color.text.primary.base -> клас "text-primary-base", змінна --color-text-primary-base
//   primitive.color.neutral.500      -> клас "color-neutral-500",  змінна --primitive-color-neutral-500
export default {
  source: ["tokens.json"],
  usesDtcg: true,
  hooks: {
    formats: {
      "tailwind/preset": ({ dictionary }) => {
        const colors = {};
        const radius = {};
        const borderWidth = {};

        dictionary.allTokens.forEach((token) => {
          // token.name is the already-transformed (kebab-cased) CSS custom-property
          // name Style Dictionary actually wrote to tokens.css — using token.path
          // directly here would drift out of sync wherever a Figma name has an
          // underscore or camelCase segment (e.g. "bold_200" -> name has "bold-200").
          const root = token.path[0];
          const cssVar = `var(--${token.name})`;

          if (root === "color") {
            colors[token.name.replace(/^color-/, "")] = cssVar;
          } else if (root === "primitive") {
            colors[token.name.replace(/^primitive-/, "")] = cssVar;
          } else if (root === "radius") {
            radius[token.name.replace(/^radius-/, "")] = cssVar;
          } else if (root === "borderWidth") {
            borderWidth[token.name.replace(/^border-width-/, "")] = cssVar;
          }
        });

        return `export default {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 2)},
      borderRadius: ${JSON.stringify(radius, null, 2)},
      borderWidth: ${JSON.stringify(borderWidth, null, 2)},
    },
  },
};
`;
      },
    },
  },
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
    tailwind: {
      transformGroup: "web",
      buildPath: "src/styles/",
      files: [
        {
          destination: "tailwind.tokens.js",
          format: "tailwind/preset",
        },
      ],
    },
  },
};
