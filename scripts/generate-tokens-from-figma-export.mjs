// Одноразовий генератор tokens.json / tokens.dark.json з даних, експортованих
// з Figma Variables файлу "Test design system" (g3Ibcx1ZyRuIenXrmCq65P)
// через use_figma (figma.variables.getLocalVariableCollectionsAsync/getLocalVariablesAsync).
//
// Запуск: node scripts/generate-tokens-from-figma-export.mjs

import { writeFileSync } from "node:fs";

const PRIMITIVES = {
  "color/white/base-#FFFFFF": "#ffffff",
  "color/white/alpha-30-#FFFFFF(30%)": "#ffffff4d",
  "color/white/alpha-60-#FFFFFF(60%)": "#ffffff99",
  "color/white/alpha-75-#FFFFFF(75%)": "#ffffffbf",
  "color/black/base-#121212": "#101114",
  "color/black/alpha-30-#121212(30%)": "#0000004d",
  "color/black/alpha-60-#121212(60%)": "#00000099",
  "color/black/alpha-75-#121212(75%)": "#000000bf",
  "color/neutral/50-#FCFCFD": "#fcfcfd",
  "color/neutral/100-#F2F4F7": "#f2f4f7",
  "color/neutral/200-#E4E7EC": "#e4e7ec",
  "color/neutral/300-#D0D5DD": "#d0d5dd",
  "color/neutral/400-#ABB1BA": "#8b939f",
  "color/neutral/500-#7A7F89": "#6e7581",
  "color/neutral/600-#40444D": "#40444d",
  "color/neutral/800-#1D1F23": "#1d1f23",
  "color/primary/50-#ECF4FC": "#ecf4fc",
  "color/primary/100-#D8E9F9": "#d8e9f9",
  "color/primary/200-#86C3F9": "#86c3f9",
  "color/primary/300-#4B96E7": "#4b96e7",
  "color/primary/400-#0354A6": "#0354a6",
  "color/primary/500-#064280": "#064280",
  "color/danger/50-#FEF3F2": "#fef3f2",
  "color/danger/100-#FDE1E1": "#fde1e1",
  "color/danger/200-#FCA5A5": "#fca5a5",
  "color/danger/400-#BB251A": "#bb251a",
  "color/danger/500-#831A12": "#831a12",
  "color/info/50-#F1F7FD": "#eef8fb",
  "color/info/100-#DCEDFC": "#daf0f6",
  "color/info/200-#84CAFF": "#7dd1e8",
  "color/info/400-#1465B4": "#0e7b9b",
  "color/info/500-#0C3D6C": "#0a5a70",
  "color/success/50-#EFFFF8": "#effff8",
  "color/success/100-#D6F3E9": "#d8f3e7",
  "color/success/200-#79D7AC": "#79d7ac",
  "color/success/400-#039855": "#03834a",
  "color/success/500-#045130": "#045130",
  "color/warning/50-#FFF9F4": "#fff9f4",
  "color/warning/100-#FCF0DB": "#fcecd9",
  "color/warning/200-#FFC78F": "#ffc78f",
  "color/warning/400-#DC6803": "#b45803",
  "color/warning/500-#7F3004": "#7e3e07",
  "color/misc/state/hover/primary-light": "#0354a60d",
  "color/misc/state/hover/gray-light": "#1d1f230d",
  "color/misc/state/hover/white-light": "#ffffff0d",
  "color/misc/state/hover/danger-light": "#bb251a0d",
  "color/neutral/700-#282B31": "#282b31",
  "color/primary/600-#012242": "#012242",
  "color/danger/600-#4B0F0A": "#4b0f0a",
  "color/danger/300-#ED7D75": "#ed7d75",
  "color/info/600-#0A335A": "#093f4e",
  "color/info/300-#53A1EB": "#2e9ab8",
  "color/success/600-#012E19": "#012e19",
  "color/success/300-#35AD77": "#35ad77",
  "color/warning/600-#421F01": "#421f01",
  "color/warning/300-#E7954F": "#e7954f",
  "color/misc/state/hover/primary-dark": "#5eaeff14",
  "color/misc/state/hover/gray-dark": "#fcfcfd14",
  "color/misc/state/hover/white-dark": "#ffffff14",
  "color/misc/state/hover/danger-dark": "#ed7d7514",
  "color/neutral/900-#17181C": "#17181a",
  "color/danger/700-#250705": "#250705",
  "color/primary/700-#011121": "#011121",
  "color/info/700-#061E36": "#05252e",
  "color/success/700-#011E11": "#011e11",
  "color/warning/700-#2C1501": "#2c1501",
  "color/misc/state/selected/gray-light": "#17181c29",
  "color/misc/state/selected/gray-dark": "#fcfcfd29",
  "color/misc/state/disabled/gray-light": "#17181c0a",
  "color/misc/state/disabled/gray-dark": "#fcfcfd0f",
  "font-weight/Semibold - 600": 600,
  "font-family/heading": "Nunito Sans",
  "font-weight/Bold - 700": 700,
  "font-weight/Regular - 400": 400,
  "font-weight/Medium - 500": 500,
  "font-family/body": "Inter",
  "dimension/null": 0,
  "dimension/28 - 1_75 rem": 28,
  "dimension/20 - 1_25 rem": 20,
  "dimension/24 - 1_5 rem": 24,
  "dimension/18 - 1_125 rem": 18,
  "dimension/32 - 2 rem": 32,
  "dimension/12 - 0_75 rem": 12,
  "dimension/64 - 4 rem": 64,
  "dimension/96 - 6 rem": 96,
  "dimension/full": 999,
  "dimension/80 - 5 rem": 80,
  "dimension/4 - 0_25 rem": 4,
  "dimension/8 - 0_5 rem": 8,
  "dimension/40 - 2_5 rem": 40,
  "dimension/56 - 3_5 rem": 56,
  "dimension/10 - 0_625 rem": 10,
  "dimension/36 - 2_25 rem": 36,
  "dimension/14 - 0_875 rem": 14,
  "dimension/16 - 1 rem": 16,
  "dimension/6 - 0_375 rem": 6,
  "dimension/44 - 2_75 rem": 44,
  "font-weight/Extrabold - 800": 800,
  "color/primary/250-#65ABF1": "#65abf1",
  "color/onSurface": "#f2f4f712",
  "color/black/absolute": "#000000",
};

// name -> { light, dark } (both already resolved to final hex)
const SEMANTIC = {
  "surface/base": { light: "#ffffff", dark: "#000000" },
  "surface/elavate/L1": { light: "#ffffff", dark: "#17181a" },
  "icon/neutral/subtle_200": { light: "#6e7581", dark: "#8b939f" },
  "icon/neutral/base": { light: "#1d1f23", dark: "#e4e7ec" },
  "text/neutral/base": { light: "#1d1f23", dark: "#fcfcfd" },
  "text/neutral/subtle_200": { light: "#6e7581", dark: "#8b939f" },
  "border/neutral/bold_100": { light: "#8b939f", dark: "#8b939f" },
  "border/neutral/subtle_100": { light: "#d0d5dd", dark: "#40444d" },
  "surface/elavate/L2": { light: "#ffffff", dark: "#1d1f23" },
  "text/primary/base": { light: "#0354a6", dark: "#4b96e7" },
  "text/primary/subtle_200": { light: "#86c3f9", dark: "#0354a6" },
  "border/primary/subtle_100": { light: "#4b96e7", dark: "#0354a6" },
  "border/primary/subtle_200": { light: "#86c3f9", dark: "#064280" },
  "background/primary/subtle_100": { light: "#86c3f9", dark: "#0354a6" },
  "icon/primary/base": { light: "#0354a6", dark: "#4b96e7" },
  "icon/primary/subtle_100": { light: "#4b96e7", dark: "#4b96e7" },
  "icon/primary/subtle_200": { light: "#86c3f9", dark: "#0354a6" },
  "misc/status/offline": { light: "#8b939f", dark: "#6e7581" },
  "border/white/base": { light: "#ffffff", dark: "#17181a" },
  "misc/status/online": { light: "#79d7ac", dark: "#03834a" },
  "background/danger/subtle_100": { light: "#fde1e1", dark: "#4b0f0a" },
  "background/danger/subtle_200": { light: "#fef3f2", dark: "#250705" },
  "text/danger/base": { light: "#bb251a", dark: "#ed7d75" },
  "text/danger/bold_100": { light: "#831a12", dark: "#fca5a5" },
  "background/info/subtle_100": { light: "#daf0f6", dark: "#093f4e" },
  "background/info/subtle_200": { light: "#eef8fb", dark: "#05252e" },
  "text/info/base": { light: "#0e7b9b", dark: "#2e9ab8" },
  "text/info/bold_100": { light: "#0a5a70", dark: "#7dd1e8" },
  "background/success/subtle_100": { light: "#d8f3e7", dark: "#012e19" },
  "background/success/subtle_200": { light: "#effff8", dark: "#011e11" },
  "text/success/base": { light: "#03834a", dark: "#35ad77" },
  "text/success/bold_100": { light: "#045130", dark: "#79d7ac" },
  "text/warning/base": { light: "#b45803", dark: "#e7954f" },
  "text/warning/bold_100": { light: "#7e3e07", dark: "#ffc78f" },
  "background/warning/subtle_100": { light: "#fcecd9", dark: "#421f01" },
  "background/warning/subtle_200": { light: "#fff9f4", dark: "#2c1501" },
  "background/neutral/subtle_300": { light: "#f2f4f7", dark: "#1d1f23" },
  "background/neutral/subtle_400": { light: "#fcfcfd", dark: "#1d1f23" },
  "text/neutral/subtle_100": { light: "#40444d", dark: "#e4e7ec" },
  "text/white/base": { light: "#ffffff", dark: "#101114" },
  "background/primary/bold_200": { light: "#0354a6", dark: "#4b96e7" },
  "background/primary/bold_300": { light: "#064280", dark: "#86c3f9" },
  "background/primary/subtle_300": { light: "#ecf4fc", dark: "#011121" },
  "background/primary/subtle_200": { light: "#d8e9f9", dark: "#012242" },
  "background/danger/bold_100": { light: "#bb251a", dark: "#ed7d75" },
  "background/danger/bold_200": { light: "#831a12", dark: "#fca5a5" },
  "background/neutral/bold_100": { light: "#6e7581", dark: "#d0d5dd" },
  "background/neutral/bold_200": { light: "#40444d", dark: "#e4e7ec" },
  "background/neutral/bold_300": { light: "#1d1f23", dark: "#f2f4f7" },
  "background/info/bold_100": { light: "#0e7b9b", dark: "#2e9ab8" },
  "background/info/bold_200": { light: "#0a5a70", dark: "#7dd1e8" },
  "border/primary/bold_100": { light: "#0354a6", dark: "#4b96e7" },
  "border/primary/bold_200": { light: "#064280", dark: "#86c3f9" },
  "border/danger/subtle_100": { light: "#fca5a5", dark: "#bb251a" },
  "border/danger/bold_100": { light: "#bb251a", dark: "#ed7d75" },
  "border/danger/bold_200": { light: "#831a12", dark: "#fca5a5" },
  "border/info/subtle_100": { light: "#7dd1e8", dark: "#0e7b9b" },
  "border/info/bold_100": { light: "#0e7b9b", dark: "#2e9ab8" },
  "border/info/bold_200": { light: "#0a5a70", dark: "#7dd1e8" },
  "border/success/subtle_100": { light: "#79d7ac", dark: "#03834a" },
  "border/success/bold_100": { light: "#03834a", dark: "#35ad77" },
  "border/success/bold_200": { light: "#045130", dark: "#79d7ac" },
  "border/warning/subtle_100": { light: "#ffc78f", dark: "#b45803" },
  "border/warning/bold_100": { light: "#b45803", dark: "#e7954f" },
  "border/warning/bold_200": { light: "#7e3e07", dark: "#ffc78f" },
  "border/neutral/bold_200": { light: "#6e7581", dark: "#8b939f" },
  "background/state-interaction/hover/primary": { light: "#0354a60d", dark: "#5eaeff14" },
  "background/state-interaction/hover/neutral": { light: "#1d1f230d", dark: "#fcfcfd14" },
  "background/state-interaction/hover/white": { light: "#ffffff0d", dark: "#ffffff14" },
  "background/state-interaction/hover/danger": { light: "#bb251a0d", dark: "#ed7d7514" },
  "background/state-interaction/selected/neutral": { light: "#17181c29", dark: "#fcfcfd29" },
  "icon/danger/subtle_100": { light: "#fca5a5", dark: "#bb251a" },
  "icon/danger/base": { light: "#bb251a", dark: "#ed7d75" },
  "icon/info/subtle_100": { light: "#7dd1e8", dark: "#0e7b9b" },
  "icon/info/base": { light: "#0e7b9b", dark: "#2e9ab8" },
  "icon/success/subtle_100": { light: "#79d7ac", dark: "#03834a" },
  "icon/success/base": { light: "#03834a", dark: "#35ad77" },
  "icon/warning/subtle_100": { light: "#ffc78f", dark: "#b45803" },
  "icon/warning/base": { light: "#b45803", dark: "#e7954f" },
  "icon/white/base": { light: "#ffffff", dark: "#101114" },
  "text/neutral/subtle_500": { light: "#fcfcfd", dark: "#1d1f23" },
  "icon/neutral/subtle_500": { light: "#fcfcfd", dark: "#1d1f23" },
  "fixed/white/base": { light: "#ffffff", dark: "#ffffff" },
  "border/neutral/subtle_200": { light: "#e4e7ec", dark: "#282b31" },
  "background/neutral/subtle_100": { light: "#d0d5dd", dark: "#6e7581" },
  "background/primary/bold_100": { light: "#4b96e7", dark: "#4b96e7" },
  "icon/danger/bold_100": { light: "#831a12", dark: "#fca5a5" },
  "icon/info/bold_100": { light: "#0a5a70", dark: "#7dd1e8" },
  "icon/success/bold_100": { light: "#045130", dark: "#79d7ac" },
  "background/success/bold_100": { light: "#03834a", dark: "#35ad77" },
  "icon/warning/bold_100": { light: "#7e3e07", dark: "#ffc78f" },
  "background/warning/bold_100": { light: "#b45803", dark: "#e7954f" },
  "background/neutral/subtle_200": { light: "#e4e7ec", dark: "#40444d" },
  "icon/neutral/subtle_100": { light: "#40444d", dark: "#e4e7ec" },
  "border/neutral/bold_300": { light: "#40444d", dark: "#e4e7ec" },
  "background/white/base": { light: "#ffffff", dark: "#101114" },
  "icon/primary/bold_100": { light: "#064280", dark: "#86c3f9" },
  "background/state-interaction/disabled/neutral": { light: "#17181c0a", dark: "#fcfcfd0f" },
  "text/neutral/subtle_300": { light: "#8b939f", dark: "#6e7581" },
  "text/primary/bold_100": { light: "#064280", dark: "#4b96e7" },
  "border/neutral/bold_400": { light: "#1d1f23", dark: "#f2f4f7" },
  "icon/neutral/subtle_300": { light: "#8b939f", dark: "#6e7581" },
  "border/warning/subtle_300": { light: "#fff9f4", dark: "#421f01" },
  "border/info/subtle_200": { light: "#daf0f6", dark: "#0a5a70" },
  "border/info/subtle_300": { light: "#eef8fb", dark: "#093f4e" },
  "border/neutral/subtle_300": { light: "#f2f4f7", dark: "#282b31" },
  "border/danger/subtle_200": { light: "#fde1e1", dark: "#bb251a" },
  "border/danger/subtle_300": { light: "#fef3f2", dark: "#831a12" },
  "border/warning/subtle_200": { light: "#fcecd9", dark: "#7e3e07" },
  "border/success/subtle_300": { light: "#effff8", dark: "#012e19" },
  "border/success/subtle_200": { light: "#d8f3e7", dark: "#045130" },
  "icon/info/subtle_200": { light: "#daf0f6", dark: "#0a5a70" },
  "background/black/base": { light: "#101114", dark: "#fcfcfd" },
  "background/overlay/light/60": { light: "#ffffff99", dark: "#00000099" },
  "background/overlay/light/75": { light: "#ffffffbf", dark: "#000000bf" },
  "background/overlay/dark/60": { light: "#00000099", dark: "#00000099" },
  "background/overlay/dark/75": { light: "#000000bf", dark: "#000000bf" },
  "border/neutral/subtle_400": { light: "#fcfcfd", dark: "#1d1f23" },
  "background/neutral/bold_400": { light: "#17181a", dark: "#f2f4f7" },
  "border/primary/subtle_300": { light: "#d8e9f9", dark: "#012242" },
  "surface/bold_100": { light: "#fcfcfd", dark: "#17181a" },
  "surface/bold_200": { light: "#f2f4f7", dark: "#1d1f23" },
  "surface/bold_300": { light: "#e4e7ec", dark: "#282b31" },
  "background/success/bold_200": { light: "#045130", dark: "#79d7ac" },
  "background/warning/bold_200": { light: "#7e3e07", dark: "#ffc78f" },
  "text/primary/subtle_100": { light: "#4b96e7", dark: "#0354a6" },
  "text/primary/bold_200": { light: "#012242", dark: "#86c3f9" },
  "fixed/primary/100": { light: "#d8e9f9", dark: "#d8e9f9" },
  "fixed/primary/200": { light: "#86c3f9", dark: "#86c3f9" },
  "fixed/primary/300": { light: "#4b96e7", dark: "#4b96e7" },
  "fixed/primary/400": { light: "#0354a6", dark: "#0354a6" },
  "fixed/primary/500": { light: "#064280", dark: "#064280" },
  "fixed/primary/600": { light: "#012242", dark: "#012242" },
  "fixed/danger/100": { light: "#fde1e1", dark: "#fde1e1" },
  "fixed/danger/200": { light: "#fca5a5", dark: "#fca5a5" },
  "fixed/danger/300": { light: "#ed7d75", dark: "#ed7d75" },
  "fixed/danger/400": { light: "#bb251a", dark: "#bb251a" },
  "fixed/danger/500": { light: "#831a12", dark: "#831a12" },
  "fixed/danger/600": { light: "#4b0f0a", dark: "#4b0f0a" },
  "fixed/info/100": { light: "#daf0f6", dark: "#daf0f6" },
  "fixed/info/200": { light: "#7dd1e8", dark: "#7dd1e8" },
  "fixed/info/300": { light: "#2e9ab8", dark: "#2e9ab8" },
  "fixed/info/400": { light: "#0e7b9b", dark: "#0e7b9b" },
  "fixed/info/500": { light: "#0a5a70", dark: "#0a5a70" },
  "fixed/info/600": { light: "#093f4e", dark: "#093f4e" },
  "fixed/success/100": { light: "#d8f3e7", dark: "#d8f3e7" },
  "fixed/success/200": { light: "#79d7ac", dark: "#79d7ac" },
  "fixed/success/300": { light: "#35ad77", dark: "#35ad77" },
  "fixed/success/400": { light: "#03834a", dark: "#03834a" },
  "fixed/success/500": { light: "#045130", dark: "#045130" },
  "fixed/success/600": { light: "#012e19", dark: "#012e19" },
  "fixed/warning/100": { light: "#fcecd9", dark: "#fcecd9" },
  "fixed/warning/200": { light: "#ffc78f", dark: "#ffc78f" },
  "fixed/warning/300": { light: "#e7954f", dark: "#e7954f" },
  "fixed/warning/400": { light: "#b45803", dark: "#b45803" },
  "fixed/warning/500": { light: "#7e3e07", dark: "#7e3e07" },
  "fixed/warning/600": { light: "#421f01", dark: "#421f01" },
  "fixed/neutral/50": { light: "#fcfcfd", dark: "#fcfcfd" },
  "fixed/neutral/100": { light: "#f2f4f7", dark: "#f2f4f7" },
  "fixed/neutral/200": { light: "#e4e7ec", dark: "#e4e7ec" },
  "fixed/neutral/300": { light: "#d0d5dd", dark: "#d0d5dd" },
  "fixed/neutral/500": { light: "#6e7581", dark: "#6e7581" },
  "fixed/neutral/600": { light: "#40444d", dark: "#40444d" },
  "fixed/neutral/800": { light: "#1d1f23", dark: "#1d1f23" },
  "fixed/neutral/900": { light: "#17181a", dark: "#17181a" },
  "fixed/black/base": { light: "#101114", dark: "#101114" },
  "fixed/primary/700": { light: "#011121", dark: "#011121" },
  "fixed/primary/50": { light: "#ecf4fc", dark: "#ecf4fc" },
  "fixed/danger/50": { light: "#fef3f2", dark: "#fef3f2" },
  "fixed/danger/700": { light: "#250705", dark: "#250705" },
  "fixed/info/50": { light: "#eef8fb", dark: "#eef8fb" },
  "fixed/info/700": { light: "#05252e", dark: "#05252e" },
  "fixed/success/50": { light: "#effff8", dark: "#effff8" },
  "fixed/success/700": { light: "#011e11", dark: "#011e11" },
  "fixed/warning/50": { light: "#fff9f4", dark: "#fff9f4" },
  "fixed/warning/700": { light: "#2c1501", dark: "#2c1501" },
  "surface/onSurface/base": { light: "#ffffff", dark: "#f2f4f712" },
  "surface/onSurface/bold_100": { light: "#fcfcfd", dark: "#f2f4f712" },
  "surface/onSurface/bold_200": { light: "#f2f4f7", dark: "#f2f4f712" },
  "fixed/primary/250": { light: "#65abf1", dark: "#65abf1" },
  "fixed/neutral/400": { light: "#8b939f", dark: "#8b939f" },
  "fixed/white/alpha-30": { light: "#ffffff4d", dark: "#ffffff4d" },
  "fixed/white/alpha-60": { light: "#ffffff99", dark: "#ffffff99" },
  "fixed/white/alpha-75": { light: "#ffffffbf", dark: "#ffffffbf" },
  "fixed/black/alpha-30": { light: "#0000004d", dark: "#0000004d" },
  "fixed/black/alpha-60": { light: "#00000099", dark: "#00000099" },
  "fixed/black/alpha-75": { light: "#000000bf", dark: "#00000099" },
};

const SHAPE = {
  "border-radius/full": { type: "FLOAT", value: 9999 },
  "border-radius/2xl": { type: "FLOAT", value: 24 },
  "border-radius/xl": { type: "FLOAT", value: 16 },
  "border-radius/md": { type: "FLOAT", value: 8 },
  "border-radius/sm": { type: "FLOAT", value: 6 },
  "border-radius/3xl": { type: "FLOAT", value: 32 },
  "border-radius/xs": { type: "FLOAT", value: 4 },
  "border-radius/none": { type: "FLOAT", value: 0 },
  "border-radius/lg": { type: "FLOAT", value: 12 },
  "border-width/thin": { type: "FLOAT", value: 1 },
  "border-width/none": { type: "FLOAT", value: 0 },
  "border-width/medium": { type: "FLOAT", value: 2 },
  "border-width/thick": { type: "FLOAT", value: 4 },
};

const TYPOGRAPHY = {
  "heading/H2/line-height": { type: "FLOAT", value: 40 },
  "body/xxs/paragaph-spacing": { type: "FLOAT", value: 8 },
  "body/xxs/letter-spacing": { type: "FLOAT", value: 0.02 },
  "body/xxs/font-family": { type: "STRING", value: "Inter" },
  "body/xxs/line-height": { type: "FLOAT", value: 14 },
  "body/xxs/font-size": { type: "FLOAT", value: 10 },
  "body/xs/font-family": { type: "STRING", value: "Inter" },
  "body/xs/font-weight": { type: "FLOAT", value: 400 },
  "body/xs/line-height": { type: "FLOAT", value: 18 },
  "body/xs/font-size": { type: "FLOAT", value: 12 },
  "body/xs/paragaph-spacing": { type: "FLOAT", value: 12 },
  "heading/H3/letter-spacing": { type: "FLOAT", value: -0.02 },
  "body/sm/paragaph-spacing": { type: "FLOAT", value: 16 },
  "body/xs/letter-spacing": { type: "FLOAT", value: 0.01 },
  "heading/H5/font-size": { type: "FLOAT", value: 20 },
  "body/sm/font-family": { type: "STRING", value: "Inter" },
  "heading/H1/letter-spacing": { type: "FLOAT", value: -0.02 },
  "heading/H4/line-height": { type: "FLOAT", value: 32 },
  "body/md/paragaph-spacing": { type: "FLOAT", value: 20 },
  "body/md/font-weight": { type: "FLOAT", value: 400 },
  "body/md/line-height": { type: "FLOAT", value: 24 },
  "body/md/font-size": { type: "FLOAT", value: 16 },
  "body/lg/paragaph-spacing": { type: "FLOAT", value: 24 },
  "heading/H2/font-size": { type: "FLOAT", value: 32 },
  "body/sm/font-weight": { type: "FLOAT", value: 400 },
  "body/lg/letter-spacing": { type: "FLOAT", value: 0 },
  "body/lg/font-family": { type: "STRING", value: "Inter" },
  "body/lg/font-size": { type: "FLOAT", value: 18 },
  "heading/H5/line-height": { type: "FLOAT", value: 28 },
  "heading/H5/paragaph-spacing": { type: "FLOAT", value: 16 },
  "heading/H5/font-family": { type: "STRING", value: "Nunito Sans" },
  "body/sm/font-size": { type: "FLOAT", value: 14 },
  "body/md/font-family": { type: "STRING", value: "Inter" },
  "heading/H2/paragaph-spacing": { type: "FLOAT", value: 28 },
  "heading/H4/font-weight": { type: "FLOAT", value: 600 },
  "heading/H1/font-weight": { type: "FLOAT", value: 800 },
  "heading/H4/paragaph-spacing": { type: "FLOAT", value: 20 },
  "heading/H4/letter-spacing": { type: "FLOAT", value: 0 },
  "heading/H2/letter-spacing": { type: "FLOAT", value: -0.02 },
  "heading/H5/font-weight": { type: "FLOAT", value: 600 },
  "heading/H4/font-family": { type: "STRING", value: "Nunito Sans" },
  "heading/H4/font-size": { type: "FLOAT", value: 24 },
  "body/sm/line-height": { type: "FLOAT", value: 16 },
  "heading/H3/font-family": { type: "STRING", value: "Nunito Sans" },
  "heading/H1/font-family": { type: "STRING", value: "Nunito Sans" },
  "heading/H3/font-weight": { type: "FLOAT", value: 700 },
  "heading/H2/font-family": { type: "STRING", value: "Nunito Sans" },
  "heading/H1/paragaph-spacing": { type: "FLOAT", value: 32 },
  "heading/H1/line-height": { type: "FLOAT", value: 44 },
  "heading/H3/font-size": { type: "FLOAT", value: 28 },
  "body/md/letter-spacing": { type: "FLOAT", value: 0 },
  "body/lg/line-height": { type: "FLOAT", value: 28 },
  "body/xxs/font-weight": { type: "FLOAT", value: 400 },
  "heading/H5/letter-spacing": { type: "FLOAT", value: 0 },
  "heading/H3/paragaph-spacing": { type: "FLOAT", value: 24 },
  "body/lg/font-weight": { type: "FLOAT", value: 400 },
  "heading/H1/font-size": { type: "FLOAT", value: 36 },
  "heading/H3/line-height": { type: "FLOAT", value: 36 },
  "heading/H2/font-weight": { type: "FLOAT", value: 700 },
  "body/sm/letter-spacing": { type: "FLOAT", value: 0 },
};

// ---- transform helpers ----

function setPath(obj, pathParts, tokenValue) {
  let node = obj;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const key = pathParts[i];
    node[key] = node[key] || {};
    node = node[key];
  }
  node[pathParts[pathParts.length - 1]] = tokenValue;
}

function slugSegment(seg) {
  return seg
    .replace(/-#[0-9A-Fa-f]+(\(\d+%\))?$/, "") // strip "-#FFFFFF" / "-#FFFFFF(30%)" hex-label suffixes
    .replace(/\s+-\s+.*$/, "") // strip " - 600" / " - 0_25 rem" description suffixes (requires actual spaces around the dash, so "alpha-30" is left intact)
    .trim();
}

// --- primitives -> tokens/primitive.json ---
const primitiveTokens = {};
for (const [rawName, value] of Object.entries(PRIMITIVES)) {
  const parts = rawName.split("/").map(slugSegment);
  // font-weight is a bare number (no unit); dimension/* is a px scale (needs the "px" suffix
  // Style Dictionary's css transform group only appends to $type: "dimension"); everything
  // else numeric here is font-weight (handled above) or otherwise treated as dimension too.
  const type =
    parts[0] === "font-weight"
      ? "number"
      : typeof value === "number"
        ? "dimension"
        : /^#/.test(value)
          ? "color"
          : "string";
  // font-weight/font-family live at top-level in Figma; nest under font.*
  const path =
    parts[0] === "font-weight"
      ? ["font", "weight", parts[1].toLowerCase()]
      : parts[0] === "font-family"
        ? ["font", "family", parts[1]]
        : parts[0] === "dimension"
          ? ["dimension", parts[1] === "null" ? "0" : parts[1]]
          : parts;
  setPath(primitiveTokens, path, { $value: value, $type: type });
}

// --- semantic colors (light) -> tokens/color.json ---
const semanticLightTokens = {};
const semanticDarkTokens = {};
for (const [rawName, { light, dark }] of Object.entries(SEMANTIC)) {
  const parts = rawName.split("/");
  setPath(semanticLightTokens, parts, { $value: light, $type: "color" });
  setPath(semanticDarkTokens, parts, { $value: dark, $type: "color" });
}

// --- shape -> radius / borderWidth ---
const shapeTokens = {};
for (const [rawName, { value }] of Object.entries(SHAPE)) {
  const [group, key] = rawName.split("/");
  const outGroup = group === "border-radius" ? "radius" : "borderWidth";
  setPath(shapeTokens, [outGroup, key], { $value: value, $type: "dimension" });
}

// --- typography -> typography/{heading,body}/{scale}/{property} ---
const typographyTokens = {};
for (const [rawName, { type, value }] of Object.entries(TYPOGRAPHY)) {
  const [group, scale, propRaw] = rawName.split("/");
  const prop = propRaw
    .replace("paragaph-spacing", "paragraphSpacing")
    .replace("letter-spacing", "letterSpacing")
    .replace("line-height", "lineHeight")
    .replace("font-family", "fontFamily")
    .replace("font-weight", "fontWeight")
    .replace("font-size", "fontSize");
  const $type =
    type === "STRING"
      ? "string"
      : prop === "fontSize" || prop === "lineHeight" || prop === "paragraphSpacing"
        ? "dimension" // px scale — needs the unit
        : "number"; // fontWeight (unitless) and letterSpacing (see note below)
  const token = { $value: value, $type };
  if (prop === "letterSpacing") {
    // Figma's Variables API returns a bare float with no unit metadata. Values here
    // (~ -0.02 to 0.02) read as fractional PERCENT (e.g. 0.02 = 2% tracking), not px —
    // 0.02px would be imperceptible. Left unitless; convert to em/% when consuming in CSS.
    token.$description = "Ймовірно % (частка), не px — перевір перед використанням у CSS";
  }
  setPath(typographyTokens, ["typography", group, scale, prop], token);
}

const tokens = {
  primitive: primitiveTokens,
  color: semanticLightTokens,
  ...shapeTokens,
  ...typographyTokens,
};

const tokensDark = {
  color: semanticDarkTokens,
};

writeFileSync(new URL("../tokens.json", import.meta.url), JSON.stringify(tokens, null, 2) + "\n");
writeFileSync(new URL("../tokens.dark.json", import.meta.url), JSON.stringify(tokensDark, null, 2) + "\n");

console.log("Written tokens.json + tokens.dark.json");
console.log(
  `primitive: ${Object.keys(PRIMITIVES).length}, color(light+dark pairs): ${Object.keys(SEMANTIC).length}, shape: ${Object.keys(SHAPE).length}, typography: ${Object.keys(TYPOGRAPHY).length}`
);
