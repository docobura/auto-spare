import React from 'react';
import privacyPolicyBg from '../assets/policypage.jpeg'; // Import the background image

const PrivacyPolicyPage = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4 px-6 w-full">
        <nav className="flex justify-between items-center">
          <a href="/" className="flex items-center text-lg text-black">
            <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
            <div className="ml-2">AutoSavy</div>
          </a>
          <div className="flex space-x-4">
            <a href="/shop" className="text-black hover:text-gray-700">Shop</a>
            <a href="/servicing" className="text-black hover:text-gray-700">Servicing</a>
            <a href="/reviews" className="text-black hover:text-gray-700">Reviews</a>
            <a href="/cart" className="text-black hover:text-gray-700">Cart</a>
          </div>
        </nav>
      </header>
      <main className="relative flex-1 p-6 max-w-full mx-auto">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${privacyPolicyBg})`, opacity: 0.15 }}
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">
            At AutoSavy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website and services.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include personal information such as your name, email address, and payment details.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you. We may also use your information for marketing purposes, with your consent where required by law.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">3. How We Share Your Information</h2>
          <p className="mb-4">
            We may share your information with third-party service providers who assist us in operating our website and services. We do not sell your personal information to third parties.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">4. Security</h2>
          <p className="mb-4">
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no security system is impenetrable, and we cannot guarantee the security of your information.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">5. Your Choices</h2>
          <p className="mb-4">
            You can access, update, or delete your personal information by contacting us. You may also opt out of receiving marketing communications from us.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">6. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at support@autosavy.com.
          </p>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} AutoSavy. All rights reserved.</p>
          <div className="mt-2">
            <a href="/privacy-policy" className="text-gray-400 hover:text-gray-300">Privacy Policy</a> |{' '}
            <a href="/terms-of-service" className="text-gray-400 hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
