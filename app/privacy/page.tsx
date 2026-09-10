import type { Metadata } from "next";
import { Header, Footer } from "@/components/SiteChrome";
export const metadata: Metadata = { title: "Privacy & data" };
export default function Privacy() {
  return (
    <>
      <Header />
      <main id="main" className="document wrap">
        <p className="eyebrow">PRIVACY & DATA</p>
        <h1>
          Private amounts.
          <br />
          Clear boundaries.
        </h1>
        <p className="document-lead">
          Confidentiality is about controlling access to specific information.
          It is not a promise of anonymity.
        </p>
        <section>
          <h2>This website</h2>
          <p>
            This launch site does not connect a wallet, accept funds or create
            an account. We do not add analytics, tracking cookies or browser
            storage. Fonts are served with the site.
          </p>
          <p>
            The pilot brief builder processes your text in this browser and
            downloads a file only when you request it. It does not send your
            brief to us. Your browser or download software may retain the
            downloaded file. The hosting environment may process routine request
            information such as IP addresses for delivery and security.
          </p>
        </section>
        <section>
          <h2>The proposed payment product</h2>
          <p>
            The intended design separates client project information, agency
            allocations and each contractor’s own rate and receipt. This is a
            design target pending cryptographic integration and authorization
            testing.
          </p>
          <p>
            Documents should be encrypted before storage, with explicit
            recipient access and randomized commitments. Anyone who has already
            decrypted or downloaded information may retain a copy. Revoking
            future access cannot erase it.
          </p>
        </section>
        <section>
          <h2>What may remain public</h2>
          <p>
            Wallet addresses, transaction timing, contract interaction patterns,
            fees and ordinary token deposits or withdrawals can remain public.
            Those details may allow observers to infer relationships or amounts.
            Small groups and distinctive payment timing can weaken practical
            privacy.
          </p>
          <p>
            Inco uses encrypted state and an authorization/attestation system.
            Its infrastructure and trust model are part of the assessment;
            encrypted state alone does not prove our escrow safe or
            production-ready.
          </p>
          <a
            className="text-link"
            href="https://docs.inco.org/ctoken/overview"
            target="_blank"
            rel="noreferrer"
          >
            Read the provider documentation ↗
          </a>
        </section>
        <section>
          <h2>Before real funds</h2>
          <p>
            We must publish an evidence-backed privacy boundary, test each
            participant’s access, assess key recovery and custodial
            responsibilities, and obtain independent contract review. Payments
            stay disabled until those gates are addressed.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
