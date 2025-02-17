import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-8">Features of MindWell</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Guided Meditation</h3>
            <p>Step-by-step guided sessions for beginners and experienced meditators.</p>
          </div>
          <div className="feature-card bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Therapy & Counseling</h3>
            <p>Access to professional therapists for one-on-one support and guidance.</p>
          </div>
          <div className="feature-card bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Community Support</h3>
            <p>Join our community of like-minded individuals for group support and discussions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
