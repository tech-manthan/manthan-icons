import type { IconNode, IconOptions } from './types';

export type { IconElement, IconElementTag, IconNode, IconOptions } from './types';
export * from './generated/icons';
export { defineIcon } from './define';

/** Default attributes shared by every Manthan icon. */
export const defaultAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
} as const;

/** Resolve the attributes for the root `<svg>`; used by every framework binding. */
export function getSvgAttributes(options: IconOptions = {}): Record<string, string | number> {
  const size = options.size ?? 24;
  const strokeWidth = options.strokeWidth ?? 2;
  const attrs: Record<string, string | number> = {
    ...defaultAttributes,
    width: size,
    height: size,
    stroke: options.color ?? 'currentColor',
    'stroke-width': options.absoluteStrokeWidth
      ? (Number(strokeWidth) * 24) / Number.parseFloat(String(size))
      : strokeWidth,
  };
  if (options.class) attrs.class = options.class;
  if (options.title) attrs.role = 'img';
  else attrs['aria-hidden'] = 'true';
  return { ...attrs, ...options.attrs };
}

const escape = (value: string | number) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Render an icon to an SVG string (SSR, templates, `innerHTML`). */
export function toSvg(icon: IconNode, options: IconOptions = {}): string {
  const attrs = Object.entries(getSvgAttributes(options))
    .map(([key, value]) => `${key}="${escape(value)}"`)
    .join(' ');
  const title = options.title ? `<title>${escape(options.title)}</title>` : '';
  const children = icon
    .map(([tag, a]) => `<${tag} ${Object.entries(a).map(([k, v]) => `${k}="${escape(v)}"`).join(' ')}/>`)
    .join('');
  return `<svg ${attrs}>${title}${children}</svg>`;
}

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Create a live `SVGSVGElement` (vanilla JS, Web Components, jQuery, htmx...). */
export function createIcon(icon: IconNode, options: IconOptions = {}, doc: Document = document): SVGSVGElement {
  const svg = doc.createElementNS(SVG_NS, 'svg');
  for (const [key, value] of Object.entries(getSvgAttributes(options))) svg.setAttribute(key, String(value));
  if (options.title) {
    const title = doc.createElementNS(SVG_NS, 'title');
    title.textContent = options.title;
    svg.append(title);
  }
  for (const [tag, attrs] of icon) {
    const child = doc.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attrs)) child.setAttribute(key, value);
    svg.append(child);
  }
  return svg;
}
