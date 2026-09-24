# Portfolio presentation verification

Verified on 2026-09-24. This change updates the project's name and documentation; it does not implement additional payment functionality.

## Website

- Public URL: https://base-confidential-payments-prototype.vercel.app
- Legacy URL retained: https://scopeveil.vercel.app
- Vercel project: `base-confidential-payments-prototype`.
- Deployment: `dpl_61sC5ghRneLEDf895z6dUFbGz6UN`.
- Immutable deployment URL: https://base-confidential-payments-prototype-6h7ocauep.vercel.app
- Upload contained 21 website source/configuration files; contracts, docs, context, tests, environment files, and caches were excluded.
- Upload-source SHA-256: `3315284b49c6510127ad81d8265f2297cfb35e6b41b00db7554f5bdd1dabda5e`.
- Hash construction: sort uploaded relative paths lexically, then feed each UTF-8 path, a NUL byte, and its raw file bytes into SHA-256.

The new hostname initially existed only as an alias and redirected signed-out visitors to Vercel authentication. Adding it as a verified production project domain resolved the issue without disabling project-wide protection. Both hostnames then returned HTTP 200 and the renamed application title in a signed-out Chromium session.

The desktop README preview was captured from the public site at 1440 x 1000 with reduced motion on 2026-09-24. The browser matrix also refreshed desktop/mobile hero and full-page screenshots. These show the concept website, not payment execution.

## Executed checks

| Command | Observed result |
| --- | --- |
| `pnpm install --frozen-lockfile` | Completed without lockfile changes |
| `pnpm test` | 12 passed |
| `pnpm typecheck` | Passed |
| `pnpm build` | Passed |
| `pnpm test:e2e` | 18 passed against the local production build |
| `E2E_BASE_URL=https://base-confidential-payments-prototype.vercel.app pnpm test:e2e --max-failures=2` | 18 passed against the public site |
| `pnpm audit --prod` | No known production dependency vulnerabilities reported |
| `npm test` in `contracts/` | 14 passed; no failures or skips |
| `git diff --check` | Passed |

The rename expectations first failed against the old title and download name, then passed after the naming changes. The contract implementation is unchanged. The private-key environment variable remains only a presence diagnostic; no signing, funding, or deployment transaction was performed.

## Publication review scope

Gitleaks 8.30.1 scanned all existing Git refs before the edits: one commit, no findings. A separate inventory covered all 70 historical file blobs and checked sensitive paths and disclosure candidates. Application drafts contain no completed founder-information fields or customer records. Generated runtime directories, Vercel account linking, and credentials remain ignored.

These checks are a bounded publication review, not a guarantee that the application is secure or suitable for customer funds. Dated review hashes and Lighthouse reports refer to their original revisions. Hosted CI is reported separately through GitHub Actions, not inferred from the local checks above.
