# Bug Report

Scanned from the current codebase state on 2026-05-20.

Build status:
- `npm run build` passes successfully.

## Confirmed Bugs

### 1. Contact form is not actually connected to any backend
- File: `src/pages/Contact.jsx`
- Severity: High
- Details:
  The form submission is simulated with `setTimeout` and always shows success after 1.5 seconds.
  No network request, API call, Formspree integration, EmailJS integration, or backend submit exists.
- User impact:
  Visitors may believe their message was sent when nothing is actually delivered.

### 2. Contact page location card uses `href="#"` and can cause unwanted page jump
- File: `src/pages/Contact.jsx`
- Severity: Medium
- Details:
  The location contact card is rendered as an anchor with `href="#"`.
  Clicking it can jump the page to the top instead of behaving like a non-clickable info card.
- User impact:
  Confusing UX and accidental scroll reset.

### 3. Project content mismatch: “BMW Motorsport Site” contains healthcare platform data
- File: `src/data/portfolio.js`
- Severity: Medium
- Details:
  The project titled `BMW Motorsport Site` uses a description about patient records, appointment scheduling, prescriptions, billing, and HIPAA-style healthcare concerns.
  Its stats also reference patients and compliance rather than motorsport/web branding.
- User impact:
  Portfolio credibility issue because the project title and content do not match.

### 4. Project content mismatch: “E-Commerce Platform” contains logistics/mobile tracking data
- File: `src/data/portfolio.js`
- Severity: Medium
- Details:
  The project titled `E-Commerce Platform` is described as a React Native app with GPS tracking, driver assignments, and logistics behavior.
  This does not match the project title or expected commerce-focused functionality.
- User impact:
  Makes the portfolio look inconsistent or incorrect to recruiters/clients.

### 5. Contact details are duplicated in multiple places instead of coming from one source
- Files:
  - `src/data/portfolio.js`
  - `src/components/Footer.jsx`
- Severity: Low
- Details:
  Email, phone number, and GitHub URL are hardcoded in the footer while also existing in `personal`.
  This is a consistency bug risk because updating one place can leave the other outdated.
- User impact:
  Future content drift and inconsistent contact data across the site.

### 6. Some interactive cards still use broad transition patterns that can hurt smoothness on dense pages
- Files:
  - `src/pages/About.jsx`
  - `src/pages/Experience.jsx`
- Severity: Low
- Details:
  Several surfaces still combine motion wrappers, hover transforms, glass effects, and decorative layers.
  This is not a build error, but it remains a likely source of UI smoothness regressions on lower-end devices.
- User impact:
  Possible lag or less-smooth interaction on animation-heavy sections.

## Notes

- This report only lists issues identified from code scanning and build verification.
- It does not include speculative browser-only bugs that were not directly confirmable from the code.
