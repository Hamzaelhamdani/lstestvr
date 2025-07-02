import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how VenturesRoom collects, uses, and protects your personal information when you use our platform.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-2 text-foreground/70">We collect different types of information to provide and improve our services. This includes:</p>
      <ul className="list-disc ml-6 mb-4">
        <li><b>Account information</b> (name, email, phone, etc.): Used to create and manage your account.</li>
        <li><b>Usage data</b> (pages visited, actions performed): Helps us understand how you use the platform and improve your experience.</li>
        <li><b>Payment and transaction data</b>: Required to process your purchases and manage billing.</li>
        <li><b>Uploaded files and content</b>: Any files or content you upload (e.g., product images, documents) are stored securely.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-2 text-foreground/70">We use your information for the following purposes:</p>
      <ul className="list-disc ml-6 mb-4">
        <li><b>To provide and improve our services</b>: Your data allows us to deliver, maintain, and enhance the platform’s features.</li>
        <li><b>To process transactions and manage accounts</b>: We use your information to handle orders, payments, and account management.</li>
        <li><b>To communicate with you about updates and offers</b>: We may send you notifications, updates, or promotional content related to VenturesRoom.</li>
        <li><b>To ensure platform security and prevent fraud</b>: Your data helps us protect the platform and its users from unauthorized access or misuse.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
      <p className="mb-2 text-foreground/70">We respect your privacy and only share your data in limited circumstances:</p>
      <ul className="list-disc ml-6 mb-4">
        <li><b>We do not sell your data to third parties</b>: Your personal information is never sold.</li>
        <li><b>We may share data with trusted partners for service delivery</b>: For example, payment processors or cloud storage providers.</li>
        <li><b>We may disclose data if required by law</b>: Only when legally obligated (e.g., court order, government request).</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
      <p className="mb-2 text-foreground/70">You have the following rights regarding your personal data:</p>
      <ul className="list-disc ml-6 mb-4">
        <li><b>Access, update, or delete your personal data</b>: You can request to view, modify, or remove your information at any time.</li>
        <li><b>Request data portability</b>: You may ask to receive your data in a portable format.</li>
        <li><b>Withdraw consent at any time</b>: You can withdraw your consent for data processing where applicable.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact</h2>
      <p className="mb-4">For any questions about this Privacy Policy, contact us at <a href="mailto:support@venturesroom.com" className="text-primary underline">support@venturesroom.com</a>. We are committed to addressing your concerns promptly and transparently.</p>
      <p className="text-sm text-foreground/70">Last updated: July 2, 2025</p>
    </div>
  );
}
