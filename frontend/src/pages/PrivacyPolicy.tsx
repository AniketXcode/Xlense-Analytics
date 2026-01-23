import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0614] to-black text-gray-300 px-6 py-20">
      <div className="max-w-4xl mx-auto bg-[#12091f]/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-xl">
        
        <h1 className="text-3xl font-bold text-purple-400 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Last updated: January 2026
        </p>

        <p className="mb-6">
          Welcome to <span className="text-purple-400 font-semibold">Xlense Analytics</span>.
          Your privacy is very important to us. This page explains how we collect,
          use, and protect your information when you use our website.
        </p>

        <Section title="1. Information We Collect">
          We do not collect personal information unless you voluntarily provide it.
          Uploaded files are used only for analytics and visualization purposes.
        </Section>

        <Section title="2. Log Files">
          Like many websites, Xlense Analytics uses log files. These include IP address,
          browser type, ISP, date and time, and referring pages. This data is used only
          for analytics and improving user experience.
        </Section>

        <Section title="3. Cookies">
          Xlense Analytics uses cookies to store visitor preferences and optimize
          website performance. You can choose to disable cookies through your browser.
        </Section>

        <Section title="4. Google AdSense">
          We use Google AdSense to display advertisements. Google is a third-party vendor
          that uses cookies (including the DoubleClick cookie) to serve ads based on
          users’ visits to this and other websites.
          <br /><br />
          Users may opt out of personalized advertising by visiting:
          <br />
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline"
          >
            https://www.google.com/settings/ads
          </a>
        </Section>

        <Section title="5. Third-Party Privacy Policies">
          Xlense Analytics’ Privacy Policy does not apply to other advertisers or websites.
          We advise users to consult the respective Privacy Policies of third-party ad servers.
        </Section>

        <Section title="6. Data Security">
          We take reasonable security measures to protect your data. However, no method
          of transmission over the Internet is completely secure.
        </Section>

        <Section title="7. Children’s Information">
          Xlense Analytics does not knowingly collect personal data from children
          under the age of 13.
        </Section>

        <Section title="8. Consent">
          By using our website, you hereby consent to this Privacy Policy and agree
          to its terms.
        </Section>

        <Section title="9. Contact Us">
          If you have any questions about this Privacy Policy, you can contact us:
          <br />
          <span className="text-purple-400 font-medium">
            support@xlenseanalytics.com
          </span>
        </Section>

      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-purple-300 mb-2">
      {title}
    </h2>
    <p className="text-gray-400 leading-relaxed">{children}</p>
  </div>
);

export default PrivacyPolicy;
