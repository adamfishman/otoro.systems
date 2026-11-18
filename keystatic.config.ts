import { config, collection, fields } from '@keystatic/core';

// Editing UI for posts and case studies. Run `npm run dev` and open http://localhost:4321/keystatic.
// Storage is `local` (edits write Markdown files in this repo; commit them as usual).
// Switching to `github` storage, for editing on the live site, needs a server
// deployment on Cloudflare plus a GitHub App. See CLAUDE.md.
export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: 'otoro.systems' } },
  collections: {
    posts: collection({
      label: 'Writing',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', description: 'One sentence, used for search results and link previews.', multiline: true, validation: { length: { min: 1 } } }),
        date: fields.date({ label: 'Date', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        draft: fields.checkbox({ label: 'Draft', description: 'Drafts only show in local dev.', defaultValue: false }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
    caseStudies: collection({
      label: 'Case studies',
      slugField: 'title',
      path: 'src/content/case-studies/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({ label: 'Summary', multiline: true, validation: { length: { min: 1 } } }),
        date: fields.date({ label: 'Date', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (p) => p.value }),
        featured: fields.checkbox({ label: 'Featured on homepage', defaultValue: false }),
        draft: fields.checkbox({ label: 'Draft', description: 'Drafts only show in local dev.', defaultValue: false }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
  },
});
