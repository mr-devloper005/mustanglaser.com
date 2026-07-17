import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const siteContent = {
  identity: {
    name: slot4BrandConfig.siteName,
    niche: 'custom laser-cut signage and branded fabrication',
    audience: slot4BrandConfig.voice.audience,
    tone: slot4BrandConfig.voice.tone,
  },
  brief: `${slot4BrandConfig.siteName} should feel like a modern fabrication studio: image-led, direct, and built to help visitors browse finished work, discover makers, and start a project conversation without the clutter of a generic content site.`,
} as const
