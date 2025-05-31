import React from 'react';
import Footer from './components/Footer';

const Internships = () => {
  return (
    <div className="internships-container">
      <style>
        {`
          .internships-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: linear-gradient(135deg, #f8f9ff 0%, #e5e7ff 100%);
          }

          .loading-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            text-align: center;
            margin-top: 60px;
          }

          .logo-container {
            width: 150px;
            height: 150px;
            margin-bottom: 2rem;
            opacity: 0;
            animation: fadeInAndPulse 3s ease-in-out infinite;
          }

          .logo-container img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .opportunities-text {
            font-size: 4.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
            font-family: 'Clash Display', sans-serif;
            opacity: 0;
            animation: fadeInUp 1s ease forwards;
          }

          .loading-text {
            font-size: 5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 2rem;
            font-family: 'Clash Display', sans-serif;
            opacity: 0;
            animation: fadeInUp 1s ease forwards 0.3s;
          }

          .subtitle-text {
            font-size: 2rem;
            color: #6b7280;
            margin-bottom: 2rem;
            opacity: 0;
            animation: fadeInUp 1s ease forwards 0.6s;
          }

          .loading-dots {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
          }

          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            animation: bounce 1.4s infinite ease-in-out;
          }

          .dot:nth-child(1) { animation-delay: -0.32s; }
          .dot:nth-child(2) { animation-delay: -0.16s; }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInAndPulse {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes bounce {
            0%, 80%, 100% { 
              transform: scale(0);
            } 
            40% { 
              transform: scale(1);
            }
          }

          @media (max-width: 768px) {
            .logo-container {
              width: 120px;
              height: 120px;
            }
            .opportunities-text {
              font-size: 3rem;
            }
            .loading-text {
              font-size: 3.5rem;
            }
            .subtitle-text {
              font-size: 1.5rem;
            }
          }

          @media (max-width: 480px) {
            .logo-container {
              width: 100px;
              height: 100px;
            }
            .opportunities-text {
              font-size: 2.5rem;
            }
            .loading-text {
              font-size: 3rem;
            }
            .subtitle-text {
              font-size: 1.25rem;
            }
          }
        `}
      </style>

      <div className="loading-section">
        <div className="logo-container">
          <img src="./public/photos/1.png" alt="TLS Logo" />
        </div>
        <h1 className="opportunities-text">Opportunities</h1>
        <h1 className="loading-text">Loading...</h1>
        <h2 className="subtitle-text">Internship Applications Opening Soon!</h2>
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Internships; 