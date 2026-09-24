# Initial delivery state (historical)

This records the original Scopeveil delivery. For the current project identity, setup, and live URL, see [the README](../../README.md). Historical hashes and deployment addresses below describe the original revision.

## Delivered
- Public concept landing: https://scopeveil.vercel.app
- Latest verified deployment: https://scopeveil-8g3i8gi1g-sourcesenseis-projects.vercel.app
- Deployment ID: dpl_BuTmbv3JuTnxyGJA94Suydjh7Sqx
- Native preview: http://127.0.0.1:4180
- Docker preview: http://127.0.0.1:4182
- Latest Docker image: sha256:6886f7592501014c2f4cd61e292a20bb56b63d5da4daedfae53ed01bd2918d27
- Root unit tests: 12 pass. Local and public browser matrices: 18 pass each. Typecheck and production builds pass.
- Local Solidity/Inco experiment: 14 tests pass, separately reviewed. No live transactions.
- Final source review: 30-file digest c895dd28d8994240fa7c70cf27e6d7a179fb0ddc2df32ed4192479d8e1fb4b32. Contract experiment: 8-file digest 58864071ca7a4a34444d401a10d01b5a2aa8b34cb24a247812782dbf2c3b548c. Independent reviews found no Critical/Important issues in their bounded scopes.
- Final Docker Scout scan: no High/Critical findings; command used --exit-code. Initial base-image issues were fixed, not waived.
- Exact Base application product answers, video guidance and submission checklist prepared.

## Performance evidence
Lighthouse is lab evidence, not field INP. Initial local measurement was 97 performance. The final public-site mobile simulation measured 82 performance, 100 accessibility, 100 best practices, 100 SEO, LCP 2.0s and CLS 0. Main-thread work remains an optimization opportunity. The canvas now has a tested 20-paints/second bound; do not claim that this improved the Lighthouse score. See lighthouse-public-final.json.

## Not delivered / blocked
- No operational full Go/Postgres/Clerk/storage/agreement product. It remains behind the actual confidential-escrow payment gate.
- No escrow deployment, funding or actual payout/refund/decryption proof. Public read-only Base Sepolia metadata verified; no funded signer configured. Circle’s public faucet presents reCAPTCHA, and native gas provisioning requires an eligible funding path. No challenge bypass or mainnet-wallet import attempted.
- No accelerator submission. Founder facts, legal acknowledgements, social links and a real 1-5 minute founding-team video are missing. Do not fabricate them.
- No customer pilot commitment or customer-funds approval.
- Intended Kanban board could not be created: supported CLI rejected mutation with the delegate-child context guard. No bypass attempted. Registry declaration is not a live board.

## Repository and CI
Private source repository: https://github.com/SourceSenseiTheRealOne/scopeveil
CI workflow: .github/workflows/verify.yml. It runs native Linux frontend and local contract checks without secrets. Check the actual Actions result before claiming hosted CI passed. Vercel deployment is separate and does not imply CI success.

Internal checkout/registry slug remains pactrail; public brand is Scopeveil. Unrelated coding-lab projects were not edited. The parent registry entry is local-only until a safe control-plane commit/onboarding slice; this child is independently backed up to its own remote when pushed.
