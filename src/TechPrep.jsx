import React from 'react';

const TechPrep = () => {
  const techPrepItems = [
    {
      title: "Data Structures & Algorithms",
      description: "Master fundamental DSA concepts and problem-solving techniques",
      icon: "fas fa-code",
    },
    {
      title: "System Design",
      description: "Learn how to design scalable and efficient systems",
      icon: "fas fa-sitemap",
    },
    {
      title: "Programming Languages",
      description: "Deep dive into popular programming languages and their concepts",
      icon: "fas fa-laptop-code",
    },
    {
      title: "Database Management",
      description: "Understanding database design and optimization",
      icon: "fas fa-database",
    },
    {
      title: "Web Technologies",
      description: "Modern web development frameworks and best practices",
      icon: "fas fa-globe",
    },
    {
      title: "Operating Systems",
      description: "Core concepts of operating systems and computer architecture",
      icon: "fas fa-microchip",
    },
  ];

  return (
    <div className="tech-prep-container">
      <style>
        {`
          .tech-prep-container {
            padding: 80px 20px;
            background: #f8f9ff;
            min-height: 100vh;
          }

          .tech-prep-header {
            text-align: center;
            margin-bottom: 60px;
          }

          .tech-prep-title {
            font-size: 2.5rem;
            color: #1f2937;
            margin-bottom: 20px;
            font-weight: 700;
          }

          .tech-prep-subtitle {
            color: #6b7280;
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto;
          }

          .tech-prep-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .tech-prep-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
          }

          .tech-prep-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          }

          .card-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
          }

          .card-icon i {
            color: white;
            font-size: 1.5rem;
          }

          .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 10px;
          }

          .card-description {
            color: #6b7280;
            font-size: 1rem;
            line-height: 1.5;
          }
        `}
      </style>

      <div className="tech-prep-header">
        <h1 className="tech-prep-title">Technical Preparation Resources</h1>
        <p className="tech-prep-subtitle">
          Comprehensive resources to help you prepare for technical interviews and advance your programming skills
        </p>
      </div>

      <div className="tech-prep-grid">
        {techPrepItems.map((item, index) => (
          <div key={index} className="tech-prep-card">
            <div className="card-icon">
              <i className={item.icon}></i>
            </div>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechPrep; 