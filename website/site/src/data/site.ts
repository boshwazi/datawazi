// Site-wide settings. Change these before going live.
export const site = {
  name: 'datawazi',
  url: 'https://datawazi.com',
  email: 'hello@datawazi.com', // set up via Cloudflare Email Routing or Google Workspace
  // Paste a Cal.com / Calendly / Google booking link here. While empty, "book a fit check" opens an email.
  bookingUrl: '',
  location: 'Malaysia',
  title: 'datawazi | Data & AI solutions, Malaysia',
  description:
    'We design, build and run the data and AI systems that help organisations work smarter. Data platforms, pipelines, dashboards, automation and AI.',
  status: 'taking new projects',
  year: 2026,
};

export const bookingHref =
  site.bookingUrl || `mailto:${site.email}?subject=${encodeURIComponent('Fit check')}`;
