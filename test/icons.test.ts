import { describe, expect, it } from 'vitest';
import { ArrowRight, Check, X, getSvgAttributes, iconNames, toSvg } from '../src/index';
import { icons } from '../src/all';

describe('@manthan/icons', () => {
  it('exports icon nodes with names', () => {
    expect(Check.iconName).toBe('check');
    expect(ArrowRight.iconName).toBe('arrow-right');
    expect(X[0]![0]).toBe('path');
  });

  it('maps every name in the lookup table', () => {
    expect(Object.keys(icons)).toEqual([...iconNames]);
    expect(iconNames.length).toBeGreaterThan(100);
  });

  it('renders to an svg string', () => {
    const svg = toSvg(Check, { size: 16, class: 'h-4' });
    expect(svg).toContain('width="16"');
    expect(svg).toContain('class="h-4"');
    expect(svg).toContain('aria-hidden="true"');
    expect(svg).toContain('<path d="M4.5 12.5l5 5L19.5 7"/>');
  });

  it('labels icons that have a title', () => {
    const svg = toSvg(Check, { title: 'Done <ok>' });
    expect(svg).toContain('role="img"');
    expect(svg).toContain('<title>Done &lt;ok></title>');
  });

  it('keeps stroke width absolute when asked', () => {
    expect(getSvgAttributes({ size: 48, absoluteStrokeWidth: true })['stroke-width']).toBe(1);
  });
});
