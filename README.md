# @manthan/icons

126 hand-drawn 24×24 stroke icons for the [Manthan UI](https://github.com/tech-manthan/manthan-base) design system.

Each icon is stored once, as framework-agnostic data (`IconNode`). Every Manthan binding renders that same data:

| Stack | Usage |
| --- | --- |
| React | `<Icon icon={Check} />` from `@manthan/react` |
| Vue | `<Icon :icon="Check" />` from `@manthan/vue` |
| Svelte | `<Icon icon={Check} />` from `@manthan/svelte` |
| Angular | `<mn-icon [icon]="Check" />` from `@manthan/angular` |
| Vanilla / Web Components / htmx | `createIcon(Check)` or `toSvg(Check)` |
| Plain HTML / CSS | `@manthan/icons/svg/check.svg` or the sprite: `<svg><use href="sprite.svg#check"/></svg>` |

```ts
import { Check, ArrowRight, toSvg, createIcon } from '@manthan/icons';

toSvg(Check, { size: 16, class: 'text-accent-11' }); // SSR / innerHTML string
document.body.append(createIcon(ArrowRight, { title: 'Next' })); // live SVG element

// Dynamic lookup (not tree-shakeable)
import { icons } from '@manthan/icons/all';
icons['arrow-right'];
```

Unlabelled icons get `aria-hidden="true"`. Pass `title` to give an icon an accessible name.

## Options

| Option | Default | |
| --- | --- | --- |
| `size` | `24` | width & height |
| `strokeWidth` | `2` | |
| `absoluteStrokeWidth` | `false` | keep the visual stroke constant at any size |
| `color` | `currentColor` | |
| `class`, `title`, `attrs` | | |

## Adding an icon

1. Draw on a 24×24 grid: `fill="none"`, 2px round strokes, keep 1–2px padding.
2. Save it as `icons/<kebab-name>.svg`. Only `path`, `circle`, `rect`, `line`, `polyline`, `polygon` and `ellipse` are read.
3. Run `npm run build` (then `npm run preview` for a contact sheet in `dist/preview.html`).

Custom icons in your app: `defineIcon('rocket', [['path', { d: '…' }]])`.

## Scripts

`npm run build` · `npm test` · `npm run typecheck` · `npm run preview`

Some glyphs follow the conventional geometry popularised by Feather Icons (MIT).

## License

MIT
