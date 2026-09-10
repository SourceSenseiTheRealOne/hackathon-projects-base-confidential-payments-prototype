# Initial public landing deployment (historical)

Latest verified deployment and results: [delivery.md](delivery.md).

Brand: Scopeveil. Internal project slug/path: pactrail.

Public URL: https://scopeveil.vercel.app
Immutable deployment URL: https://scopeveil-iwe0va11h-sourcesenseis-projects.vercel.app
Deployment ID: dpl_662rdq3jySB27V26JrtXz8GWowN8
Inspector: https://vercel.com/sourcesenseis-projects/scopeveil/662rdq3jySB27V26JrtXz8GWowN8

Vercel remote build completed with routes /, /product, /privacy and /icon.svg. The exact public alias was read back through fresh unauthenticated browser contexts; all 16 desktop/mobile Playwright tests passed against E2E_BASE_URL=https://scopeveil.vercel.app. Tests cover routes/assets/errors, responsive geometry, keyboard/reduced motion, axe AA checks, no-JS form safety and local-only brief download.

Deployment dry run enumerated exactly 20 source/config files. Contracts, internal docs/context, tests, caches, env files and node_modules were excluded. Vercel link created a local OIDC environment file; it was excluded and then deleted as unused. No wallet or application secrets were uploaded.

This deploys a concept-stage marketing site, not payment execution, a customer-funds pilot or the full product.

Hardened local Docker image: sha256:a105f5f6262fbd96f7643b696f0e13bf84ee8a46077ef2bc2112b7b30ddafa75. Healthy at http://127.0.0.1:4182. Initial image scan found 2 Critical and 11 High vulnerabilities. Runtime SSL libraries were upgraded to 3.5.8-r0 and unused npm/yarn removed; final Docker Scout scan with --only-severity critical,high --exit-code returned zero findings and exit 0. This does not assert absence of all vulnerabilities or replace Vercel infrastructure assurance.
