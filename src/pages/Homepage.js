import { motion } from 'framer-motion';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './homepage.css';

import backgroundImage from '../images/background.webp';
import footerImage from '../images/footer.webp';
import meditationImage from '../images/meditation1.webp';
import therapyImage from '../images/thearpy.webp';

// Navbar Component
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md">
      <div className="container flex justify-between items-center py-6 px-8">
        <h1 className="logo text-4xl font-semibold tracking-wide">MindWell</h1>
        <ul className="nav-links flex space-x-8 text-lg">
          <li><a href="#about" className="hover:text-yellow-400 transition">About</a></li>
          <li><a href="#testimonials" className="hover:text-yellow-400 transition">Testimonials</a></li>
          <li><a href="#services" className="hover:text-yellow-400 transition">Services</a></li>
          <li><a href="#contact" className="hover:text-yellow-400 transition">Contact</a></li>
          <li><a href="#features" className="hover:text-yellow-400 transition">Features</a></li>
        </ul>
        <div className="auth-buttons flex space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-6 rounded-lg transition">Login</Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition">Logout</button>
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
    <section 
      className="hero bg-cover bg-center text-white py-40 px-8 flex flex-col justify-center items-center min-h-screen" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold text-center mb-6 leading-tight"
      >
        Unlock Your Mind’s Potential with MindWell
      </motion.h1>
      <p className="text-xl text-center mb-8 max-w-3xl mx-auto">Join a community that values mental well-being through mindfulness practices, therapy, and personal growth. Start your journey today.</p>
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        className="bg-yellow-500 text-black py-3 px-8 rounded-full text-lg font-semibold hover:bg-yellow-600 transition"
        onClick={() => navigate('/login')}
      >
        Get Started
      </motion.button>
    </section>
  );
};

// Features Section
const Features = () => (
  <section id="features" className="features py-24 bg-gray-100">
    <div className="container text-center">
      <h2 className="text-4xl font-bold mb-10 text-indigo-800">Features of MindWell</h2>
      <div className="flex flex-wrap justify-center gap-10">
        <FeatureCard title="Guided Meditation" description="Step-by-step guided sessions designed to ease you into mindfulness." />
        <FeatureCard title="Therapy & Counseling" description="Professional therapists available to guide you through your challenges." />
        <FeatureCard title="Community Support" description="Join a supportive community of individuals who share your goals." />
      </div>
    </div>
  </section>
);

// Feature Card Component
const FeatureCard = ({ title, description }) => (
  <div className="feature-card bg-white p-8 shadow-lg rounded-lg w-80">
    <h3 className="text-2xl font-semibold text-indigo-600 mb-4">{title}</h3>
    <p className="text-lg text-gray-700">{description}</p>
  </div>
);

// Testimonials Section
const Testimonials = () => (
  <section id="testimonials" className="testimonials py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
    <div className="container text-center text-white">
      <h2 className="text-4xl font-bold mb-10">What Our Users Are Saying</h2>
      <div className="flex flex-wrap justify-center gap-10">
        <TestimonialCard name="Sarah P." testimonial="MindWell has helped me regain my peace. The guided meditations are so soothing!" />
        <TestimonialCard name="John D." testimonial="I feel so much more grounded and mentally clear after starting therapy with MindWell." />
        <TestimonialCard name="Emily R." testimonial="The support community is a game-changer. It’s comforting to know others are on the same journey." />
      </div>
    </div>
  </section>
);

// Testimonial Card Component
const TestimonialCard = ({ name, testimonial }) => (
  <div className="testimonial-card bg-white p-8 shadow-lg rounded-lg w-80">
    <p className="text-lg italic text-gray-600 mb-4">"{testimonial}"</p>
    <p className="font-semibold text-xl">{name}</p>
    <p className="text-gray-500">User</p>
  </div>
);

// About Section
const About = () => (
  <section id="about" className="about py-24 bg-white">
    <h2 className="text-4xl text-center font-semibold text-indigo-800 mb-10">About Us</h2>
    <p className="text-lg text-center max-w-2xl mx-auto text-gray-700">
      MindWell is committed to providing accessible mental health resources. Our goal is to create a supportive and nurturing environment for individuals to thrive mentally, emotionally, and spiritually.
    </p>
  </section>
);

// Services Section
const Services = () => (
  <section id="services" className="services py-24 bg-gray-50">
    <h2 className="text-4xl text-center font-semibold text-indigo-800 mb-10">Our Services</h2>
    <div className="flex flex-wrap justify-center gap-10">
      <ServiceCard imgSrc={meditationImage} title="Meditation" description="Calm your mind and reduce stress with guided meditation." link="/services/meditation" />
      <ServiceCard imgSrc={therapyImage} title="Therapy Sessions" description="Get one-on-one therapy sessions to work through your emotions." link="/services/therapy-sessions" />
      <ServiceCard imgSrc="../images/meditation4.webp" title="Support Groups" description="Join a community of like-minded individuals to share your journey." link="/services/support-groups" />
    </div>
  </section>
);

// Service Card Component
const ServiceCard = ({ imgSrc, title, description, link }) => (
  <div className="service-card bg-white p-6 shadow-xl rounded-lg w-80">
    <img src={imgSrc} alt={title} className="w-full h-48 object-cover rounded-lg mb-6" />
    <h3 className="text-2xl font-semibold text-indigo-600 mb-4">{title}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <Link to={link} className="text-indigo-500 hover:underline">Learn More</Link>
  </div>
);

// Contact Section
const Contact = () => (
  <section id="contact" className="contact py-24 bg-white">
    <h2 className="text-4xl text-center font-semibold text-indigo-800 mb-10">Contact Us</h2>
    <p className="text-lg text-center max-w-2xl mx-auto text-gray-700 mb-10">We’d love to hear from you. Reach out with any questions or inquiries and we will get back to you as soon as possible.</p>
    <form className="max-w-xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
      <input type="text" placeholder="Your Name" required className="w-full p-4 mb-6 border border-gray-300 rounded-lg" />
      <input type="email" placeholder="Your Email" required className="w-full p-4 mb-6 border border-gray-300 rounded-lg" />
      <textarea placeholder="Your Message" required className="w-full p-4 mb-6 border border-gray-300 rounded-lg" rows="6"></textarea>
      <motion.button whileHover={{ scale: 1.05 }} className="bg-indigo-600 text-white py-3 px-8 rounded-full hover:bg-indigo-700 transition">
        Send Message
      </motion.button>
    </form>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-gray-800 text-white py-6 mt-12">
    <div className="container flex justify-between items-center">
      <div>&copy; 2025 MindWell. All rights reserved.</div>
      <div>
        <a href="/privacy-policy" className="text-white hover:underline mr-4">Privacy Policy</a>
        <a href="/terms-of-service" className="text-white hover:underline">Terms of Service</a>
      </div>
    </div>
    <div className="text-center mt-4">
      <img src={footerImage} alt="MindWell Logo" className="w-32 mx-auto" />
    </div>
  </footer>
);

// Main Page Component
const Homepage = () => (
  <div className="homepage">
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

export default Homepage;
