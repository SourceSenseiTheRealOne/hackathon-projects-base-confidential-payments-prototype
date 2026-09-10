# Pactrail: approved design

## Approval and scope
The user fully approved the application-first approach on 2026-09-10. Working brand Pactrail is provisional, not trademark-cleared. Three delivery tracks are intentionally separate: launch/application, confidential-escrow proof, and the full product. No financial transaction or public application submission is authorized by this spec.

## Product
Base-first private project payments for software agencies and subcontractors. Client reserves USDC against a versioned agreement before work starts. Agency submits a milestone; client approves the exact submission and accepted allocation version. Released value reaches agency and committed contractors. Extra scope needs both parties' approval plus verified additional funding.

## Launch track acceptance
A real Next.js landing page with black canvas, regular-weight oversized sans typography, violet primary CTA, sparse amber annotation. Original procedural payment-particle narrative, not Dala's brain or logo. No stock photography: user's explicit procedural-art brief overrides generic image guidance. Mobile single-column layout; reduced-motion static representation; semantic headings, keyboard controls and visible focus. No fabricated social proof. Hero: Start funded. Pay privately. Body: Reserve project funds, approve milestones, and pay contractors without publishing individual rates.
Sections: hero; labelled 6,000-USDC example; funding/submission/approval/payout narrative; participant privacy explorer; funded changes; security and product status; pilot interest builder. Primary CTA label Join the pilot, secondary How it works. CTA opens a local brief builder, not a fake successful submission. No collection endpoint until owner contact/provider is configured. Allow download of a user-written pilot brief; state explicitly that it has not been sent. No PII storage or analytics. A /product page describes the product and the disabled payments gate rather than a fake dashboard. /privacy explains the boundary and site data practices.

## Full product architecture
One repository with feature-oriented Next.js frontend and typed server boundary, Go application/domain/adapters, PostgreSQL (project-local Supabase), Clerk identity, wallet-bound payment authority, encrypted object storage, Solidity/Foundry, viem/wagmi and a provider-specific privacy adapter. No independent microfrontends. No application server private signing keys. Pin stable versions from official registry metadata during creation. Launch track uses no database, identity provider or Go service because it handles no persisted product state.

## Authorization and privacy
Client: own total, funding status, scope, submitted deliverables, client receipts; not individual contractor allocations. Agency: its agreement and accepted allocations. Contractor: own allocation, assigned work and own receipts, not others' pay or agency margin. Reviewer: only disputed evidence and amounts required by the accepted resolution policy. This is intended product behavior, subject to cryptographic proof, not current functionality.
Public metadata can include addresses, timing, interaction patterns, wrapper deposits/withdrawals and fees. Confidential amounts do not imply anonymity. Access cannot erase previously decrypted information. Before any onchain write show actual visibility, network and irreversible effects. Documents use randomized salted commitments and authenticated client encryption; no raw invoices or guessable unsalted commitments onchain. Access control must apply server-side and cryptographically, not by hiding UI.

## Money state rules
Agreement version and allocation version are immutable after acceptance except by explicit reapproval. Funding is confirmed only after verified reservation sufficiency, not transaction success. Reserved funds cannot secure multiple obligations. No double release. Each payout must have a verified result before receipt issuance. Changed submissions invalidate approval. Disputes freeze only affected unpaid milestones. No automatic payout by silence; expiration escalates. Reviewer, review window, fallback deadline and permitted resolution are recorded before funding; no unrestricted admin seizure. Cancellation refunds only unearned/unallocated balances. Partial payout must remain pending/recoverable, never reported as complete. No yield, lending, token launch or cross-chain scope.

## Privacy proof acceptance gate
On Base Sepolia, prove authentic USDC wrapper resolution, confidential contract-held reservation, authorized sufficiency verification, contract-driven recipient release and refund. Prove insufficient-funds handling, unauthorized caller rejection, double-reservation prevention, replay rejection, recipient confidentiality and exact public exposure. Verify actual received value without leaking contractor amount to client. Record contract source, version, deployment addresses, transaction receipts and reproducible tests. Compare fixed cToken wrapper integration against custom Inco Lightning contracts; do not treat them as equivalent. If unsupported, leave funding disabled and document the failed assumption.

## Production gate
Independent contract review, key/recovery design, custody/payment-services legal assessment for target jurisdictions, privacy threat-model review, incident and dispute operations, monitored pilot limits, and separate explicit customer-funds approval. No production-readiness assertion from testnet or local tests.

## Application evidence
Official Base Batches deadline 2026-09-10 23:59 America/Los_Angeles, equivalent 2026-09-11 07:59 Europe/Lisbon. $100K investment offer subject to diligence. Concept stage. CipherBid only as verifiable past-work evidence. No claimed pilot, users, revenue or escrow proof. Written answers/video prepared offline; founder facts and submission require human confirmation.
