# Confidential escrow experiment

**Not production. Not deployed. No customer funds.**

One agreement, three committed encrypted allocations, client-approved release, aggregate eligibility, actual returned-amount accounting and coapproved pre-release confidential refund. Fourteen local Foundry tests use Inco operations with simulated execution and a test-only token double. They do not prove the deployed wrapper or public Base Sepolia flow.

## Run
```bash
npm ci --ignore-scripts
npm test
npm run preflight
```

Solidity 0.8.30, Foundry 1.7.1, @inco/lightning 1.0.2, viem 2.56.3. Dependencies are isolated from the landing page. scripts/forge.mjs preserves native exit status; the upstream npm wrapper failed this check on Windows.

Preflight reads only. Optional BASE_SEPOLIA_RPC_URL selects an endpoint but chain ID must be 84532. It resolves the USDC wrapper, beacon implementation and executor. SCOPEVEIL_TESTNET_PRIVATE_KEY is checked only for presence; no signing or transaction submission exists in this script.

## Boundaries
No full milestones/disputes/amendments, funding-attestation flow, ERC-1271 session policy, public withdrawals or recovery. Constructor-supplied token is for experimentation; production must pin the verified factory wrapper. Release-started does not mean paid. Refund mode does not mean settled. Verify returned encrypted results and actual recipient balance deltas.

Never deploy the test token. Test decryption helpers bypass ACL. Installed Inco code is BUSL-labelled; licence and upgrade/pause/blocklist trust need assessment. See ../docs/research/inco-feasibility.md.
