import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { CONTACT_INFO } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy — Zia-ul-Quran Sulemania Lilbanat",
  description:
    "How Zia-ul-Quran Sulemania Lilbanat collects, uses, and protects information submitted through this website.",
};

const LAST_UPDATED = "August 27, 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          This Privacy Policy explains what information{" "}
          <strong className="font-semibold text-ink">
            Zia-ul-Quran Sulemania Lilbanat
          </strong>{" "}
          (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects through this website, how we use it,
          and the choices you have. By using this site, you agree to the
          practices described here.
        </>
      }
    >
      <LegalSection title="1. Information We Collect">
        <p>We only collect information you choose to give us:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-ink">
              Contact form submissions:
            </strong>{" "}
            your full name, email address, phone number (optional), subject,
            and message, when you use the Contact section to reach us.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Basic technical data:
            </strong>{" "}
            our hosting provider and form-processing service automatically
            log standard technical information (such as IP address and
            browser type) for security and spam-prevention purposes. We do
            not access or use this data ourselves beyond what those services
            provide.
          </li>
        </ul>
        <p>
          We do not use cookies, analytics trackers, or advertising
          technology on this website, and we do not ask you to create an
          account.
        </p>
      </LegalSection>

      <LegalSection title="2. How We Use Your Information">
        <p>Information submitted through the contact form is used only to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Respond to your admissions, donation, or general enquiry;</li>
          <li>Get in touch with you about matters you&apos;ve raised with us.</li>
        </ul>
        <p>
          We do not sell, rent, or trade your personal information to third
          parties, and we do not use it for marketing without your explicit
          consent.
        </p>
      </LegalSection>

      <LegalSection title="3. Third-Party Services We Use">
        <p>
          This website relies on a small number of third-party services to
          function. Each processes limited data under its own privacy
          policy:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-ink">Formspree</strong> —
            processes and delivers contact form submissions to us by email.
          </li>
          <li>
            <strong className="font-semibold text-ink">Google Fonts</strong>{" "}
            — loads the typefaces used on this site directly from
            Google&apos;s
            servers, which may receive your IP address as part of that
            request.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Our hosting provider
            </strong>{" "}
            — serves this website and keeps standard security/access logs.
          </li>
        </ul>
        <p>
          If you click through to WhatsApp, Facebook, Instagram, or TikTok
          from this site, your interaction with those platforms is governed
          by their own privacy policies, not ours.
        </p>
      </LegalSection>

      <LegalSection title="4. Data Retention">
        <p>
          Contact form submissions are retained in our email inbox and in
          Formspree&apos;s systems for as long as reasonably necessary to respond
          to your enquiry and keep a record of correspondence, unless you ask
          us to delete it sooner.
        </p>
      </LegalSection>

      <LegalSection title="5. Children's Privacy">
        <p>
          This website is not directed at children. Admissions enquiries
          submitted through the contact form are expected to be made by a
          parent or guardian on behalf of a prospective student, not by a
          child directly.
        </p>
      </LegalSection>

      <LegalSection title="6. Your Rights">
        <p>
          You may ask us to access, correct, or delete any personal
          information you&apos;ve submitted to us, at any time, by contacting us
          using the details below.
        </p>
      </LegalSection>

      <LegalSection title="7. Data Security">
        <p>
          We take reasonable technical measures — including serving this
          site exclusively over HTTPS — to protect information submitted to
          us. However, no method of transmission or storage is completely
          secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Changes will
          be posted on this page with a revised &quot;Last updated&quot; date.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact Us">
        <p>
          Questions about this Privacy Policy, or requests regarding your
          information, can be sent to:
        </p>
        <p>
          {CONTACT_INFO.addressLines.join(", ")}
          <br />
          Phone:{" "}
          <a
            href={CONTACT_INFO.phoneHref}
            className="text-brand-blue hover:underline"
          >
            {CONTACT_INFO.phoneDisplay}
          </a>
          <br />
          Email:{" "}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-brand-blue hover:underline"
          >
            {CONTACT_INFO.email}
          </a>
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
