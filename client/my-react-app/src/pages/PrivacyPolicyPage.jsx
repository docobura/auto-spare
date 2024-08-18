import React from 'react';
import privacyPolicyBg from '../assets/policypage.jpeg'; // Import the background image

const PrivacyPolicyPage = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100">
      <main className="relative flex-1 p-6 max-w-full mx-auto">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${privacyPolicyBg})`, opacity: 0.15 }}
        />
        <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-black">Privacy Policy</h1>
          <p className="mb-4 text-black">
            At AutoSavy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website and services.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">1. Information We Collect</h2>
          <p className="mb-4 text-black">
            We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include personal information such as your name, email address, and payment details.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">2. How We Use Your Information</h2>
          <p className="mb-4 text-black">
            We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you. We may also use your information for marketing purposes, with your consent where required by law.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">3. How We Share Your Information</h2>
          <p className="mb-4 text-black">
            We may share your information with third-party service providers who assist us in operating our website and services. We do not sell your personal information to third parties.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">4. Security</h2>
          <p className="mb-4 text-black">
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no security system is impenetrable, and we cannot guarantee the security of your information.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">5. Your Choices</h2>
          <p className="mb-4 text-black">
            You can access, update, or delete your personal information by contacting us. You may also opt out of receiving marketing communications from us.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">6. Changes to This Privacy Policy</h2>
          <p className="mb-4 text-black">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">7. Contact Us</h2>
          <p className="mb-4 text-black">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@autosavy.com" className="text-orange-500 hover:underline">support@autosavy.com</a>.
          </p>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} AutoSavy. All rights reserved.</p>
          <div className="mt-2">
            <a href="/privacy-policy" className="text-gray-400 hover:text-orange-500">Privacy Policy</a> |{' '}
            <a href="/terms-of-service" className="text-gray-400 hover:text-orange-500">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
