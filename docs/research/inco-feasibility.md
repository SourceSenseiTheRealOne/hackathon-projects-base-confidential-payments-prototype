# Inco feasibility and proof boundary

## Direction
Use a custom escrow holding the existing Base Sepolia cUSDC wrapper, not a new backed token. Its encrypted-handle transfer overload supports composition. This is interface feasibility, NOT a completed public-network escrow proof.

Read-only deployment evidence: ../verification/base-sepolia-preflight.json. The script pins factory resolution, underlying, beacon implementation and executor to one block. Revalidate at deployment because the wrapper is beacon-upgradeable.

Sources:
- https://docs.inco.org/ctoken/configuration
- https://docs.inco.org/ctoken/raw
- https://docs.inco.org/guide/operations
- https://docs.inco.org/guide/guide-access-control
- https://docs.inco.org/ctoken/sessions
- https://docs.inco.org/guide/verifying-attestations
- https://base-sepolia.blockscout.com/api/v2/smart-contracts/0x32B5E112474E609c885c50a46899B1e771B1A2D2

## Critical semantics
Transferred amount is encrypted. An initialized insufficient account can transfer zero despite a successful EVM transaction. Multiple calls in one transaction do not alone guarantee full payment. Aggregate eligibility, bounded arithmetic, per-agreement reservation and actual returned-amount accounting are required.

Retained updated handles need allowThis. IncoTest decryption helpers bypass ACL, so access checks are separate assertions. ERC-1271/voucher authorization must be implemented; cToken-scoped sessions cannot be assumed to cover every custom escrow handle.

## Local experiment
contracts/src/ConfidentialEscrowProbe.sol is a limited, Base-Sepolia-only, one-agreement experiment. It uses @inco/lightning 1.0.2 and a test-only token double modeling silent-zero transfers. Fourteen local Foundry tests pass for splits, insufficient aggregate funds, bounded arithmetic, roles, scope binding, immutable allocations, cancellation refund, replay/retry accounting, ACL and network/participant checks.

This is NOT deployed-wrapper bytecode parity, a production audit, authenticated product, or real custody proof. It lacks full milestones/disputes/amendments, funding attestations, production sessions/recovery and public unwrap. Release/cancellation semantics are intentionally narrow and require production-state-machine design.

## Gate: OPEN
Public preflight reports escrowDeployed=false, livePaymentProof=false, signerConfigured=false. No funded Base Sepolia signer is configured. No deployment, funding, signature or payout transaction was sent. Local impersonation or simulated funding cannot substitute for this proof.

Remaining: actual Circle test USDC held by the escrow; encrypted sufficiency; exact recipient balance deltas; atomic split behavior; refund; unauthorized decryption rejection; session expiry/recovery; upgrade/blocklist/pause behavior; public disclosure matrix. Independent review and licence/legal assessment precede customer funds.

## Toolchain findings
The upstream Windows npm Foundry wrapper printed failure but exited zero. scripts/forge.mjs invokes the native binary and propagates status; an invalid-command probe returned exit 2. An inline getFee read initially consumed vm.prank; evaluating the fee before prank corrected sender binding. No checks were weakened.

Installed Inco source is BUSL-labelled. Commercial-use terms and provider trust require assessment before production.
