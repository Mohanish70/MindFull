import { motion } from 'framer-motion';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './homepage.css';

// Import images
import backgroundImage from '../images/background.webp';
import footerImage from '../images/footer.webp';
import meditationImage from '../images/meditation1.webp';
import therapyImage from '../images/thearpy.webp';
import communityImage from '../images/community.webp';
import feature1 from '../images/feature1.webp';
import feature2 from '../images/feature2.webp';
import feature3 from '../images/feature3.webp';
import testimonial1 from '../images/testimonial1.webp';
import testimonial2 from '../images/testimonial2.webp';
import testimonial3 from '../images/testimonial3.webp';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">MindWell</Link>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="auth-buttons">
          {user ? (
            <button onClick={handleLogout} className="btn logout-btn">Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/register" className="btn register-btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ user }) => {
  const navigate = useNavigate();

  return (
    <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` }}>
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Your Journey to Mental Wellness Starts Here</h1>
        <p>Join thousands who have transformed their mental health with our guided programs and professional support</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="cta-btn"
          onClick={() => navigate(user ? '/dashboard' : '/register')}
        >
          {user ? 'Go to Dashboard' : 'Get Started'}
        </motion.button>
      </motion.div>
    </section>
  );
};

const FeatureCard = ({ image, title, description }) => (
  <motion.div 
    className="feature-card"
    whileHover={{ y: -10 }}
  >
    <div className="feature-image-container">
      <img src={image} alt={title} className="feature-image" />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </motion.div>
);

const Features = () => (
  <section id="features" className="section features-section">
    <div className="section-container">
      <h2>Our Key Features</h2>
      <p className="section-subtitle">Everything you need for your mental wellness journey</p>
      <div className="features-grid">
        <FeatureCard 
          image={feature1} 
          title="Guided Meditation" 
          description="Daily guided sessions for all experience levels" 
        />
        <FeatureCard 
          image={feature2} 
          title="Therapy Sessions" 
          description="Professional therapists available 24/7" 
        />
        <FeatureCard 
          image={feature3} 
          title="Community Support" 
          description="Connect with others on similar journeys" 
        />
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ image, quote, name, role }) => (
  <div className="testimonial-card">
    <div className="testimonial-image-container">
      <img src={image} alt={name} className="testimonial-image" />
    </div>
    <p className="testimonial-quote">"{quote}"</p>
    <div className="testimonial-author">
      <h4>{name}</h4>
      <p>{role}</p>
    </div>
  </div>
);

const Testimonials = () => (
  <section id="testimonials" className="section testimonials-section">
    <div className="section-container">
      <h2>What Our Community Says</h2>
      <p className="section-subtitle">Real stories from real people</p>
      <div className="testimonials-grid">
        <TestimonialCard 
          image={testimonial1} 
          quote="MindWell changed my life. The daily meditations helped me manage my anxiety." 
          name="Sarah J." 
          role="Member since 2024" 
        />
        <TestimonialCard 
          image={testimonial2} 
          quote="The therapy sessions gave me tools I use every day to stay balanced." 
          name="Michael T." 
          role="Member since 2023" 
        />
        <TestimonialCard 
          image={testimonial3} 
          quote="The community support is incredible. I never feel alone in my journey." 
          name="Emma R." 
          role="Member since 2025" 
        />
      </div>
    </div>
  </section>
);

const ServiceCard = ({ image, title, description, link }) => (
  <motion.div 
    className="service-card"
    whileHover={{ scale: 1.03 }}
  >
    <div className="service-image-container">
      <img src={image} alt={title} className="service-image" />
    </div>
    <div className="service-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link} className="service-link">Learn More →</Link>
    </div>
  </motion.div>
);

const Services = () => (
  <section id="services" className="section services-section">
    <div className="section-container">
      <h2>Our Services</h2>
      <p className="section-subtitle">Personalized mental health support</p>
      <div className="services-grid">
        <ServiceCard 
          image={meditationImage} 
          title="Meditation Programs" 
          description="From beginner to advanced, find your perfect meditation path" 
          link="/services/meditation" 
        />
        <ServiceCard 
          image={therapyImage} 
          title="Therapy & Counseling" 
          description="Licensed professionals for individual needs" 
          link="/services/therapy" 
        />
        <ServiceCard 
          image={communityImage} 
          title="Support Groups" 
          description="Safe spaces to share and grow together" 
          link="/services/community" 
        />
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="section contact-section">
    <div className="section-container">
      <h2>Get In Touch</h2>
      <p className="section-subtitle">We're here to help with any questions</p>
      <form className="contact-form">
        <div className="form-group">
          <input type="text" placeholder="Your Name" required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Your Email" required />
        </div>
        <div className="form-group">
          <textarea placeholder="Your Message" required rows="5"></textarea>
        </div>
        <motion.button 
          type="submit"
          whileHover={{ scale: 1.05 }}
          className="submit-btn"
        >
          Send Message
        </motion.button>
      </form>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-logo">
        <img src={footerImage} alt="MindWell Logo" />
        <h3>MindWell</h3>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h4>Company</h4>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#testimonials">Testimonials</a>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
          <a href="/help">Help Center</a>
        </div>
        <div className="footer-column">
          <h4>Legal</h4>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/cookies">Cookie Policy</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2025 MindWell. All rights reserved.</p>
    </div>
  </footer>
);

const Homepage = () => {
  const { user } = useAuth();

  return (
    <div className="homepage">
      <Navbar />
      <Hero user={user} />
      <Features />
      <Testimonials />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default Homepage;