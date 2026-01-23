import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0614] to-black text-gray-300 px-6 py-20">
      <div className="max-w-3xl mx-auto bg-[#12091f]/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-purple-400 mb-2">
          Contact Us
        </h1>
        <p className="text-gray-400 mb-8">
          Have questions, feedback, or need support? We’d love to hear from you.
        </p>

        {/* Contact Info */}
        <div className="space-y-6">

          <div>
            <h2 className="text-lg font-semibold text-purple-300 mb-1">
              📧 Email
            </h2>
            <p className="text-gray-400">
              support@xlenseanalytics.com
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-purple-300 mb-1">
              🌐 Website
            </h2>
            <p className="text-gray-400">
              https://xlens-alpha.vercel.app
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-purple-300 mb-1">
              💼 Business & Collaboration
            </h2>
            <p className="text-gray-400">
              For partnerships, integrations, or enterprise queries, please
              contact us via email.
            </p>
          </div>

        </div>

        <hr className="my-8 border-purple-500/20" />

        <p className="text-sm text-gray-500">
          We usually respond within 24–48 hours. Thank you for using{" "}
          <span className="text-purple-400 font-medium">
            Xlense Analytics
          </span>.
        </p>

      </div>
    </div>
  );
};

export default Contact;
