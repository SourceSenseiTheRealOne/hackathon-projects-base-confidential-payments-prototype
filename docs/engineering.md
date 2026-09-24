# Engineering notes

The website and contract experiment have separate dependencies and no runtime connection. Keeping that boundary explicit prevents the hosted concept from implying that payments work.

## Browser data flow

```text
Next.js pages
  ├─ PaymentField → Canvas 2D (decorative only)
  ├─ VisibilityExplorer → static role descriptions
  └─ PilotBrief → input validation → Blob → local text download

Foundry tests → ConfidentialEscrowProbe → test-only confidential token
Read-only preflight → Base Sepolia RPC → wrapper/provider metadata
```

### Page rendering and client components

The App Router renders the page structure. Interactivity stays in small client components: the canvas, role tabs, and brief form. The launch site has no mutable server state, so adding an API, database, identity provider, or global state store would not solve a current requirement.

The proposed full product would need those systems. Its design is recorded in the [original specification](superpowers/specs/2026-09-10-pactrail-design.md), not implemented here.

### A download instead of a fake submission

[`PilotBrief`](../components/PilotBrief.tsx) reads the form, calls [`buildPilotBrief`](../lib/pilot.ts), creates a text Blob, and triggers a download. It revokes the object URL afterward. It does not send the entered data to an endpoint or put it in local/session storage.

Submission is disabled until hydration, and `method="dialog"` prevents a native fallback submission. This matters because a form that is private after JavaScript loads can still leak fields through a navigation before hydration. Tests exercise the no-JavaScript state and watch request URLs and bodies for entered values.

Validation limits input lengths and rejects control characters. Agency and email fields cannot inject extra lines into the generated text. The challenge field allows ordinary line breaks. The result tells the user that nothing was sent. The download remains a file on the user's device; this is not encrypted document storage.

### Explanatory roles, not authorization

[`visibilityFor`](../lib/visibility.ts) returns static descriptions for client, agency, contractor, and public views. [`VisibilityExplorer`](../components/VisibilityExplorer.tsx) renders a keyboard-operable tab interface.

These descriptions explain the intended access model. They do not authorize access to records, and hiding a rate in this interface is not a cryptographic privacy control.

### A bounded decorative canvas

[`PaymentField`](../components/PaymentField.tsx) draws procedural particles using Canvas 2D. It needs no image download, animation library, or React state update per frame.

The drawing loop is capped at 20 paints per second. It stops scheduling while the document is hidden or the canvas is offscreen, caps device-pixel ratio at 2, and renders a static frame for reduced motion. Resize and intersection observers are disconnected on cleanup. The canvas is hidden from assistive technology because it conveys no financial data.

The paint-rate test checks the scheduling bound. It does not establish field performance or an improvement in Core Web Vitals. Historical Lighthouse reports are measurements of their recorded URLs and revisions only.

## Confidential escrow model

[`ConfidentialEscrowProbe`](../contracts/src/ConfidentialEscrowProbe.sol) models one agreement with a client, an agency, a scope commitment, and three distinct recipients. The constructor rejects the wrong chain, invalid parties, duplicate recipients, an empty scope, and a token address without code.

### Configuration and visibility

Only the agency can configure allocations, and only once. Each encrypted allocation is bounded to `uint128` before summation. The contract uses an encrypted validity flag and selects zero for an invalid value, avoiding an unbounded addition while keeping eligibility encrypted.

Retained amount handles are accessible to the contract, agency, and relevant recipient. Token-call permissions are granted before transfer. Public addresses, timing, and interaction patterns remain outside the confidentiality guarantee.

### Release and returned-amount accounting

Only the client can approve release, and the supplied scope must match the committed scope. The contract checks aggregate funding eligibility before selecting transfer amounts.

The test token deliberately models zero-on-insufficient behavior: the call can succeed while the transferred amount is zero. After each call, the escrow subtracts the returned encrypted amount from the recipient's remaining allocation. Retries operate on that remainder rather than the original allocation. Settlement is an encrypted result derived from the remaining balances, not an unconditional public `paid` flag.

This is not an atomic-settlement guarantee against arbitrary token behavior. The model trusts the supplied token's accounting semantics; deployed-wrapper parity and mixed partial-payment behavior remain unverified.

### Cancellation policy

The agency must approve cancellation, and only the client can request the refund. Both actions are restricted to the pre-release mode. The refund compares the returned amount with the requested confidential balance and grants result access to the parties.

A release attempt starts release mode even when funds are insufficient. A refund request marks cancellation before the result is known. Those are narrow research policies, not a complete recovery or dispute design. Boolean mode flags must not be interpreted as evidence that money arrived.

### What local tests establish

The Foundry suite covers selected caller restrictions, scope binding, allocation immutability, aggregate insufficiency, bounded arithmetic, recipient rules, release retries, cancellation, and handle permissions using Inco's simulated execution and a test-only token.

It does not establish live cToken bytecode parity, real payment settlement, production security, or general resistance to unauthorized decryption. The [bounded experiment review](verification/contract-review.md) records further omissions, including adversarial token behavior and mixed partial-payment regressions. Solidity implementation is unchanged by the portfolio rename; package and diagnostic names are different from the original review snapshot.

## Network probe

[`preflight.mjs`](../contracts/scripts/preflight.mjs) requires Base Sepolia (`84532`) and pins its provider reads to a single block. It resolves the USDC wrapper and its underlying token, reads the upgrade beacon and implementation, and checks executor bytecode.

`BASE_SEPOLIA_RPC_URL` optionally selects an endpoint. `BASE_PAYMENTS_TESTNET_PRIVATE_KEY` is only a presence diagnostic; no key is required for the read-only probe, and the script never signs. This name replaces the old `SCOPEVEIL_TESTNET_PRIVATE_KEY` diagnostic. Do not add a key merely to run the probe.

Provider discovery is not escrow deployment or payment proof. The probe explicitly reports `escrowDeployed: false` and `livePaymentProof: false`.

## Delivery boundaries

The website can run natively or in a non-root Docker container. The container publishes only a loopback port, uses a read-only filesystem with a temporary `/tmp`, and drops Linux capabilities.

Vercel receives the website source and its build configuration. `.vercelignore` excludes contracts, internal documentation, tests, environment files, and local caches. `.github/workflows/verify.yml` separates frontend and contract checks and uses read-only repository permissions without deployment or signing secrets.

CI status, local tests, a ready Vercel deployment, and live browser checks answer different questions. None of them constitutes an escrow audit or permission to accept funds.

## What remains outside this prototype

- A verified Base Sepolia deployment with authentic wrapper funding, recipient balance deltas, refunds, and disclosure checks.
- Application identity, wallet authority, persistent agreements, and encrypted document storage.
- Versioned milestones, disputes, amendments, recovery, and production session authorization.
- License, legal/custody, and provider upgrade/pause/blocklist assessments.
- Any customer-funds pilot or production-readiness claim.
