# Project: Tanya Digital

## Context
Персональний digital-design проєкт (портфоліо/навчальний), де Tanya опановує Git, HTML/CSS і поступово React + TypeScript. Зараз репозиторій перебуває на ранній стадії: є статична HTML-сторінка і перший React-компонент, але без налаштованого build-інструменту.

## Tech Stack
- HTML + Tailwind CSS (підключено через CDN у index.html, без build-кроку)
- React + TypeScript (розпочато у src/components/, але ще НЕ підключено до жодного бандлера)
- Немає package.json, tsconfig.json, vite.config чи tailwind.config — build-тулінг ще не налаштований
- Git + GitHub (origin: ux-te-ka/Tanya-Digital)

## File Structure
```
Tanya-Digital/
├── README.md
├── index.html                    # статична сторінка, Tailwind через CDN
└── src/
    └── components/
        └── Button.tsx             # React+TS компонент (поки не використовується ніде)
```

## Code Conventions (помічено в Button.tsx)
- TypeScript-інтерфейси пропсів розширюють нативні HTML-атрибути (`ButtonHTMLAttributes<HTMLButtonElement>`)
- Варіанти стилів через union-тип (`"primary" | "secondary" | "ghost"`) + `Record<Variant, string>` мапу
- Default export для кожного компонента
- Tailwind-класи збираються в рядок і мерджаться через `.filter(Boolean).join(" ")` (без сторонніх бібліотек типу clsx)
- `{...props}` прокидається на нативний елемент

## What to do
- Перш ніж додавати нові компоненти — підключити Vite (`npm create vite@latest` з шаблоном react-ts), бо зараз Button.tsx технічно не запускається
- Продовжувати патерн "інтерфейс пропсів + variant-мапа" з Button.tsx для нових компонентів
- Писати стилі через Tailwind-класи прямо в JSX/HTML, без окремих CSS-файлів
- Типізувати всі пропси явно
- Тримати коміти маленькими й сфокусованими (як у поточній історії — один feature на PR)

## What NOT to do
- Не додавай окремі CSS-файли поряд з Tailwind
- Не використовуй `any` — існуючий код типізований явно
- Не залишай React-компоненти "підвішеними" без імпорту в реальну сторінку
- Не змішуй статичний index.html з React-компонентами, поки немає build-інструменту — зараз це два непов'язані підходи
