import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Privacy Policy | PROSITEUK",
  description: "Privacy policy for PROSITEUK Construction Recruitment Agency.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-[#efefef] via-white to-white rounded-xl glass-outline-subtle px-6 sm:px-10 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto space-y-10">

          <div>
            <p className="text-xs uppercase tracking-widest text-crimson font-semibold mb-3">Legal</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4">Privacy Policy</h1>
            <p className="text-charcoal/60 text-sm">Last updated: June 2026</p>
          </div>

          <div className="space-y-8 text-charcoal/80 text-sm leading-relaxed">

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-charcoal">1. Who we are</h2>
              <p>PROSITEUK is a construction recruitment agency operating in the United Kingdom. Our registered address is 255–259 Commercial Road, 2nd Floor, Whitechapel, London E1 2BT.</p>
              <p>We are committed to protecting your personal data and complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
              <p>For any privacy-related queries, contact us at <a href="mailto:info@prositeuk.com" className="text-crimson underline underline-offset-2">info@prositeuk.com</a>.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-charcoal">2. What data we collect</h2>
              <p>We may collect and process the following personal data:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Candidates:</strong> Full name, email address, phone number, CV and work history, cover message, employment preferences, and location.</li>
                <li><strong>Employers and clients:</strong> Name, job title, company name, email address, and phone number.</li>
                <li><strong>Website visitors:</strong> Usage data collected via analytics tools (such as page views and referral sources). We do not use tracking cookies that identify individuals without consent.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-charcoal">3. How we use your data</h2>
              <p>We use your personal data to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Process and manage job applications submitted through our website.</li>
                <li>Match candidates with suitable employment opportunities.</li>
                <li>Communicate with you about vacancies, your application status, or our services.</li>
                <li>Fulfil our contractual obligations to clients and candidates.</li>
                <li>Comply with legal obligations.</li>
                <li>Improve and maintain our website and services.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-charcoal">4. Legal basis for processing</h2>
              <p>We process your personal data on the following legal bases:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Legitimate interests:</strong> To operate as a recruitment business and match candidates with employers.</li>
                <li><strong>Contract:</strong> To fulfil our obligations where we have entered into an agreement with you.</li>
                <li><strong>Legal obligation:</strong> Where we are required to process data to comply with the law.</li>
                <li><strong>Consent:</strong> Where you have explicitly given us permission to contact you.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-charcoal">5. CV and application data</h2>
              <p>When you apply for a role through our website, your application details (including any CV link you provide) are stored securely in our internal applicant tracking system (Sanity CMS) and shared with the relevant hiring client for the purpose of assessing your application.</p>
              <p>We retain application data for up to 12 months after submission. You may request deletion of your data at any time by contacting us at <a href="mailto:info@prositeuk.com" className="text-crimson underline underline-offset-2">info@prositeuk.com</a>.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-charcoal">6. Sharing your data</h2>
              <p>We do not sell your personal data. We may share your data with:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Employers and hiring clients</strong> — for the purpose of assessing your job application.</li>
                <li><strong>Technology service providers</strong> — including our website hosting provider (Vercel), content management platform (Sanity), and email delivery service (Resend), all of which are bound by data processing agreements.</li>
                <li><strong>Legal and regulatory authorities</strong> — where required by law.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-charcoal">7. Data retention</h2>
              <p>We retain personal data only for as long as necessary for the purposes set out in this policy, or as required by law. Candidate application data is retained for up to 12 months. Client contact data is retained for the duration of the business relationship and up to 3 years thereafter.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-charcoal">8. Your rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate data.</li>
                <li>Request deletion of your data ("right to be forgotten").</li>
                <li>Object to or restrict how we process your data.</li>
                <li>Request a portable copy of your data.</li>
                <li>Withdraw consent at any time where processing is based on consent.</li>
              </ul>
              <p>To exercise any of these rights, please contact us at <a href="mailto:info@prositeuk.com" className="text-crimson underline underline-offset-2">info@prositeuk.com</a>. We will respond within 30 days.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-charcoal">9. Cookies</h2>
              <p>Our website uses only essential cookies required for the site to function. We do not use advertising or third-party tracking cookies. Analytics data, if collected, is anonymised and not linked to individual users.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-charcoal">10. Security</h2>
              <p>We take appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. All data is transmitted over encrypted HTTPS connections, and access to our internal systems is restricted to authorised personnel only.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-charcoal">11. Changes to this policy</h2>
              <p>We may update this privacy policy from time to time. The latest version will always be available on this page with the date of the most recent update shown at the top.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-charcoal">12. Complaints</h2>
              <p>If you have concerns about how we handle your personal data, please contact us in the first instance. You also have the right to lodge a complaint with the UK's data protection authority:</p>
              <p><strong>Information Commissioner's Office (ICO)</strong><br />
              Website: <a href="https://ico.org.uk" target="_blank" rel="noreferrer" className="text-crimson underline underline-offset-2">ico.org.uk</a><br />
              Helpline: 0303 123 1113</p>
            </section>

          </div>
        </div>
      </section>
    </PageShell>
  );
}
