import type { IconElement, IconNode } from './types';

/** Attach a name to raw icon data. Use it to author your own icons in the same format. */
export function defineIcon(name: string, node: IconElement[]): IconNode {
  return Object.assign(node, { iconName: name });
}
