import React from "react";
import "../../assets/stylesheets/FeatureCategory.scss";
import { Link } from "react-router-dom";
const Privacypolicy = () => {
  return (
    <>
      <div style={{ paddingBottom: 40, backgroundColor: "#405FF2" }}></div>
      <div className="mb-5 main">
        <div className="container">
          <div className="Breadcrumb-section">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  {/* <a href="home.js">Home</a> */}
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Privacy Policy
                </li>
              </ol>
            </nav>
          </div>
          <div className="about-section2-detail">
            <h1 className="mb-4">1. Introduction</h1>
            <p>
              Welcome to Albashayera Auto Auctions (“Company,” “we,” “our,” or
              “us”). Your privacy is important to us, and we are committed to
              protecting the personal information you provide while using our
              website www.abaautoauctions.com (the “Website”). This Privacy
              Policy explains how we collect, use, store, and protect your data
              when you use our car auction and buy-now services. By accessing or
              using our Website, you agree to the terms of this Privacy Policy.
            </p>
            <h1 className="mb-4">2. Information We Collect</h1>
            <p>
              We collect the following types of personal data when you interact
              with our platform:
            </p>
            <ul>
              <li>
                <b>Personal Information:</b> Name, Email, Phone Number, and
                Address.
              </li>
              <li>
                <b>Payment Information:</b> Payment details for manual bank
                transfers (we do not store payment details permanently).
              </li>
              <li>
                <b>Location Data: </b>We do not actively track your location,
                but your entered address is stored as part of your profile.
              </li>
              <li>
                <b>Account Information:</b> Username, password, and
                auction-related activities.
              </li>
              <li>
                <b> Order-Related Data:</b> Details about vehicle purchases,
                deposits, and invoices
              </li>
            </ul>
            <p>
              We do not collect data from third-party sources, social media
              platforms, or other external databases.
            </p>
            <h1 className="mb-4">3. How We Use Your Information</h1>
            <p>
              We only use your data for legitimate purposes, including but not
              limited to:
            </p>
            <ul>
              <li>
                Verifying your identity for auction participation and order
                processing.
              </li>
              <li>Processing vehicle purchases and deposit confirmations.</li>
              <li>
                Sending <b>automated</b> emails regarding account updates (e.g.,
                order confirmation, deposit completion, invoice updates)
              </li>
              <li>
                Ensuring compliance with legal and regulatory obligations.
              </li>
              <li>Enhancing the security and integrity of our platform.</li>
            </ul>
            <p>
              We <b>do not</b> use your information for marketing or promotional
              purposes.
            </p>
            <h1 className="mb-4">4. Data Sharing and Disclosure</h1>
            <p>
              We respect your privacy and do<b> not</b> share, sell, or disclose
              your personal data to any third parties, except in the following
              circumstances:
            </p>
            <ul>
              <li>
                <b>Legal Compliance:</b> If required by law, court orders, or
                regulatory authorities
              </li>
              <li>
                <b>Fraud Prevention:</b> To prevent fraud, unauthorized
                transactions, or security threats.
              </li>
            </ul>
            <h1 className="mb-4">5. Cookies and Tracking Technologies</h1>
            <p>
              We do not use tracking cookies or third-party tracking
              technologies such as Google Analytics or Facebook Pixel. However,
              we use session cookies or HTTP-only authentication cookies to
              manage user login sessions. These cookies are strictly for
              authentication and security purposes, ensuring users remain logged
              in without tracking their activity beyond the site itself.
            </p>
            <p>
              Additionally, some technical logs may be collected for security
              and operational purposes..
            </p>
            <h1 className="mb-4">6. Payment and Security Measures</h1>
            <ul>
              <li>
                We <b>only</b> support <b>manual bank transfers</b> for
                transactions
              </li>
              <li>
                We do <b>not</b> store sensitive payment information in our
                system permanently
              </li>
              <li>
                Any sensitive data stored (e.g., invoices, payment details) is
                <b>encrypted</b> in our database to ensure security
              </li>
              <li>
                We implement strict security measures to protect user accounts
                and prevent unauthorized access.
              </li>
            </ul>
            <h1 className="mb-4">7. User Rights & Data Deletion</h1>
            <p>
              We respect your rights regarding your personal data, and you have
              the following options:
            </p>
            <ul>
              <li>
                <b>Access and Update: </b> You can request access to your
                personal data and update your account details.
              </li>
              <li>
                <b>Account Deletion: </b>You may request to permanently delete
                your account and all associated data by contacting our support
                team.
              </li>
              <li>
                <b>Data Portability:</b> If required, you can request a copy of
                your data in a readable format
              </li>
            </ul>
            <p>
              To request any of these actions, please contact us at the details
              provided below.
            </p>
            <h1 className="mb-4">8. Contact & Support</h1>
            <p>
              If you have any questions or concerns about this Privacy Policy or
              your data, you can reach us through:
            </p>
            <ul>
              <li>
                <b>Email: </b>info@abaautoauctions.com
              </li>
              <li>
                <b>Phone Number:</b> +971 509496511
              </li>
              <li>
                <b>Website Contact Form:</b>
                <a style={{ fontSize: "11px" }}>
                  https://abaautoauctions.com/contact-us
                </a>
              </li>
            </ul>
            <p>We will respond to inquiries as soon as possible.</p>
            <h1 className="mb-4">9. Changes to This Privacy Policy</h1>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. Any updates will
              be posted on this page, and the effective date will be revised
              accordingly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacypolicy;
