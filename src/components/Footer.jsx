import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <style>
        {`
          .footer {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 60px 0 30px;
            margin-top: 80px;
          }

          .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
          }

          .footer-column {
            padding: 0 15px;
          }

          .footer-logo {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }

          .footer-logo img {
            height: 50px;
            margin-right: 15px;
          }

          .footer-logo-text {
            font-size: 1.5rem;
            font-weight: 700;
          }

          .footer-description {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 25px;
            line-height: 1.6;
          }

          .social-links {
            display: flex;
            gap: 15px;
          }

          .social-links a {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: all 0.3s ease;
          }

          .social-links a:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-3px);
          }

          .footer-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: white;
          }

          .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .footer-links li {
            margin-bottom: 12px;
          }

          .footer-links a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s ease;
          }

          .footer-links a:hover {
            color: white;
            padding-left: 5px;
          }

          .contact-info {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .contact-info li {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            margin-bottom: 15px;
            color: rgba(255, 255, 255, 0.8);
          }

          .contact-info i {
            margin-top: 5px;
          }

          @media (max-width: 768px) {
            .footer-content {
              grid-template-columns: 1fr;
            }

            .footer-column {
              text-align: center;
            }

            .footer-logo {
              justify-content: center;
            }

            .social-links {
              justify-content: center;
            }

            .contact-info li {
              justify-content: center;
            }
          }
        `}
      </style>

      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <div className="footer-logo">
              <img src="./public/photos/1.png" alt="TLS Logo" style={{ height: '35px', marginRight: '15px', objectFit: 'contain' }} />
              <a href="https://techlearnsolutions.com/" className="footer-logo-text" style={{ color: 'white', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                TechLearn Solutions
              </a>
            </div>
            <p className="footer-description">
              Empowering the next generation of tech professionals with quality education and hands-on training.
            </p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Programs</h3>
            <ul className="footer-links">
              <li><Link to="/tech-prep">TechPrep</Link></li>
              <li><Link to="/design-lab">DesignLab</Link></li>
              <li><Link to="/internships">Summer Internship</Link></li>
              <li><Link to="/projects">Projects</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Tutorials</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="contact-info">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Hyderabad,Telangana,India</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>+91 98765 43210</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>info@techlearnsolutions.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 