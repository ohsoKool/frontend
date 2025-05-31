import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    mobile_number: '',
    gender: '',
    joinedDate: ''
  });

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserProfile({
        name: userData.name || 'Not provided',
        email: userData.email || 'Not provided',
        mobile_number: userData.mobile_number || 'Not provided',
        gender: userData.gender || 'Not provided',
        joinedDate: userData.createdAt || new Date().toISOString()
      });
    } else {
      // If no user data, redirect to login
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="profile-container">
      <style>
        {`
          .profile-container {
            padding: 120px 20px 80px;
            background: #f8f9ff;
            min-height: 100vh;
          }

          .profile-card {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            padding: 40px;
          }

          .profile-header {
            text-align: center;
            margin-bottom: 40px;
          }

          .profile-avatar {
            width: 120px;
            height: 120px;
            border-radius: 60px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            color: white;
            font-size: 48px;
          }

          .profile-title {
            font-size: 2rem;
            color: #1f2937;
            margin-bottom: 10px;
            font-weight: 700;
          }

          .profile-subtitle {
            color: #6b7280;
            font-size: 1.1rem;
          }

          .profile-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
          }

          .info-group {
            margin-bottom: 20px;
          }

          .info-label {
            font-size: 0.9rem;
            color: #6b7280;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .info-value {
            font-size: 1.1rem;
            color: #1f2937;
            font-weight: 500;
          }

          .not-provided {
            color: #9ca3af;
            font-style: italic;
          }

          .logout-button {
            display: inline-block;
            padding: 12px 24px;
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-top: 30px;
          }

          .logout-button:hover {
            background: #dc2626;
            transform: translateY(-2px);
          }

          .logout-button:active {
            transform: translateY(0);
          }
        `}
      </style>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {userProfile.name ? userProfile.name[0].toUpperCase() : '👤'}
          </div>
          <h1 className="profile-title">{userProfile.name}</h1>
          <p className="profile-subtitle">
            Member since {new Date(userProfile.joinedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <div className="profile-info">
          <div>
            <div className="info-group">
              <div className="info-label">Email</div>
              <div className={`info-value ${userProfile.email === 'Not provided' ? 'not-provided' : ''}`}>
                {userProfile.email}
              </div>
            </div>
            <div className="info-group">
              <div className="info-label">Mobile Number</div>
              <div className={`info-value ${userProfile.mobile_number === 'Not provided' ? 'not-provided' : ''}`}>
                {userProfile.mobile_number}
              </div>
            </div>
          </div>
          <div>
            <div className="info-group">
              <div className="info-label">Gender</div>
              <div className={`info-value ${userProfile.gender === 'Not provided' ? 'not-provided' : ''}`}>
                {userProfile.gender}
              </div>
            </div>
            <div className="info-group">
              <div className="info-label">Account Status</div>
              <div className="info-value">Active</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="logout-button" onClick={handleLogout}>
            🚪 Sign Out
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile; 