# Scopeveil: Base Batches 004 product-answer draft

Status: concept-stage application material. Product copy below is based on the approved plan; it is not evidence of traction or completed payment functionality. Actual application field mapping is tracked separately after inspecting the form.

## One sentence
We’re building private project payments on Base so software agencies can confirm funding before starting work, manage funded scope changes, and pay subcontractors without publishing individual rates.

## Problem
A software engagement is one commercial agreement, but its money moves through disconnected steps: the client promises a budget, the agency delivers, and contractors wait for their share. Scope changes create ambiguity over what was approved and funded. Public stablecoin payments can also expose individual rates and commercial relationships.

## Product
Scopeveil connects reserved client funding, milestone approval and private subcontractor allocations in one workflow. Both sides agree on scope, review windows and dispute rules before funding. Approval applies to an exact submission version. Accepted contractor allocations cannot be silently reduced. Extra scope becomes active only after mutual approval and additional verified funding.

For an illustrative 6,000-USDC software engagement, a client reserves the project amount, the agency delivers the first milestone, and approval releases the accepted shares to the agency, developer and designer. Each party receives the information and receipt relevant to them, not everyone else’s rate sheet.

## Initial customer and distribution
The initial customer is a software agency already receiving and paying USDC. The agency introduces its existing client and contractors into a funded engagement rather than asking us to build a marketplace. Our first validation goal is three agency interviews and one genuine pilot commitment. These are goals, not completed traction.

## Why now and why Base
We want to make stablecoins useful in the recurring business workflow around a project, not just at the moment of transfer. Base is the intended default settlement network. Inco’s current cToken documentation supports Base and Base Sepolia, creating a timely path to investigate confidential payments. We still need to prove the custom escrow interactions; integration support is not the same as a safe escrow product.

## Differentiation
Payment approvals, batch payouts and private payroll already exist. Our hypothesis is that software agencies need them connected to reserved client funding, immutable accepted contractor allocations, version-bound milestone approval and funded scope changes. We are not claiming that this combination is unique across the entire market, or that its demand is validated.

## Current progress
We have a locally implemented launch site, an approved privacy-boundary design and an isolated Solidity/Inco experiment with passing local tests. No customer funds have been accepted. Confidential contract-held reservation and release are not yet proven. Prior work such as CipherBid can demonstrate implementation ability only alongside verified repository/demo links; it must not be presented as Scopeveil adoption or Scopeveil’s live workflow.

## Business model hypothesis
Charge agencies for agreement coordination, privacy controls and reconciliation rather than competing on plain transfer cost. Validate subscription and per-engagement pricing with pilot customers before publishing pricing. No proprietary token or yield product.

## Program milestones
Prove the confidential-escrow path on Base Sepolia. Deliver one complete engagement with two milestones, committed private allocations, dispute handling and funded changes. Obtain one pilot commitment. Measure setup time, payment costs, reconciliation work and willingness to pay. Customer-funds testing remains gated by review and a legal/custody assessment.

## Risks and how we address them
The hardest dependency is cryptographic interoperability: proof of adequate reservation and exact release from a contract without exposing private allocations. We will test that before building payment execution. Practical privacy also depends on public metadata, deposits/withdrawals, recipient access and provider trust. We will describe those limits, not promise anonymity. Dispute and cancellation rules must be enforceable and understood before funds move.

## Founder-only information required before submission
Legal founder names, current full-time commitment, cofounders, incorporation, location, funding history, cap table, verified traction, factual founder-market-fit examples, public portfolio links and video URL must come from the founder’s records. Do not infer answers from a GitHub identity, prior concept proposals or this document. The final application cannot be submitted honestly without those facts.

## Sources
https://www.base.org/batches
https://blog.base.org/introducing-base-batches-004
https://www.base.org/batches/apply
https://docs.inco.org/ctoken/overview
https://www.request.finance/
https://www.toku.com/resources/how-toku-runs-fully-private-stablecoin-payroll-on-aleo-and-usad
