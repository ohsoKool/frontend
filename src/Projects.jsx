import React from 'react';
import Footer from './components/Footer';

const Projects = () => {
  const projectCategories = [
    {
      title: "Web Development",
      icon: "🌐",
      projects: [
        {
          name: "E-Commerce Platform",
          description: "Build a full-stack e-commerce platform with React and Node.js",
          difficulty: "Advanced",
          duration: "4-6 weeks",
          technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"]
        },
        {
          name: "Social Media Dashboard",
          description: "Create a responsive social media analytics dashboard",
          difficulty: "Intermediate",
          duration: "2-3 weeks",
          technologies: ["React", "Chart.js", "Material-UI", "REST APIs"]
        }
      ]
    },
    {
      title: "Mobile Development",
      icon: "📱",
      projects: [
        {
          name: "Fitness Tracking App",
          description: "Develop a mobile app for tracking workouts and nutrition",
          difficulty: "Intermediate",
          duration: "3-4 weeks",
          technologies: ["React Native", "Firebase", "Redux", "Native APIs"]
        },
        {
          name: "Travel Companion",
          description: "Build a travel planning and itinerary management app",
          difficulty: "Advanced",
          duration: "4-5 weeks",
          technologies: ["React Native", "Google Maps API", "Node.js", "MongoDB"]
        }
      ]
    },
    {
      title: "Machine Learning",
      icon: "🤖",
      projects: [
        {
          name: "Image Recognition System",
          description: "Create an AI model for image classification and recognition",
          difficulty: "Advanced",
          duration: "5-6 weeks",
          technologies: ["Python", "TensorFlow", "OpenCV", "NumPy"]
        },
        {
          name: "Sentiment Analysis Tool",
          description: "Build a tool for analyzing sentiment in text data",
          difficulty: "Intermediate",
          duration: "2-3 weeks",
          technologies: ["Python", "NLTK", "scikit-learn", "Flask"]
        }
      ]
    }
  ];

  const difficultyColors = {
    "Beginner": "#10b981",
    "Intermediate": "#6366f1",
    "Advanced": "#ef4444"
  };

  return (
    <div className="projects-container">
      <style>
        {`
          .projects-container {
            padding: 80px 20px;
            background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
            min-height: 100vh;
          }

          .projects-header {
            text-align: center;
            margin-bottom: 60px;
            animation: fadeIn 1s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .projects-title {
            font-size: 2.5rem;
            color: #1f2937;
            margin-bottom: 20px;
            font-weight: 700;
          }

          .projects-subtitle {
            color: #6b7280;
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto;
          }

          .category-section {
            max-width: 1200px;
            margin: 0 auto 4rem auto;
          }

          .category-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            padding: 0 1rem;
          }

          .category-icon {
            font-size: 2rem;
          }

          .category-title {
            font-size: 1.8rem;
            color: #1f2937;
            font-weight: 600;
          }

          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 0 1rem;
          }

          .project-card {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            animation: slideIn 0.5s ease-out;
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
          }

          .project-name {
            font-size: 1.4rem;
            color: #1f2937;
            margin-bottom: 1rem;
            font-weight: 600;
          }

          .project-description {
            color: #6b7280;
            margin-bottom: 1.5rem;
            line-height: 1.6;
          }

          .project-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .meta-item {
            background: #f3f4f6;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            color: #4b5563;
          }

          .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .tech-tag {
            background: #f3f4f6;
            color: #4b5563;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            transition: all 0.2s ease;
          }

          .tech-tag:hover {
            background: #e5e7eb;
            transform: scale(1.05);
          }

          .difficulty-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.875rem;
            font-weight: 500;
            color: white;
          }
        `}
      </style>

      <div className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-subtitle">
          Build real-world projects to enhance your portfolio and master new technologies
        </p>
      </div>

      {projectCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="category-section">
          <div className="category-header">
            <span className="category-icon">{category.icon}</span>
            <h2 className="category-title">{category.title}</h2>
          </div>
          <div className="projects-grid">
            {category.projects.map((project, projectIndex) => (
              <div 
                key={projectIndex} 
                className="project-card"
                style={{ animationDelay: `${(categoryIndex * 0.2) + (projectIndex * 0.1)}s` }}
              >
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-meta">
                  <span 
                    className="difficulty-badge" 
                    style={{ background: difficultyColors[project.difficulty] }}
                  >
                    {project.difficulty}
                  </span>
                  <span className="meta-item">⏱️ {project.duration}</span>
                </div>
                <div className="tech-stack">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <Footer />
    </div>
  );
};

export default Projects; 