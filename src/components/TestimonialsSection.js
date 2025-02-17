import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="bg-gray-200 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-8">What Our Users Say</h2>
        <div className="flex justify-center space-x-8">
          <div className="testimonial-card bg-white p-8 rounded-lg shadow-xl w-80">
            <p className="text-lg italic mb-4">"MindWell has helped me regain control of my mental health. The meditation sessions have been a game-changer!"</p>
            <p className="font-semibold">Sarah P.</p>
            <p className="text-gray-600">User</p>
          </div>
          <div className="testimonial-card bg-white p-8 rounded-lg shadow-xl w-80">
            <p className="text-lg italic mb-4">"I never knew how much my mental health could improve until I joined MindWell. The therapy sessions are incredibly helpful."</p>
            <p className="font-semibold">John D.</p>
            <p className="text-gray-600">User</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
