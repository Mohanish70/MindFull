import React, { useEffect, useState } from 'react';
import './DailyTip.css';

const DailyTip = () => {
  const [tip, setTip] = useState('');

  // Dummy tips data, this could be replaced by API data or dynamic content
  const tips = [
    "Take 5 minutes to practice deep breathing and relax.",
    "Start your day with gratitude—write down 3 things you're grateful for.",
    "Go for a walk in nature to clear your mind and boost your mood.",
    "Practice mindfulness for 10 minutes today. Focus on the present moment.",
    "Set aside time each day for something you love, even if it's just 15 minutes."
  ];

  // Randomly select a tip for today
  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  return (
    <section id="daily-tip" className="daily-tip bg-blue-500 text-white py-12">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-6">Daily Mental Health Tip</h2>
        <p className="text-xl mb-6">{tip}</p>
        <a href="#services" className="bg-yellow-500 text-black py-3 px-6 rounded-full text-lg font-semibold hover:bg-yellow-600">
          Learn More Tips
        </a>
      </div>
    </section>
  );
};

export default DailyTip;
