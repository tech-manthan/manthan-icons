import * as generated from './generated/icons';
import type { IconNode } from './types';

const { iconNames, ...nodes } = generated;

/**
 * Every icon keyed by its kebab-case name. Not tree-shakeable: use it for
 * dynamic lookups (`icons[name]`), icon pickers and docs.
 */
export const icons: Record<generated.IconName, IconNode> = Object.fromEntries(
  Object.values(nodes).map((node) => [(node as IconNode).iconName!, node as IconNode]),
) as Record<generated.IconName, IconNode>;

export { iconNames };
export type { IconName } from './generated/icons';
