# Bug Report

QA date: 2026-10-05

## Confirmed Bugs

### 1. Contact form reports success without delivering the message
- Severity: High
- File: `src/pages/Contact.jsx`
- Evidence: A valid submission waits 900 ms, displays “Message sent,” and makes no API request.
- Impact: Visitors can believe a message reached the portfolio owner when it was never sent.

### 2. Resume download API accepts malformed email addresses
- Severity: Medium
- File: `api/resume-download.js`
- Evidence: A POST with `not-an-email@` returned HTTP 200 and was accepted for logging. Validation only checks whether the address contains `@`.
- Impact: Invalid addresses can be stored as download records, making contact follow-up and log data unreliable.

### 3. Homepage emits a React DOM-property warning
- Severity: Low
- File: `src/pages/Home.jsx`
- Evidence: The browser console reports that React does not recognize the `fetchPriority` prop on an `img` element.
- Impact: Adds a runtime console warning and may prevent the image priority hint from being applied as intended.
