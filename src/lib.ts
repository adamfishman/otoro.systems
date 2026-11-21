import { getCollection } from 'astro:content';

// Drafts are visible in `astro dev` but never in a production build.
const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;
const newestFirst = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf();

export const getPosts = async () => (await getCollection('posts', visible)).sort(newestFirst);
export const getCaseStudies = async () => (await getCollection('caseStudies', visible)).sort(newestFirst);

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
