import React from 'react';
import Footer from './components/Footer';

const DesignLab = () => {
  const designTools = [
    {
      title: "UI Design Fundamentals",
      icon: "🎨",
      description: "Master color theory, typography, layout principles, and visual hierarchy",
      topics: ["Color Theory", "Typography", "Grid Systems", "Visual Hierarchy"]
    },
    {
      title: "Design Tools Mastery",
      icon: "⚡",
      description: "Learn industry-standard design tools and workflows",
      topics: ["Figma", "Adobe XD", "Sketch", "Prototyping"]
    },
    {
      title: "Responsive Design",
      icon: "📱",
      description: "Create designs that work seamlessly across all devices",
      topics: ["Mobile First", "Breakpoints", "Fluid Typography", "Adaptive Layouts"]
    },
    {
      title: "Design Systems",
      icon: "🔄",
      description: "Build and maintain scalable design systems",
      topics: ["Component Libraries", "Style Guides", "Documentation", "Version Control"]
    }
  ];

  const resources = [
    {
      title: "Design Inspiration",
      links: [
        { name: "Dribbble", url: "https://dribbble.com" },
        { name: "Behance", url: "https://behance.net" },
        { name: "Awwwards", url: "https://awwwards.com" }
      ]
    },
    {
      title: "Color Resources",
      links: [
        { name: "Coolors", url: "https://coolors.co" },
        { name: "Color Hunt", url: "https://colorhunt.co" },
        { name: "Adobe Color", url: "https://color.adobe.com" }
      ]
    }
  ];

  return (
    <div className="designlab-container">
      <style>
        {`
          .designlab-container {
            padding: 80px 20px;
            background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
            min-height: 100vh;
          }

          .designlab-header {
            text-align: center;
            margin-bottom: 60px;
            animation: fadeIn 1s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .designlab-title {
            font-size: 2.5rem;
            color: #1f2937;
            margin-bottom: 20px;
            font-weight: 700;
          }

          .designlab-subtitle {
            color: #6b7280;
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto;
          }

          .tools-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto 4rem auto;
            padding: 0 1rem;
          }

          .tool-card {
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

          .tool-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
          }

          .tool-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }

          .tool-title {
            font-size: 1.5rem;
            color: #1f2937;
            margin-bottom: 1rem;
            font-weight: 600;
          }

          .tool-description {
            color: #6b7280;
            margin-bottom: 1.5rem;
            line-height: 1.6;
          }

          .topics-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .topic-tag {
            background: #f3f4f6;
            color: #4b5563;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            transition: all 0.2s ease;
          }

          .topic-tag:hover {
            background: #e5e7eb;
            transform: scale(1.05);
          }

          .resources-section {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }

          .resources-title {
            font-size: 1.8rem;
            color: #1f2937;
            margin-bottom: 2rem;
            text-align: center;
          }

          .resources-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
          }

          .resource-category {
            text-align: center;
          }

          .resource-category-title {
            font-size: 1.2rem;
            color: #4b5563;
            margin-bottom: 1rem;
          }

          .resource-links {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .resource-link {
            color: #6366f1;
            text-decoration: none;
            padding: 0.5rem;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .resource-link:hover {
            background: #f3f4f6;
            color: #4f46e5;
          }
        `}
      </style>

      <div className="designlab-header">
        <h1 className="designlab-title">Design Lab</h1>
        <p className="designlab-subtitle">
          Master modern design principles and tools to create beautiful, user-centric interfaces
        </p>
      </div>

      <div className="tools-grid">
        {designTools.map((tool, index) => (
          <div key={index} className="tool-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="tool-icon">{tool.icon}</div>
            <h3 className="tool-title">{tool.title}</h3>
            <p className="tool-description">{tool.description}</p>
            <div className="topics-list">
              {tool.topics.map((topic, idx) => (
                <span key={idx} className="topic-tag">{topic}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="resources-section">
        <h2 className="resources-title">Useful Resources</h2>
        <div className="resources-grid">
          {resources.map((category, index) => (
            <div key={index} className="resource-category">
              <h3 className="resource-category-title">{category.title}</h3>
              <div className="resource-links">
                {category.links.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="resource-link"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DesignLab; 