import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import CodingExercises from './components/CodingExercises';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Bootstrap CSS CDN */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
        rel="stylesheet" 
      />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9ff;
          }
          
          /* Navbar Styles */
          .custom-navbar {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            padding: 15px 0;
            box-shadow: 0 2px 20px rgba(99, 102, 241, 0.15);
          }
          
          .navbar-brand {
            display: flex;
            align-items: center;
            color: white !important;
            font-weight: 700;
            font-size: 1.5rem;
            text-decoration: none;
          }
          
          .navbar-brand:hover {
            color: white !important;
          }
          
          .brand-icon {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            font-size: 1.2rem;
            color: white;
          }
          
          .nav-links {
            display: flex;
            align-items: center;
            gap: 40px;
            margin: 0;
            padding: 0;
            list-style: none;
          }
          
          .nav-link-item {
            color: rgba(255, 255, 255, 0.9) !important;
            text-decoration: none;
            font-weight: 500;
            font-size: 1rem;
            transition: all 0.3s ease;
            position: relative;
          }
          
          .nav-link-item:hover {
            color: white !important;
            transform: translateY(-2px);
          }
          
          .nav-link-item::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -5px;
            left: 50%;
            background: white;
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }
          
          .nav-link-item:hover::after {
            width: 100%;
          }
          
          .contact-btn {
            background: white;
            color: #6366f1 !important;
            padding: 10px 25px;
            border-radius: 25px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
          }
          
          .contact-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
            color: #6366f1 !important;
          }
          
          /* Mobile menu toggle */
          .mobile-toggle {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
          }
          
          /* Hero Section */
          .hero-section {
            background: linear-gradient(135deg, #f8f9ff 0%, #e5e7ff 100%);
            min-height: 100vh;
            padding: 120px 0 80px;
            position: relative;
            overflow: hidden;
          }
          
          .hero-content {
            display: flex;
            align-items: center;
            min-height: 70vh;
          }
          
          .hero-text {
            flex: 1;
            padding-right: 60px;
          }
          
          .hero-title {
            font-size: 4rem;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 30px;
            color: #1f2937;
          }
          
          .hero-highlight {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .hero-description {
            font-size: 1.25rem;
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 40px;
            max-width: 500px;
          }
          
          .hero-buttons {
            display: flex;
            gap: 20px;
            align-items: center;
          }
          
          .btn-primary-custom {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border: none;
            color: white;
            padding: 15px 35px;
            border-radius: 30px;
            font-weight: 600;
            font-size: 1.1rem;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
          }
          
          .btn-primary-custom:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
            color: white;
          }
          
          .btn-secondary-custom {
            background: transparent;
            border: 2px solid #6366f1;
            color: #6366f1;
            padding: 13px 35px;
            border-radius: 30px;
            font-weight: 600;
            font-size: 1.1rem;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
          }
          
          .btn-secondary-custom:hover {
            background: #6366f1;
            color: white;
            transform: translateY(-3px);
          }
          
          .hero-visual {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          
          .visual-container {
            width: 400px;
            height: 300px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border-radius: 20px;
            position: relative;
            box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
            overflow: hidden;
          }
          
          .code-window {
            position: absolute;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          
          .window-1 {
            top: 30px;
            left: 30px;
            width: 200px;
            height: 80px;
            z-index: 3;
          }
          
          .window-2 {
            top: 80px;
            right: 20px;
            width: 180px;
            height: 100px;
            z-index: 2;
            background: rgba(255, 255, 255, 0.95);
          }
          
          .window-3 {
            bottom: 40px;
            left: 50px;
            width: 160px;
            height: 60px;
            z-index: 1;
            background: rgba(255, 255, 255, 0.9);
          }
          
          .code-line {
            height: 8px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            border-radius: 4px;
            margin: 8px 0;
            opacity: 0.8;
          }
          
          .code-line.short {
            width: 60%;
          }
          
          .code-line.medium {
            width: 80%;
          }
          
          .code-line.long {
            width: 100%;
          }
          
          /* Floating animation */
          .floating {
            animation: floating 6s ease-in-out infinite;
          }
          
          @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .floating-delayed {
            animation: floating 6s ease-in-out infinite;
            animation-delay: -2s;
          }
          
          .floating-delayed-2 {
            animation: floating 6s ease-in-out infinite;
            animation-delay: -4s;
          }
          
          /* Responsive Design */
          @media (max-width: 992px) {
            .nav-links {
              display: none;
            }
            
            .mobile-toggle {
              display: block;
            }
            
            .hero-content {
              flex-direction: column;
              text-align: center;
            }
            
            .hero-text {
              padding-right: 0;
              margin-bottom: 50px;
            }
            
            .hero-title {
              font-size: 3rem;
            }
            
            .visual-container {
              width: 350px;
              height: 250px;
            }
          }
          
          @media (max-width: 768px) {
            .hero-title {
              font-size: 2.5rem;
            }
            
            .hero-buttons {
              flex-direction: column;
              align-items: stretch;
            }
            
            .visual-container {
              width: 300px;
              height: 200px;
            }
            
            .window-1, .window-2, .window-3 {
              width: 120px;
              height: 60px;
            }
          }
          
          /* Mobile menu */
          .mobile-menu {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            z-index: 1000;
            padding: 80px 20px 20px;
          }
          
          .mobile-menu.active {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            gap: 30px;
          }
          
          .mobile-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
          }
          
          .mobile-menu .nav-link-item {
            font-size: 1.5rem;
            color: white !important;
          }
        `}
      </style>

      {/* Navigation */}
      <nav className="custom-navbar fixed-top">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <a href="https://techlearnsolutions.com/" className="navbar-brand" target="_blank" rel="noopener noreferrer">
              <div className="brand-icon" style={{ width: '30px', height: '30px', background: 'transparent' }}>
                <img src="./public/photos/1.png" alt="TLS Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              TechLearn Solutions
            </a>
            
            <ul className="nav-links">
              <li><Link to="/tech-prep" className="nav-link-item">TechPrep</Link></li>
              <li><Link to="/design-lab" className="nav-link-item">DesignLab</Link></li>
              <li><Link to="/internships" className="nav-link-item">Internships</Link></li>
              <li><Link to="/projects" className="nav-link-item">Projects</Link></li>
              <li><Link to="/profile" className="nav-link-item">Profile</Link></li>
            </ul>
            
            <button 
              className="mobile-toggle"
              onClick={() => setIsMenuOpen(true)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <button 
          className="mobile-close"
          onClick={() => setIsMenuOpen(false)}
        >
          <i className="fas fa-times"></i>
        </button>
        <Link to="/tech-prep" className="nav-link-item" onClick={() => setIsMenuOpen(false)}>TechPrep</Link>
        <Link to="/design-lab" className="nav-link-item" onClick={() => setIsMenuOpen(false)}>DesignLab</Link>
        <Link to="/internships" className="nav-link-item" onClick={() => setIsMenuOpen(false)}>Internships</Link>
        <Link to="/projects" className="nav-link-item" onClick={() => setIsMenuOpen(false)}>Projects</Link>
        <Link to="/profile" className="nav-link-item" onClick={() => setIsMenuOpen(false)}>Profile</Link>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Empower Your <span className="hero-highlight">Tech Journey</span> With Us
              </h1>
              <p className="hero-description">
                Comprehensive learning solutions for students and professionals. Enhance your skills with our specialized programs in software development, design, and more.
              </p>
              <div className="hero-buttons">
                <a href="https://techlearnsolutions.com/#programs" className="btn-primary-custom" target="_blank" rel="noopener noreferrer">Explore Programs</a>
                <a href="https://techlearnsolutions.com/#start" className="btn-secondary-custom" target="_blank" rel="noopener noreferrer">Get Started</a>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="visual-container">
                <div className="code-window window-1 floating">
                  <div className="code-line short"></div>
                  <div className="code-line medium"></div>
                  <div className="code-line long"></div>
                </div>
                <div className="code-window window-2 floating-delayed">
                  <div className="code-line medium"></div>
                  <div className="code-line short"></div>
                  <div className="code-line long"></div>
                  <div className="code-line medium"></div>
                </div>
                <div className="code-window window-3 floating-delayed-2">
                  <div className="code-line long"></div>
                  <div className="code-line short"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coding Exercises Section */}
      <CodingExercises />

      <Footer />
    </div>
  );
};

export default Home;