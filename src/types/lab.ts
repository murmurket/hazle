/**
 * Canonical shape of a Lab post card.
 * - date: ISO string (YYYY-MM-DD or full ISO). Render using <time> for formatting.
 * - tags: Free-form text. Normalization (lowercasing/trim) recommended.
 * - firstTag: Derived from tags[0] (undefined if no tags).
 */
export type LabPost = {
  title: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  slug: string;
  draft?: boolean;
  hiddenFromList?: boolean;
  cover?: string;
  firstTag?: string;
};