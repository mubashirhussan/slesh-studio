import {defineField, defineType} from 'sanity'
import {format, parseISO} from 'date-fns'

export default defineType({
  name: 'post',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      description: 'The posts that are related to this post',
      type: 'array',
      of: [{type: 'reference', to: {type: 'post'}}],
    }),
    // --- SEO Fields ---
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'The SEO meta title for this post',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'The SEO meta description for this post',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', type: 'string', title: 'Question'},
            {name: 'answer', type: 'text', title: 'Answer'},
          ],
          preview: {
            select: {title: 'question', subtitle: 'answer'},
          },
        },
      ],
      description: 'Frequently Asked Questions related to this post',
    }),
    // --- CTA Card ---
    defineField({
      name: 'ctaCard',
      title: 'CTA Card',
      type: 'object',
      fields: [
        {name: 'headline', title: 'Headline', type: 'string'},
        {name: 'description', title: 'Description', type: 'text'},
        {name: 'buttonText', title: 'Button Text', type: 'string'},
        {name: 'buttonUrl', title: 'Button URL', type: 'url'},
      ],
      description: 'Call-to-Action card for promoting services',
      preview: {
        select: {title: 'headline', subtitle: 'buttonText'},
      },
    }),
    // --- Other Schema Examples ---
    defineField({
      name: 'seoTags',
      title: 'SEO Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Custom SEO tags for this post',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'The canonical URL for this post',
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Open Graph Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Image used for social sharing (Open Graph)',
    }),
    defineField({
      name: 'twitterCardType',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          {title: 'Summary', value: 'summary'},
          {title: 'Summary with Large Image', value: 'summary_large_image'},
        ],
        layout: 'radio',
      },
      description: 'Type of Twitter card for social sharing',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare({title, media, date}) {
      const subtitle = date ? format(parseISO(date), 'yyyy/MM/dd') : 'unpublished'
      return {title, media, subtitle}
    },
  },
})
