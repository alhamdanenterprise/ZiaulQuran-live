import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { CONTACT_INFO } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Terms & Conditions — Zia-ul-Quran Sulemania Lilbanat",
  description:
    "The terms and conditions governing use of the Zia-ul-Quran Sulemania Lilbanat website.",
};

const LAST_UPDATED = "August 27, 2026";

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          These Terms &amp; Conditions govern your use of this website, operated
          by{" "}
          <strong className="font-semibold text-ink">
            Zia-ul-Quran Sulemania Lilbanat
          </strong>
          . By visiting or using this site, you agree to these terms.
        </>
      }
    >
      <LegalSection title="1. About This Website">
        <p>
          This website provides general information about Dar-ul-Uloom
          Zia-ul-Quran Sulemania Lilbanat — its programmes, facilities,
          events, and how to get in touch or contribute. Content is provided
          for informational purposes and is not a binding offer of
          admission, employment, or any service.
        </p>
      </LegalSection>

      <LegalSection title="2. Admissions Enquiries">
        <p>
          Submitting an enquiry through this website (including the
          &quot;Admissions Enquiry&quot; contact form) does not guarantee admission.
          All admissions are subject to our own verification, interview, and
          enrolment processes, communicated to you directly.
        </p>
      </LegalSection>

      <LegalSection title="3. Donations">
        <p>
          This website does{" "}
          <strong className="font-semibold text-ink">not</strong> process
          any payments, and does not use an online payment gateway. The bank
          account and mobile wallet (JazzCash/Easypaisa) details shown in
          the Donate section are provided so that you can make a transfer
          independently, through your own bank or wallet app.
        </p>
        <p>
          You are responsible for entering the correct account details when
          making a transfer. We are not able to reverse or refund transfers
          made incorrectly to the wrong account, and we are not responsible
          for errors made by your bank, wallet provider, or their networks.
        </p>
      </LegalSection>

      <LegalSection title="4. Intellectual Property">
        <p>
          The text, logo, emblem, photographs, and other content on this
          website belong to Zia-ul-Quran Sulemania Lilbanat and Anjuman
          Qamar-ul-Islam Sulemania, or are used with permission. You may
          view and share pages of this site for personal, non-commercial
          purposes, but may not reproduce, redistribute, or modify our
          content for commercial use without our written permission.
        </p>
      </LegalSection>

      <LegalSection title="5. Acceptable Use">
        <p>When using this website, in particular the contact form, you agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Submit false, misleading, unlawful, or abusive content;</li>
          <li>Impersonate any person or organisation;</li>
          <li>
            Use automated tools to submit the contact form or scrape content
            from this site;
          </li>
          <li>
            Attempt to disrupt, overload, or gain unauthorised access to
            this website or the services it relies on.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="6. External Links">
        <p>
          This site links to third-party platforms — including WhatsApp,
          Facebook, Instagram, and TikTok. We are not responsible for the
          content, accuracy, or practices of those external platforms, and
          your use of them is governed by their own terms.
        </p>
      </LegalSection>

      <LegalSection title="7. No Warranty">
        <p>
          We try to keep the information on this website — including
          programme, fee, and facility details — accurate and up to date,
          but we make no guarantee that it is complete, current, or
          error-free. Please confirm important details directly with us
          before relying on them. This website and its content are provided
          &quot;as is,&quot; without warranties of any kind.
        </p>
      </LegalSection>

      <LegalSection title="8. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Zia-ul-Quran Sulemania
          Lilbanat is not liable for any indirect, incidental, or
          consequential loss arising from your use of this website,
          including any donation made to an incorrectly-entered account.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing Law">
        <p>
          These terms are governed by the laws of Pakistan, and any disputes
          arising from them are subject to the jurisdiction of the courts of
          Karachi.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to These Terms">
        <p>
          We may update these Terms &amp; Conditions from time to time.
          Changes will be posted on this page with a revised &quot;Last
          updated&quot; date.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>Questions about these terms can be sent to:</p>
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
