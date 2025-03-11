import React from "react";
import { Container } from "react-bootstrap";

const LegalSections = () => {
  return (
    <Container className="mt-4">
      {/* Terms & Conditions Section */}
      <section className="mb-5">
        <h2 className="mb-3">Terms & Conditions</h2>
        <p>
          By using our service, you agree to comply with our terms and
          conditions. Users must not engage in activities that violate laws or
          disrupt our platform. Any misuse of our services may result in account
          suspension or termination.
        </p>
        <h4>Usage Restrictions</h4>
        <p>
          You agree not to use our service for illegal activities, spamming, or
          unauthorized access. Violation of these terms may lead to legal
          action.
        </p>
        <h4>Changes to Terms</h4>
        <p>
          We reserve the right to modify our terms and conditions at any time.
          Continued use of our service after updates means acceptance of the new
          terms.
        </p>
      </section>

      {/* Privacy Policy Section */}
      <section>
        <h2 className="mb-3">Privacy Policy</h2>
        <p>
          We are committed to protecting your privacy. This policy explains how
          we collect, use, and share your personal information.
        </p>
        <h4>Information Collection</h4>
        <p>
          We may collect personal information such as your email and name. We
          also track how you interact with our platform to improve user
          experience.
        </p>
        <h4>Information Sharing</h4>
        <p>
          We do not sell your data. However, we may share information with AI
          service providers such as OpenAI and Google, in compliance with their
          privacy policies.
        </p>
        <h4>Security</h4>
        <p>
          We take security seriously and implement measures to protect your data
          from unauthorized access.
        </p>
      </section>
    </Container>
  );
};

export default LegalSections;
