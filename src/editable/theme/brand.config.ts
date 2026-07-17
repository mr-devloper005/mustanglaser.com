import { siteIdentity } from '@/config/site.identity'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)

export const slot4BrandConfig = {
  siteName: siteIdentity.name,
  tagline: 'Precision-cut metal signs, panels, and branded fixtures',
  domain: siteIdentity.domain,
  baseUrl: siteIdentity.url,
  productKind,
  ogImage: siteIdentity.ogImage,
  accents: {
    primary: '#9B0F06',
    secondary: '#D53E0F',
    surface: '#EED9B9',
    ink: '#5E0006',
  },
  voice: {
    audience: 'design-led shops, builders, fabricators, and local businesses',
    tone: 'confident, crafted, practical, image-forward',
  },
} as const
