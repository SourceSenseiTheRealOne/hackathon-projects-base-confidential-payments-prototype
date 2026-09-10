import type { Metadata } from "next";
import { Header, Footer } from "@/components/SiteChrome";
export const metadata: Metadata = { title: "The product" };
export default function Product() {
  return (
    <>
      <Header />
      <main id="main" className="document wrap">
        <p className="eyebrow">THE PROPOSED PRODUCT</p>
        <h1>
          Built around
          <br />
          the agreement.
        </h1>
        <p className="document-lead">
          Funding, delivery and private payouts should belong to the same
          workflow.
        </p>
        <aside className="notice">
          <strong>Payments are not enabled.</strong>
          <p>
            Scopeveil is in development. This page describes intended behavior,
            not a live escrow service. No customer funds are accepted.
          </p>
        </aside>
        <section>
          <h2>One engagement, four roles.</h2>
          <p>
            A client funds the agreed scope. An agency delivers against
            milestones. Contractors receive committed allocations. A reviewer
            resolves disputes under rules accepted before funding.
          </p>
        </section>
        <section>
          <h2>Milestones with explicit approval.</h2>
          <p>
            Each approval references the exact agreement and submission version.
            Changing the work or allocations requires fresh approval. Silence
            triggers escalation, not automatic payment.
          </p>
        </section>
        <section>
          <h2>Shares that stay committed.</h2>
          <p>
            Once contractor allocations are accepted, the agency cannot silently
            reduce them. Additional work requires an approved, funded change. A
            dispute freezes the affected unpaid milestone rather than unrelated
            approved work.
          </p>
        </section>
        <section>
          <h2>What we must prove first.</h2>
          <p>
            Confidential contract-held funding, reservation sufficiency,
            authorized release and refund on Base Sepolia. Tests must reject
            unauthorized release, double reservation, replay and insufficient
            funding.
          </p>
          <p>
            A successful transaction alone is not proof that a recipient
            received their full payment. Receipts must reflect verified
            settlement.
          </p>
        </section>
        <section>
          <h2>The first pilot.</h2>
          <p>
            One agency, one client and two contractors. Two milestones. Measure
            setup time, payment costs, reconciliation effort and willingness to
            continue. No tokens, lending, yield strategies or speculative
            rewards.
          </p>
          <p>
            A customer-funds pilot requires an independent contract review, a
            legal and custody assessment, recovery procedures and separate
            production approval.
          </p>
          <a className="button" href="/#pilot">
            Join the pilot ↗
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
