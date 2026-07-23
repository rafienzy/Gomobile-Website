import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { LegalBody, LegalSection } from "../components/LegalBody";

export const metadata = {
  title: "Terms of Service — Go Mobile",
  description: "The terms that govern your use of the Go Mobile website.",
};

export default function TermsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      <PageHero
        eyebrow="LEGAL"
        title={
          <>
            Terms of <span className="text-gradient-animated">Service</span>.
          </>
        }
        lede="These terms govern your use of the Go Mobile website. Please read them before using the site."
      />
      <LegalBody updated="23 July 2026">
        <LegalSection title="1. Acceptance of these terms">
          <p>
            By accessing or using gomobile.id (the &ldquo;Site&rdquo;), you agree to these Terms of Service. If you do not
            agree, please do not use the Site.
          </p>
        </LegalSection>

        <LegalSection title="2. About our services">
          <p>
            Go Mobile, Inc. is a digital marketing agency specializing in performance buying and programmatic advertising.
            The Site provides information about our work and services. Any advertising or media engagement we undertake
            for a client is governed by a separate written agreement or statement of work, which prevails over these
            terms in the event of a conflict.
          </p>
        </LegalSection>

        <LegalSection title="3. Use of the Site">
          <p>You agree not to:</p>
          <ul>
            <li>use the Site in any way that breaches applicable laws or regulations;</li>
            <li>attempt to gain unauthorized access to the Site, its systems, or networks;</li>
            <li>interfere with or disrupt the integrity or performance of the Site;</li>
            <li>copy, scrape, or reproduce Site content except as permitted below.</li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Intellectual property">
          <p>
            The Site and its content — including text, graphics, logos, and design — are owned by Go Mobile or its
            licensors and are protected by intellectual property laws. You may view and share the content for your own
            informational purposes, but you may not reproduce it commercially without our prior written consent.
          </p>
        </LegalSection>

        <LegalSection title="5. Submissions and enquiries">
          <p>
            When you send us a brief or enquiry through the Site, you confirm that the information you provide is accurate
            and that you are authorized to share it. We handle information you submit in line with our{" "}
            <a href="/privacy" style={{ color: "#ef6600" }}>Privacy Policy</a>.
          </p>
        </LegalSection>

        <LegalSection title="6. Third-party links and platforms">
          <p>
            The Site may link to third-party websites or platforms that we do not control. We are not responsible for
            their content, policies, or practices, and including a link does not imply endorsement.
          </p>
        </LegalSection>

        <LegalSection title="7. Disclaimers">
          <p>
            The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest extent
            permitted by law, we make no warranties, express or implied, regarding the Site&rsquo;s availability,
            accuracy, or fitness for a particular purpose.
          </p>
        </LegalSection>

        <LegalSection title="8. Limitation of liability">
          <p>
            To the fullest extent permitted by law, Go Mobile will not be liable for any indirect, incidental, or
            consequential damages arising from your use of, or inability to use, the Site.
          </p>
        </LegalSection>

        <LegalSection title="9. Changes to the Site and these terms">
          <p>
            We may update the Site and these terms from time to time. Changes take effect when posted, and the
            &ldquo;last updated&rdquo; date above will reflect the most recent revision. Your continued use of the Site
            means you accept the updated terms.
          </p>
        </LegalSection>

        <LegalSection title="10. Governing law">
          <p>
            These terms are governed by the laws of the Republic of Indonesia, without regard to its conflict-of-law
            rules. Any dispute relating to the Site will be subject to the exclusive jurisdiction of the courts of
            Jakarta, Indonesia.
          </p>
        </LegalSection>

        <LegalSection title="11. Contact us">
          <p>
            Questions about these terms? Email us at{" "}
            <a href="mailto:hello@gomobile.id" style={{ color: "#ef6600" }}>hello@gomobile.id</a>.
          </p>
        </LegalSection>
      </LegalBody>
      <Footer />
    </main>
  );
}
