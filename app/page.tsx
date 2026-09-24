import { Header, Footer } from "@/components/SiteChrome";
import { PaymentField } from "@/components/PaymentField";
import { VisibilityExplorer } from "@/components/VisibilityExplorer";
import { PilotBrief } from "@/components/PilotBrief";

export default function Home() {
  return (
    <>
      <Header home />
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">PRIVATE PROJECT PAYMENTS ON BASE</p>
            <h1 id="hero-title">
              Start funded.
              <br />
              <span className="quiet">Pay privately.</span>
            </h1>
            <p className="hero-description">
              Reserve project funds, approve milestones, and pay contractors
              without publishing individual rates.
            </p>
            <div className="actions">
              <a className="button" href="#pilot">
                Join the pilot <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="#how-it-works">
                How it works <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <PaymentField />
        </section>
        <section className="intro wrap">
          <p className="large-statement">
            The work is shared.
            <br />
            The rates don’t have to be.
          </p>
          <div>
            <p>
              Clients need confidence in delivery. Agencies need confidence in
              funding. Contractors need to know what they’re owed.
            </p>
            <p className="muted">
              The proposed workflow brings those commitments into one agreement,
              without turning your commercial terms into public information.
            </p>
          </div>
        </section>
        <section
          className="engagement wrap"
          id="how-it-works"
          aria-labelledby="example-title"
        >
          <div className="section-heading">
            <h2 id="example-title">
              A project, not
              <br />a payment request.
            </h2>
            <p>
              One client. One agency. Two contractors.
              <br />
              Here’s the proposed flow.
            </p>
          </div>
          <div className="example-layout">
            <div className="project-amount">
              <span className="example-label">ILLUSTRATIVE ENGAGEMENT</span>
              <p className="amount">
                6,000<span>USDC</span>
              </p>
              <p>Reserved for a software project.</p>
              <p className="muted small">
                An example, not a funded agreement.
                <br />
                This is a concept prototype.
              </p>
              <div className="allocation-art" aria-hidden="true">
                <div />
                <div />
                <div />
              </div>
            </div>
            <ol className="workflow">
              <li>
                <span className="step-marker" aria-hidden="true">
                  ↘
                </span>
                <div>
                  <h3>Agree. Then reserve.</h3>
                  <p>
                    Set milestones, allocations and dispute rules. Confirm the
                    agreed funds are reserved before work begins.
                  </p>
                </div>
              </li>
              <li>
                <span className="step-marker" aria-hidden="true">
                  ↘
                </span>
                <div>
                  <h3>Deliver against the agreement.</h3>
                  <p>
                    Submit work for review. Approval belongs to that exact
                    milestone and version, not whatever changes later.
                  </p>
                </div>
              </li>
              <li>
                <span className="step-marker" aria-hidden="true">
                  ↗
                </span>
                <div>
                  <h3>Approval becomes payment.</h3>
                  <p>
                    Release the accepted shares to the agency and contractors.
                    Each recipient gets their own receipt.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>
        <section className="privacy-section wrap" id="privacy">
          <div className="section-heading">
            <p className="eyebrow">CONFIDENTIAL, NOT UNACCOUNTABLE</p>
            <h2>
              The right details.
              <br />
              For the right people.
            </h2>
            <p>
              Privacy should be a clear permission,
              <br />
              not a vague promise.
            </p>
          </div>
          <VisibilityExplorer />
        </section>
        <section className="scope-section wrap">
          <div className="scope-art" aria-hidden="true">
            <span className="scope-ring ring-one" />
            <span className="scope-ring ring-two" />
            <span className="scope-orbit">+</span>
          </div>
          <div>
            <h2>
              New scope.
              <br />
              New commitment.
            </h2>
            <p>“One more thing” should come with its own funding.</p>
            <p className="muted">
              Changes become active only when both parties approve and
              additional funds are reserved. The original agreement stays clear.
            </p>
            <a className="text-link" href="/product">
              Explore the product ↗
            </a>
          </div>
        </section>
        <section className="trust-section wrap">
          <h2>
            Trust needs rules.
            <br />
            <span className="quiet">Not just a contract.</span>
          </h2>
          <div className="trust-details">
            <div>
              <h3>Agreed before funding.</h3>
              <p>
                Review windows, cancellation rules and a named dispute reviewer.
                No automatic payout just because someone went quiet.
              </p>
            </div>
            <div>
              <h3>Privacy with boundaries.</h3>
              <p>
                Encrypted amounts do not mean anonymous activity. Addresses,
                timing and public deposits or withdrawals can remain visible.
              </p>
            </div>
            <div>
              <h3>Proof before real funds.</h3>
              <p>
                Confidential escrow is being evaluated on Base Sepolia. Payment
                functionality remains disabled pending technical proof and
                review.
              </p>
            </div>
          </div>
        </section>
        <section className="pilot-section wrap" id="pilot">
          <div>
            <p className="eyebrow">FOR AGENCIES THAT WORK IN USDC</p>
            <h2>
              Build the way
              <br />
              you get paid.
            </h2>
            <p>
              Help shape private project payments.
              <br />
              We’re looking for an agency with a real engagement to test.
            </p>
          </div>
          <PilotBrief />
        </section>
      </main>
      <Footer />
    </>
  );
}
