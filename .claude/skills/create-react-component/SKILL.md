---
name: create-react-component
description: Use when the user asks to create a new React component in src/components/, following the existing Button.tsx pattern (typed props extending native HTML attributes, variant map, Tailwind styling, default export).
---

# Skill: Create React Component

When user asks to create a new component (e.g. "створи компонент Badge", "new component Card with variants outline/filled"):

## Steps
1. Уточни ім'я компонента (PascalCase) і список варіантів (variants), якщо користувач їх не назвав
2. Прочитай CLAUDE.md, щоб підтвердити актуальні конвенції проєкту
3. Відкрий src/components/Button.tsx як референс структури
4. Згенеруй src/components/[Name].tsx за структурою:
   - інтерфейс пропсів, що розширює відповідний `*HTMLAttributes<HTML*Element>`
   - union-тип варіантів (`export type [Name]Variant = "..." | "..."`)
   - `baseStyles` — спільні Tailwind-класи
   - `variantStyles: Record<[Name]Variant, string>` — класи для кожного варіанту
   - default export функціонального компонента, що мерджить класи через `.filter(Boolean).join(" ")` і прокидає `{...props}`
5. Створи файл у src/components/[Name].tsx

## Output format
Показати повний вміст нового файла у code block ПЕРЕД збереженням, дочекатись підтвердження, потім зберегти і дати одне речення summary.

## Conventions to follow
- TypeScript-інтерфейси розширюють нативні HTML-атрибути
- Union-тип для варіантів + Record-мапа стилів
- Default export на компонент
- Tailwind-класи прямо в коді, без окремих CSS-файлів
- Явна типізація пропсів, без `any`

## Don't
- Не додавай сторонні бібліотеки для класів (clsx, cva тощо) — проєкт використовує filter+join вручну
- Не створюй окремий .css файл для компонента
- Не імпортуй компонент у index.html автоматично — build-тулінг ще не налаштований (див. CLAUDE.md)
- Не вигадуй варіанти сама, якщо користувач їх не назвав — уточни
