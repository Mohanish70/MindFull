import { motion } from 'framer-motion';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './homepage.css';

// Navbar Component
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center py-4 px-8">
        <h1 className="logo text-3xl font-bold text-white">MindWell</h1>
        <ul className="nav-links flex space-x-6">
          <li><a href="#about" className="text-white">About</a></li>
          <li><a href="#services" className="text-white">Services</a></li>
          <li><a href="#contact" className="text-white">Contact</a></li>
          <li><a href="#features" className="text-white">Features</a></li>
        </ul>
        <div className="auth-buttons">
          {!user ? (
            <Link to="/login" className="button bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-6 rounded-full">Login</Link>
          ) : (
            <button onClick={handleLogout} className="button bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-center"
      >
        Enhance Your Mental Well-Being with MindWell 
      </motion.h1>
      <p className="text-xl mt-4 text-center">Join thousands of people enhancing their mental well-being through mindfulness and self-care.</p>
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        className="mt-6 bg-yellow-500 text-black py-3 px-6 rounded-full text-lg font-semibold hover:bg-yellow-600"
        onClick={() => navigate('/login')}
      >
        Get Started
      </motion.button>
    </section>
  );
};

// Features Section
const Features = () => (
  <section id="features" className="features py-16 bg-gray-100">
    <div className="container text-center">
      <h2 className="text-3xl font-bold mb-8">Features of MindWell</h2>
      <div className="flex justify-around flex-wrap">
        <div className="feature-card p-6 bg-white shadow-lg rounded-lg w-80 mb-6">
          <h3 className="text-2xl font-semibold mb-4">Guided Meditation</h3>
          <p className="text-lg text-gray-700">Step-by-step guided sessions for beginners and experienced meditators.</p>
        </div>
        <div className="feature-card p-6 bg-white shadow-lg rounded-lg w-80 mb-6">
          <h3 className="text-2xl font-semibold mb-4">Therapy & Counseling</h3>
          <p className="text-lg text-gray-700">Access to professional therapists for one-on-one support and guidance.</p>
        </div>
        <div className="feature-card p-6 bg-white shadow-lg rounded-lg w-80 mb-6">
          <h3 className="text-2xl font-semibold mb-4">Community Support</h3>
          <p className="text-lg text-gray-700">Join our community of like-minded individuals for group support and discussions.</p>
        </div>
      </div>
    </div>
  </section>
);

// Testimonials Section
const Testimonials = () => (
  <section id="testimonials" className="testimonials py-16 bg-blue-50">
    <div className="container text-center">
      <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
      <div className="flex justify-around flex-wrap">
        <div className="testimonial-card bg-white p-6 shadow-lg rounded-lg w-80 mb-6">
          <p className="text-lg text-gray-700 mb-4">"MindWell has helped me regain control of my mental health. The meditation sessions have been a game-changer!"</p>
          <p className="font-semibold text-xl">Sarah P.</p>
          <p className="text-gray-500">User</p>
        </div>
        <div className="testimonial-card bg-white p-6 shadow-lg rounded-lg w-80 mb-6">
          <p className="text-lg text-gray-700 mb-4">"I never knew how much my mental health could improve until I joined MindWell. The therapy sessions are incredibly helpful."</p>
          <p className="font-semibold text-xl">John D.</p>
          <p className="text-gray-500">User</p>
        </div>
        <div className="testimonial-card bg-white p-6 shadow-lg rounded-lg w-80 mb-6">
          <p className="text-lg text-gray-700 mb-4">"The sense of community here is amazing. It's comforting to know I'm not alone in my journey."</p>
          <p className="font-semibold text-xl">Emily R.</p>
          <p className="text-gray-500">User</p>
        </div>
      </div>
    </div>
  </section>
);

// About Section
const About = () => (
  <section id="about" className="about py-16">
    <h2 className="text-3xl text-center font-semibold mb-6">About Us</h2>
    <p className="text-xl text-center max-w-2xl mx-auto">
      MindWell is committed to providing accessible mental health resources. Our goal is to create a supportive environment for individuals to thrive in all aspects of life, mentally and emotionally. 
    </p>
  </section>
);

// Services Section
const Services = () => (
  <section id="services" className="services py-16 bg-gray-200">
    <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
    <div className="flex justify-around flex-wrap">
      <div className="service-card bg-white p-6 shadow-lg rounded-lg w-80 mb-6">
        <img src="https://via.placeholder.com/400x300.png?text=Meditation" alt="Meditation" />
        <h3 className="text-2xl font-semibold mb-4">Meditation</h3>
        <p>Relax your mind and find peace.</p>
        <Link to="/services/meditation" className="text-blue-500 hover:underline">Learn More</Link>
      </div>
      <div className="service-card bg-white p-6 shadow-lg rounded-lg w-80 mb-6">
        <img src="https://via.placeholder.com/400x300.png?text=Therapy+Sessions" alt="Therapy Sessions" />
        <h3 className="text-2xl font-semibold mb-4">Therapy Sessions</h3>
        <p>One-on-one therapy for mental clarity.</p>
        <Link to="/services/therapy-sessions" className="text-blue-500 hover:underline">Learn More</Link>
      </div>
      <div className="service-card bg-white p-6 shadow-lg rounded-lg w-80 mb-6">
        <img src="https://via.placeholder.com/400x300.png?text=Support+Groups" alt="Support Groups" />
        <h3 className="text-2xl font-semibold mb-4">Support Groups</h3>
        <p>Join a supportive community.</p>
        <Link to="/services/support-groups" className="text-blue-500 hover:underline">Learn More</Link>
      </div>
    </div>
  </section>
);

// Contact Section
const Contact = () => (
  <section id="contact" className="contact py-16 bg-white">
    <h2 className="text-3xl text-center font-semibold mb-6">Contact Us</h2>
    <p className="text-xl text-center mb-8">We’re here to help. Feel free to reach out with any questions or inquiries.</p>
    <form className="max-w-xl mx-auto">
      <input type="text" placeholder="Your Name" required className="w-full p-4 mb-4 border border-gray-300 rounded-lg"/>
      <input type="email" placeholder="Your Email" required className="w-full p-4 mb-4 border border-gray-300 rounded-lg"/>
      <textarea placeholder="Your Message" required className="w-full p-4 mb-4 border border-gray-300 rounded-lg"></textarea>
      <motion.button whileHover={{ scale: 1.05 }} className="send-btn bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600">
        Send Message
      </motion.button>
    </form>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-gray-800 text-white py-6">
    <div className="container flex justify-between items-center">
      <p>&copy; 2025 MindWell. All rights reserved.</p>
      <ul className="footer-links flex space-x-4">
        <li><a href="#about" className="text-white">About</a></li>
        <li><a href="#services" className="text-white">Services</a></li>
        <li><a href="#contact" className="text-white">Contact</a></li>
      </ul>
    </div>
  </footer>
);

// Main HomePage Component
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <About />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
