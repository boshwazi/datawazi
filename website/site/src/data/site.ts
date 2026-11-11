// Site-wide settings. Change these before going live.
export const site = {
  name: 'datawazi',
  url: 'https://datawazi.com',
  email: 'hello@datawazi.com', // set up via Cloudflare Email Routing or Google Workspace
  // Paste a Cal.com / Calendly / Google booking link here. While empty, "book a fit check" opens an email.
  bookingUrl: 'https://cal.com/datawazi/fit-check',
  location: 'Malaysia',
  instagram: 'https://www.instagram.com/datawazi',
  title: 'datawazi | Data & AI solutions consultancy, Malaysia',
  description:
    'datawazi is a Malaysian data & AI consultancy. We design, build and run data platforms, dashboards, automation and AI. Book a free 30-min fit check.',
  status: 'taking new projects',
  year: 2026,
};

export const bookingHref =
  site.bookingUrl || `mailto:${site.email}?subject=${encodeURIComponent('Fit check')}`;
