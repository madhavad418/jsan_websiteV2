import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileNav from '../components/MobileNav'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0050a9] via-[#0a1a3a] to-[#0050a9] pt-32 pb-16" style={{ marginTop: '44px' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-white text-[36px] md:text-[48px] font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/70 text-lg">JSAN Consulting LTD &mdash; Your privacy matters to us</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg prose-gray max-w-none">

          {/* GDPR Compliance Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 lg:p-8 mb-12">
            <h3 className="text-[#0050a9] text-lg font-bold mb-2">GDPR Compliance</h3>
            <p className="text-gray-700 text-sm leading-relaxed m-0">
              JSAN Consulting LTD is committed to protecting your personal data in compliance with the General Data Protection Regulation (GDPR) (EU) 2016/679 and the UK GDPR. This policy explains how we collect, use, store, and protect your personal information, and outlines your rights as a data subject.
            </p>
          </div>

          {/* Section 1 */}
          <h2 className="text-[#0050a9] text-2xl lg:text-[28px] font-bold mb-4">
            What Data Do We Collect About You and Where Does It Come From?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            JSAN collects work history, education (CV), name, and contact details including email, phone, and address. Your CV is an important, personal document and we believe that you should be fully in control.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Additional information collected may include ID documentation, nationality, right-to-work records, references, PPS/National Insurance numbers, and date of birth. Certain roles require financial and criminal record checks.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Contractors must provide financial information such as bank account details, company registration, VAT number, and insurance documentation.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Reference providers' names, contact details, and reference content are retained. Limited information about client/supplier contacts â€” including name, company, and position â€” may be held.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Data sources include direct provision, third-party job boards, online CV directories, social media, networking sites, public domain information, and referees.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Website visits generate anonymous usage records to track visitor numbers and popular sections. Form submissions record email addresses and phone numbers.
          </p>

          {/* Section 2 */}
          <h2 className="text-[#0050a9] text-2xl lg:text-[28px] font-bold mb-4">
            How Do We Use Your Personal Data?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The primary purpose involves helping candidates secure roles and supporting career development. We send information about potentially relevant positions and contact candidates before submitting CVs to prospective employers.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            GDPR compliance requires disclosure of the lawful basis for processing. JSAN seeks consent when acquiring and before sharing candidate details with employers.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            As a recruitment business, JSAN invokes "legitimate interest" for recruitment processing activities. When engagements occur, "performing a contract" serves as the lawful basis for holding and processing relevant information.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Data retention follows a five-year inactivity threshold; candidates with no contact for this period receive notification before record removal. However, contractual obligations may require holding certain information â€” particularly tax and financial records â€” for minimum periods of approximately two years.
          </p>

          {/* Section 3 */}
          <h2 className="text-[#0050a9] text-2xl lg:text-[28px] font-bold mb-4">
            Who Do We Share Your Personal Data With?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            CVs are shared with clients seeking to fill positions only after candidate approval.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Contractors' information is shared with tax authorities as required by law.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Third-party IT suppliers handle data storage and processing under appropriate data processing agreements and security measures.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Should the company be acquired, the new owner may access data under this policy's terms. Users receive advance notification and choice regarding data deletion or withholding from new controllers.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            SMS consent and phone numbers collected for messaging purposes are explicitly not shared with third parties or affiliates for marketing.
          </p>

          {/* Section 4 */}
          <h2 className="text-[#0050a9] text-2xl lg:text-[28px] font-bold mb-4">
            SMS Terms &amp; Conditions
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Providing a phone number constitutes consent to receive SMS messages regarding products, services, and updates. Message frequency varies; standard message and data rates may apply.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Customers may opt out by replying "STOP" to any text message.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Job vacancy and company event notifications are sent via text at the provided number, with opt-out available through "STOP" replies or contacting{' '}
            <a href="mailto:info@jsanconsulting.com" className="text-[#0050a9] font-medium hover:underline">info@jsanconsulting.com</a>.
          </p>

          {/* Section 5 */}
          <h2 className="text-[#0050a9] text-2xl lg:text-[28px] font-bold mb-4">
            Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            JSAN takes data responsibility seriously under GDPR. If unresolved concerns arise after direct contact, individuals may escalate to the Office of the Data Protection Commissioner (ODPC) in Ireland or the Information Commissioner's Office (ICO) in the UK.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li className="text-gray-700">
              <strong>Access</strong> â€” Request copies of all personal information held about you (data subject access requests).
            </li>
            <li className="text-gray-700">
              <strong>Rectification</strong> â€” Request correction of any inaccurate or incomplete data.
            </li>
            <li className="text-gray-700">
              <strong>Erasure</strong> â€” Request deletion of your personal data where there is no compelling reason for continued processing.
            </li>
            <li className="text-gray-700">
              <strong>Restrict processing</strong> â€” Request the restriction or suppression of your personal data.
            </li>
            <li className="text-gray-700">
              <strong>Data portability</strong> â€” Request transfer of your data to another organisation or directly to you.
            </li>
            <li className="text-gray-700">
              <strong>Object</strong> â€” Object to processing of your personal data in certain circumstances.
            </li>
            <li className="text-gray-700">
              <strong>Unsubscribe</strong> â€” Opt out of group marketing mailings via the "unsubscribe" button or by contacting{' '}
              <a href="mailto:info@jsanconsulting.com" className="text-[#0050a9] font-medium hover:underline">info@jsanconsulting.com</a>{' '}
              with "Unsubscribe" in the subject line.
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            Note: Unsubscribing from group mailings does not prevent individual outreach about specific relevant roles.
          </p>

          {/* Contact for Privacy */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 lg:p-8 mt-12">
            <h3 className="text-gray-900 text-lg font-bold mb-2">Questions About Your Data?</h3>
            <p className="text-gray-700 text-sm leading-relaxed m-0">
              If you have any questions about this privacy policy or wish to exercise any of your rights, please contact us at{' '}
              <a href="mailto:info@jsanconsulting.com" className="text-[#0050a9] font-medium hover:underline">info@jsanconsulting.com</a>.
              You may also lodge a complaint with the ODPC (Ireland) or the ICO (UK) if you believe your data protection rights have not been respected.
            </p>
          </div>

        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  )
}
