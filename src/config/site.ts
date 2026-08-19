/**
 * SITE CONFIG
 * -----------
 * Edit the values below to update your name, contact details and social
 * links across the whole site. Nothing else in the codebase needs to change.
 */
export const site = {
  name: 'Miguel V. Crespo',
  shortName: 'MC',
  role: {
    en: 'Videographer, Animator & Photographer',
    pt: 'Videógrafo, Animador & Fotógrafo',
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
  // The contact form submits straight to Formspree (free, no backend
  // needed — https://formspree.io). To wire up your own:
  //   1. Sign up free at formspree.io and create a new form.
  //   2. Copy the endpoint it gives you (looks like the URL below) and
  //      paste it in here.
  //   3. That's it — submissions land in your Formspree inbox/email.
  // Free tier is 50 submissions/month, plenty for a portfolio site.
  contactFormEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
} as const;
