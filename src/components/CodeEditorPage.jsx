import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function CodeEditorPage({ initialCode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [html, setHtml] = useState(initialCode || "");
  const [css, setCss] = useState(`body {
font-family: 'Arial', sans-serif;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
margin: 0;
padding: 20px;
min-height: 100vh;
}

.container {
background: white;
padding: 2rem;
border-radius: 15px;
box-shadow: 0 10px 30px rgba(0,0,0,0.2);
text-align: center;
animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
from { opacity: 0; transform: translateY(20px); }
to { opacity: 1; transform: translateY(0); }
}

button {
background: #4285f4;
color: white;
border: none;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
transition: all 0.3s ease;
}

button:hover {
background: #3367d6;
transform: translateY(-2px);
}`);

  const [js, setJs] = useState(`function changeColor() {
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
document.querySelector('.container').style.background = randomColor;
document.querySelector('.container').style.color = 'white';
}`);

  const [activeTab, setActiveTab] = useState("html");
  const [isRunning, setIsRunning] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [saveStatus, setSaveStatus] = useState("saved"); // 'saved', 'saving', 'error'

  // Create axios instance with interceptors
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
  });

  // Add response interceptor for token refresh
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If error is 401 and we haven't tried to refresh token yet
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try to refresh token
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/token/refresh-token`,
            {
              withCredentials: true,
            }
          );

          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refresh token fails, redirect to login
          navigate("/");
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  // Auto-save functionality
  useEffect(() => {
    const saveProgress = async () => {
      try {
        setSaveStatus("saving");
        const answersGiven = {
          html,
          css,
          js,
        };

        // Calculate completion percentage based on code length
        const totalPossibleLength = 100; // This is a baseline, adjust as needed
        const currentLength = (html + css + js).length;
        const completionPercentage = Math.min(
          (currentLength / totalPossibleLength) * 100,
          100
        );

        await axiosInstance.post("/api/progress/save", {
          exerciseId: parseInt(id),
          currentStep: 1,
          answersGiven: JSON.stringify(answersGiven),
          timeSpent: 0,
          completionPercentage,
          sessionData: JSON.stringify({ activeTab }),
        });

        setLastSavedAt(new Date());
        setSaveStatus("saved");
      } catch (error) {
        console.error("Error saving progress:", error);
        if (error.response?.status === 401) {
          navigate("/");
        }
        setSaveStatus("error");
      }
    };

    // Debounce the save function to avoid too many API calls
    const timeoutId = setTimeout(saveProgress, 1000);
    return () => clearTimeout(timeoutId);
  }, [html, css, js, id, activeTab, navigate]);

  // Load saved progress
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await axiosInstance.get(`/api/progress/${id}`);

        if (response.data.success && response.data.progress) {
          const { answersGiven, sessionData } = response.data.progress;
          // Check if answersGiven is already an object
          const savedAnswers =
            typeof answersGiven === "string"
              ? JSON.parse(answersGiven)
              : answersGiven;
          // Check if sessionData is already an object
          const savedSession = sessionData
            ? typeof sessionData === "string"
              ? JSON.parse(sessionData)
              : sessionData
            : null;

          setHtml(savedAnswers.html || initialCode || "");
          setCss(savedAnswers.css || "");
          setJs(savedAnswers.js || "");
          if (savedSession?.activeTab) {
            setActiveTab(savedSession.activeTab);
          }
        }
      } catch (error) {
        console.error("Error loading progress:", error);
        if (error.response?.status === 401) {
          navigate("/");
        }
      }
    };

    loadProgress();
  }, [id, initialCode, navigate]);

  const srcDoc = `
    <html>
    <head>
        <style>${css}</style>
    </head>
    <body>
        ${html}
        <script>${js}<\/script>
    </body>
    </html>
`;

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 500);
  };

  useEffect(() => {
    const timer = setTimeout(runCode, 300);
    return () => clearTimeout(timer);
  }, [html, css, js]);

  const tabs = [
    { id: "html", label: "HTML", icon: "🏗️" },
    { id: "css", label: "CSS", icon: "🎨" },
    { id: "js", label: "JS", icon: "⚡" },
  ];

  const getEditorContent = () => {
    switch (activeTab) {
      case "html":
        return html;
      case "css":
        return css;
      case "js":
        return js;
      default:
        return "";
    }
  };

  const setEditorContent = (value) => {
    switch (activeTab) {
      case "html":
        setHtml(value);
        break;
      case "css":
        setCss(value);
        break;
      case "js":
        setJs(value);
        break;
    }
  };

  return (
    <div className="editor-app">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .editor-app {
          height: 100vh;
          background: linear-gradient(
            135deg,
            #0f1419 0%,
            #1a2332 50%,
            #2d3748 100%
          );
          display: flex;
          flex-direction: column;
          font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
          overflow: hidden;
        }

        .header {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo::before {
          content: "✨";
          animation: rotate 2s linear infinite;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .run-button {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
          position: relative;
          overflow: hidden;
        }

        .run-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .run-button.running {
          animation: pulse 0.5s ease-in-out;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .main-content {
          display: flex;
          flex: 1;
          gap: 1px;
          background: #374151;
          overflow: hidden;
        }

        .editor-section {
          flex: 1;
          background: #1f2937;
          display: flex;
          flex-direction: column;
          border-radius: 8px 8px 0 0;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .tabs {
          display: flex;
          background: #111827;
          border-bottom: 1px solid #374151;
        }

        .tab {
          flex: 1;
          padding: 0.75rem 1rem;
          background: #1f2937;
          color: #9ca3af;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .tab:hover {
          background: #374151;
          color: #e5e7eb;
        }

        .tab.active {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: white;
          box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
        }

        .tab.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #60a5fa;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .editor-textarea {
          flex: 1;
          background: #1f2937;
          color: #e5e7eb;
          border: none;
          padding: 1rem;
          font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
          font-size: 14px;
          line-height: 1.5;
          resize: none;
          outline: none;
          white-space: pre;
          overflow-wrap: normal;
          overflow-x: auto;
        }

        .editor-textarea:focus {
          background: #1a2332;
          box-shadow: inset 0 0 0 2px rgba(59, 130, 246, 0.3);
        }

        .output-section {
          flex: 1;
          background: white;
          display: flex;
          flex-direction: column;
          border-radius: 8px 8px 0 0;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .output-header {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          padding: 0.75rem 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .output-header::before {
          content: "📱";
        }

        .output-iframe {
          flex: 1;
          border: none;
          width: 100%;
          height: 100%;
          background: white;
          transition: all 0.3s ease;
        }

        .output-iframe.updating {
          opacity: 0.8;
          transform: scale(0.99);
        }

        @media (max-width: 768px) {
          .main-content {
            flex-direction: column;
          }

          .header {
            padding: 0.75rem 1rem;
          }

          .logo {
            font-size: 1.25rem;
          }

          .run-button {
            padding: 0.4rem 1rem;
            font-size: 0.9rem;
          }
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #9ca3af;
          font-size: 0.8rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0.3;
          }
        }

        .save-status {
          font-size: 0.8rem;
          padding: 4px 8px;
          border-radius: 4px;
          margin-right: 10px;
        }
        .save-status.saved {
          color: #10b981;
          background: #d1fae5;
        }
        .save-status.saving {
          color: #6366f1;
          background: #e0e7ff;
        }
        .save-status.error {
          color: #ef4444;
          background: #fee2e2;
        }
      `}</style>

      <div className="header">
        <div className="logo">BluePen Playground</div>
        <div className="status-indicator">
          <span className={`save-status ${saveStatus}`}>
            {saveStatus === "saved" && "✓ Saved"}
            {saveStatus === "saving" && "⟳ Saving..."}
            {saveStatus === "error" && "⚠ Error saving"}
          </span>
          <div className="status-dot"></div>
          Live Preview
        </div>
        <button
          className={`run-button ${isRunning ? "running" : ""}`}
          onClick={runCode}
        >
          ▶ Run
        </button>
      </div>

      <div className="main-content">
        <div className="editor-section">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <textarea
            className="editor-textarea"
            value={getEditorContent()}
            onChange={(e) => setEditorContent(e.target.value)}
            placeholder={`Write ${activeTab.toUpperCase()} here...`}
            spellCheck="false"
          />
        </div>

        <div className="output-section">
          <div className="output-header">Output Preview</div>
          <iframe
            className={`output-iframe ${isRunning ? "updating" : ""}`}
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}
