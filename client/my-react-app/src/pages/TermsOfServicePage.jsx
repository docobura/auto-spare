import React from 'react';
import termsPageBg from '../assets/termspage.jpeg'; // Import the background image

const TermsOfServicePage = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100">
  
      <main className="relative flex-1 p-6 max-w-full mx-auto">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${termsPageBg})`, opacity: 0.15 }}
        />
        <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-black">Terms of Service</h1>
          <p className="mb-4 text-black">
            Welcome to AutoSavy. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">1. Acceptance of Terms</h2>
          <p className="mb-4 text-black">
            By using our website and services, you agree to comply with these Terms of Service and all applicable laws and regulations.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">2. Changes to Terms</h2>
          <p className="mb-4 text-black">
            We may update these Terms of Service from time to time. We will notify you of any material changes by posting the new Terms of Service on our website.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">3. Use of Services</h2>
          <p className="mb-4 text-black">
            You agree to use our services only for lawful purposes and in accordance with these Terms of Service. You are responsible for your use of our services and any content you provide.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">4. User Accounts</h2>
          <p className="mb-4 text-black">
            You may be required to create an account to access certain features of our services. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">5. Intellectual Property</h2>
          <p className="mb-4 text-black">
            All content and materials on our website, including text, images, and logos, are the property of AutoSavy or its licensors and are protected by intellectual property laws.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">6. Limitation of Liability</h2>
          <p className="mb-4 text-black">
            Our services are provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of our services or inability to access them.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">7. Governing Law</h2>
          <p className="mb-4 text-black">
            These Terms of Service are governed by the laws of the state or country where AutoSavy is based, without regard to its conflict of law principles.
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2 text-black">8. Contact Us</h2>
          <p className="mb-4 text-black">
            If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@autosavy.com" className="text-orange-500 hover:underline">support@autosavy.com</a>.
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

export default TermsOfServicePage;
