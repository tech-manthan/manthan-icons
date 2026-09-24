export type IconElementTag = 'path' | 'circle' | 'rect' | 'line' | 'polyline' | 'polygon' | 'ellipse';

/** One SVG child element: `[tag, attributes]`. */
export type IconElement = readonly [tag: IconElementTag | (string & {}), attrs: Readonly<Record<string, string>>];

/**
 * Framework-agnostic icon data: the children of a 24×24 SVG.
 * Every framework binding (`<Icon icon={Check} />`) renders this.
 */
export type IconNode = readonly IconElement[] & { readonly iconName?: string };

export interface IconOptions {
  /** Width and height. Numbers are px. @default 24 */
  size?: number | string;
  /** @default 2 */
  strokeWidth?: number | string;
  /** Keep stroke width constant regardless of size. @default false */
  absoluteStrokeWidth?: boolean;
  /** @default 'currentColor' */
  color?: string;
  class?: string;
  /** Accessible label. When omitted the icon is `aria-hidden`. */
  title?: string;
  /** Extra attributes set on the `<svg>`. */
  attrs?: Record<string, string | number>;
}
