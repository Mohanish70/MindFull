import React from 'react';
import './BenefitsSection.css'; // Make sure you have the corresponding CSS for styling

const BenefitsSection = () => {
  return (
    <section id="benefits" className="benefits-section bg-gray-100 py-16">
      <div className="container text-center">
        <h2 className="text-4xl font-semibold mb-8">The Benefits of Meditation & Mental Health Care</h2>
        <p className="text-xl mb-12">Explore how mindfulness, therapy, and support can change your life for the better.</p>
        
        <div className="benefits-cards flex justify-around flex-wrap">
          <div className="benefit-card bg-white p-8 rounded-lg shadow-xl w-80 mb-6">
            <h3 className="text-2xl font-semibold mb-4">Reduce Stress</h3>
            <p className="text-lg text-gray-700">Meditation is an effective technique to lower stress levels and calm the mind, helping you deal with daily pressures.</p>
          </div>

          <div className="benefit-card bg-white p-8 rounded-lg shadow-xl w-80 mb-6">
            <h3 className="text-2xl font-semibold mb-4">Boost Focus</h3>
            <p className="text-lg text-gray-700">Practicing mindfulness helps sharpen your focus, which improves productivity and mental clarity.</p>
          </div>

          <div className="benefit-card bg-white p-8 rounded-lg shadow-xl w-80 mb-6">
            <h3 className="text-2xl font-semibold mb-4">Enhance Emotional Well-being</h3>
            <p className="text-lg text-gray-700">Meditation enhances emotional stability, reduces anxiety and depression, and improves overall emotional health.</p>
          </div>

          <div className="benefit-card bg-white p-8 rounded-lg shadow-xl w-80 mb-6">
            <h3 className="text-2xl font-semibold mb-4">Better Sleep</h3>
            <p className="text-lg text-gray-700">Calming the mind through mindfulness and meditation leads to better sleep quality and restful nights.</p>
          </div>
        </div>

        <div className="cta mt-12">
          <a href="#services" className="bg-yellow-500 text-black py-3 px-8 rounded-lg text-lg font-semibold hover:bg-yellow-600">Explore More Benefits</a>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
