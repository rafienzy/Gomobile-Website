import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { LegalBody, LegalSection } from "../components/LegalBody";

export const metadata = {
  title: "Privacy Policy — Go Mobile",
  description: "How Go Mobile collects, uses, and protects data across our website and programmatic advertising services.",
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      <PageHero
        eyebrow="LEGAL"
        title={
          <>
            Privacy <span className="text-gradient-animated">Policy</span>.
          </>
        }
        lede="This policy explains what data we collect, how we use it across our website and programmatic advertising services, and the choices you have."
      />
      <LegalBody updated="23 July 2026">
        <LegalSection title="1. Who we are">
          <p>
            Go Mobile, Inc. (&ldquo;Go Mobile,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a
            digital marketing agency specializing in performance buying and programmatic advertising, with offices in
            Jakarta, Singapore, and Kuala Lumpur. This policy applies to gomobile.id and the services we provide through it.
          </p>
        </LegalSection>

        <LegalSection title="2. Information we collect">
          <p>
            <strong>Information you give us.</strong> When you send us a brief, email us, or otherwise get in touch, we
            collect the details you provide — such as your name, company, work email, phone number, and the contents of
            your message.
          </p>
          <p>
            <strong>Information collected automatically.</strong> When you visit our website we may collect device and
            usage data — including IP address, browser and device type, pages viewed, referring URLs, and interactions —
            through cookies and similar technologies.
          </p>
        </LegalSection>

        <LegalSection title="3. Advertising and programmatic data">
          <p>
            As a programmatic advertising agency, we and our platform GoNet use cookies, mobile advertising identifiers,
            and pseudonymous identifiers to plan, buy, deliver, and measure campaigns on behalf of our clients across
            web, in-app, and connected-TV inventory. This activity relies on data that does not directly identify you,
            and we do not use it to build profiles that reveal your real-world identity.
          </p>
          <p>
            We do not sell your personal information. Where campaigns involve interest-based advertising, we honor
            recognized industry opt-out mechanisms (see &ldquo;Your rights and choices&rdquo; below).
          </p>
        </LegalSection>

        <LegalSection title="4. How we use information">
          <p>We use the information we collect to:</p>
          <ul>
            <li>respond to your enquiries and provide the services you request;</li>
            <li>operate, secure, and improve our website and platform;</li>
            <li>plan, deliver, optimize, and measure advertising campaigns;</li>
            <li>meet legal, tax, and regulatory obligations.</li>
          </ul>
        </LegalSection>

        <LegalSection title="5. Cookies and tracking technologies">
          <p>
            We use essential cookies to run the site and, with your consent where required, analytics and advertising
            cookies to understand usage and support campaign measurement. You can control cookies through your browser
            settings; disabling some cookies may affect how the site works.
          </p>
        </LegalSection>

        <LegalSection title="6. Sharing and disclosure">
          <p>We may share information with:</p>
          <ul>
            <li>supply-side platforms, exchanges, and measurement and verification partners used to run campaigns;</li>
            <li>service providers who support our website and operations under confidentiality obligations;</li>
            <li>authorities or third parties where required by law, or to protect our rights, users, and partners.</li>
          </ul>
        </LegalSection>

        <LegalSection title="7. Data retention">
          <p>
            We keep personal information only for as long as it is needed for the purposes described here, to comply with
            legal obligations, resolve disputes, and enforce our agreements — after which it is deleted or anonymized.
          </p>
        </LegalSection>

        <LegalSection title="8. Your rights and choices">
          <p>
            Depending on where you are, you may have the right to access, correct, delete, or restrict the use of your
            personal information, and to object to certain processing. To exercise these rights, contact us using the
            details below.
          </p>
          <p>
            For interest-based advertising, you can opt out through industry tools such as YourOnlineChoices, the Network
            Advertising Initiative, and the Digital Advertising Alliance, and by resetting or limiting the advertising
            identifier on your mobile device.
          </p>
        </LegalSection>

        <LegalSection title="9. International transfers">
          <p>
            We operate across Southeast Asia and may process information in countries other than your own. Where we
            transfer data internationally, we take steps to ensure it remains protected in line with applicable law.
          </p>
        </LegalSection>

        <LegalSection title="10. Children&rsquo;s privacy">
          <p>
            Our website and services are intended for businesses and are not directed to children. We do not knowingly
            collect personal information from children.
          </p>
        </LegalSection>

        <LegalSection title="11. Security">
          <p>
            We use technical and organizational measures designed to protect personal information against loss, misuse,
            and unauthorized access. No method of transmission or storage is completely secure, however, and we cannot
            guarantee absolute security.
          </p>
        </LegalSection>

        <LegalSection title="12. Changes to this policy">
          <p>
            We may update this policy from time to time. When we do, we will revise the &ldquo;last updated&rdquo; date
            above and, where appropriate, provide additional notice.
          </p>
        </LegalSection>

        <LegalSection title="13. Contact us">
          <p>
            Questions about this policy or your data? Email us at{" "}
            <a href="mailto:hello@gomobile.id" style={{ color: "#ef6600" }}>hello@gomobile.id</a>, or write to us at any
            of our offices in Jakarta, Singapore, or Kuala Lumpur.
          </p>
        </LegalSection>
      </LegalBody>
      <Footer />
    </main>
  );
}
