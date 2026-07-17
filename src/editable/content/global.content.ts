import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline,
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Custom laser-cut signage and showcase work',
    primaryLinks: [
      { label: 'Gallery', href: '/image' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start a project', href: '/contact' },
      secondary: { label: 'Browse work', href: '/image' },
    },
  },
  footer: {
    tagline: 'Precision-cut work with a strong visual point of view',
    description: 'A visual-first destination for custom laser-cut pieces, fabrication profiles, and project inspiration.',
    columns: [
      {
        title: 'Browse',
        links: [
          { label: 'Image Gallery', href: '/image' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Studio',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Submit a brief', href: '/create' },
        ],
      },
    ],
    bottomNote: 'Built for browsing projects, materials, and makers with clarity.',
  },
  commonLabels: {
    readMore: 'View details',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
