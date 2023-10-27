/**
 * Merge an item into an array of items.
 */
export const merge = <T>(terms: T[], newTerm: T) => [...terms, newTerm];