# Scopeveil

Private project payments on Base for software agencies and contractors.

**Public concept site:** https://scopeveil.vercel.app

## What exists
A real Next.js launch site with participant visibility explainer, local-only pilot brief download, product/privacy pages, responsive procedural art and automated browser checks. An isolated Solidity/Inco experiment tests confidential splits and refunds locally. Neither is a production escrow product.

**No customer funds accepted. No onchain escrow deployed.** The full Go/Postgres/auth/storage/milestone product remains behind the actual Base Sepolia payment proof gate. Do not treat simulated contract tests as live execution.

## Run the site
Node 24, pnpm 12.3.4.
```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start
```
Native preview: http://127.0.0.1:4180. Docker preview: http://127.0.0.1:4182 after `docker compose up -d --build`.
The pilot brief is downloaded, not sent. No wallet, tracking or customer database is connected.

## Verify
```bash
pnpm test
pnpm typecheck
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
pnpm audit --prod
```
Browser tests own port 4181. `E2E_BASE_URL=https://scopeveil.vercel.app pnpm test:e2e` tests the public site without starting a local server. Stop a native preview before rebuilding its `.next` output; restart it after build.

Contracts have isolated dependencies:
```bash
cd contracts
npm ci --ignore-scripts
npm test
npm run preflight
```
Preflight performs only public Base Sepolia reads. Its output explicitly separates provider discovery from deployment/payment proof. See contracts/README.md for trust, licence and test-model limits.

## Application and evidence
- [Field-ready product answers](docs/application/field-ready-answers.md)
- [Founder video script](docs/application/video-script.md)
- [Submission checklist](docs/application/submission-checklist.md)
- [Approved design](docs/superpowers/specs/2026-09-10-pactrail-design.md)
- [Inco feasibility and proof limits](docs/research/inco-feasibility.md)
- [Public deployment evidence](docs/verification/deployment.md)
- [Local experiment review](docs/verification/contract-review.md)

Application NOT SUBMITTED. Requires factual founder details, genuine social links and a 1-5 minute founding-team video. Do not invent eligibility, funding history, runway or traction.

Scopeveil replaces provisional Pactrail because of existing name collisions. Internal local path/registry slug stays `pactrail`; no domain or trademark clearance is claimed. No Base or Inco endorsement is implied. Original procedural art adapts the supplied visual direction without copying Dala’s brand.
