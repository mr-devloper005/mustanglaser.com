import { slot4BrandConfig } from '@/editable/theme/brand.config'

const brandName = slot4BrandConfig.siteName

export const pagesContent = {
  home: {
    metadata: {
      title: `${brandName} custom laser-cut work`,
      description: 'Browse custom laser-cut signage, dimensional pieces, and maker profiles through a visual-first showroom.',
      openGraphTitle: `${brandName} custom laser-cut work`,
      openGraphDescription: 'A visual-first showroom for custom laser-cut signage, project inspiration, and fabrication profiles.',
      keywords: ['laser cut signs', 'metal fabrication gallery', 'custom signage', 'maker profiles'],
    },
    hero: {
      badge: 'Laser-cut showcase',
      title: ['Built signs, cut metal,', 'and makers worth bookmarking.'],
      description: 'Explore finished pieces, dimensional letterforms, and profile pages in a showroom designed to feel more like a modern fabrication wall than a generic feed.',
      primaryCta: { label: 'Browse gallery', href: '/image' },
      secondaryCta: { label: 'Meet the makers', href: '/profile' },
      searchPlaceholder: 'Search materials, finishes, projects, or makers',
      focusLabel: 'Featured now',
      featureCardBadge: 'recent build',
      featureCardTitle: 'Project photography leads the story before the spec sheet ever needs to.',
      featureCardDescription: 'The home experience should help visitors scan visuals, understand the fabrication lane quickly, and move into a project conversation when ready.',
    },
    intro: {
      badge: 'What this site is for',
      title: 'A warm, industrial showroom for custom fabrication and visual proof.',
      paragraphs: [
        'This site exists to help visitors judge the work quickly: materials, finish, scale, and style should all read within seconds.',
        'The strongest experiences here are image-led project browsing and profile pages that make individual makers or shops feel credible without overclaiming.',
        'Every path should feel direct: scan the gallery, open a profile, then reach out when a style or capability fits the job.',
      ],
      sideBadge: 'Designed around',
      sidePoints: [
        'Visual-first browsing for finished signs, panels, and cut details.',
        'Profile pages that surface makers, studios, and capabilities clearly.',
        'A warmer industrial palette inspired by heat, steel, and paper plans.',
        'Public-facing copy that stays practical and believable.',
      ],
      primaryLink: { label: 'See the image gallery', href: '/image' },
      secondaryLink: { label: 'Browse profiles', href: '/profile' },
    },
    cta: {
      badge: 'Ready when you are',
      title: 'Have a fabrication idea, storefront update, or branded install in mind?',
      description: 'Use the gallery to narrow the visual direction, then get in touch with the project details that matter most.',
      primaryCta: { label: 'Start a project', href: '/contact' },
      secondaryCta: { label: 'Browse more work', href: '/image' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Fresh additions from this lane.',
    },
  },
  about: {
    badge: 'Studio Direction',
    title: 'A sharper way to present fabrication work online.',
    description: `${brandName} is positioned like a modern laser-cut showroom: visual proof first, clear profiles second, and low-friction contact paths throughout.`,
    paragraphs: [
      'Instead of burying finished work inside generic cards and noisy page chrome, the interface gives project imagery and material detail room to do the convincing.',
      'Profile pages are treated like capability snapshots, helping visitors understand who made the work and what kind of jobs they may be right for.',
    ],
    values: [
      {
        title: 'Visual proof over filler',
        description: 'Pages are built to let project images, finishes, and scale carry the first impression.',
      },
      {
        title: 'Credible maker presence',
        description: 'Profiles focus on clarity, contact paths, and practical trust cues instead of inflated claims.',
      },
      {
        title: 'Warm industrial character',
        description: 'The visual system blends fabrication grit with considered typography and calmer spacing.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${brandName}`,
    title: 'Bring the job, the site conditions, and the visual direction.',
    description: 'Share the sign type, finish, size, location, or reference images you already have. The goal is to make the first inquiry feel useful, not generic.',
    formTitle: 'Project inquiry',
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search fabrication projects, visual references, categories, and maker profiles.',
    },
    hero: {
      badge: 'Search the showroom',
      title: 'Find projects, finishes, and makers without digging.',
      description: 'Search across gallery posts and profile pages to narrow by material, category, or capability.',
      placeholder: 'Search by project type, material, finish, or maker',
    },
    resultsTitle: 'Recent gallery and profile results',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit a new post for the site.',
    },
    locked: {
      badge: 'Member workspace',
      title: 'Sign in to submit new work or profile updates.',
      description: 'Member access keeps the publishing flow focused on approved gallery entries and maker pages.',
    },
    hero: {
      badge: 'Submission workspace',
      title: 'Add a new project, image set, or maker profile.',
      description: 'Choose the active content lane, add the essentials, and save a clean entry with visuals, notes, and contact context.',
    },
    formTitle: 'Submission details',
    submitLabel: 'Save submission',
    successTitle: 'Submission saved successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member login',
      title: 'Return to the project publishing workspace.',
      description: 'Sign in to manage gallery entries, profile updates, and internal submissions.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched those details. Create one first, then sign in.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Create access',
      title: 'Open an account for submissions and profile updates.',
      description: 'Create a member account to access the publishing workspace and save new entries for the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Project details',
    },
    profile: {
      relatedTitle: 'Related profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit website',
    },
  },
} as const
