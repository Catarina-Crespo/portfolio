/**
 * SITE CONFIG
 * -----------
 * Edit the values below to update your name, contact details and social
 * links across the whole site. Nothing else in the codebase needs to change.
 */
export const site = {
  name: 'Miguel Crespo',
  shortName: 'MC',
  role: {
    en: 'Filmmaker & Photographer',
    pt: 'Videógrafo & Fotógrafo',
  },
  email: 'contact@miguelvcrespo.com',
  phone: '',
  location: {
    en: 'Lisbon, Portugal',
    pt: 'Lisboa, Portugal',
  },
  // Leave a handle empty ('') to hide it from the footer / contact page.
  socials: {
    instagram: '',
    youtube: 'https://www.youtube.com/@mccstudios',
    vimeo: '',
    linkedin: 'https://www.linkedin.com/in/miguelvcrespo',
    behance: '',
  },
} as const;
