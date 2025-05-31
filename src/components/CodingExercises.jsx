import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    if (error.response?.status === 401 && !originalRequest._retry) {
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
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const CodingExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exercisesResponse, progressResponse] = await Promise.all([
          axiosInstance.get("/api/exercises"),
          axiosInstance.get("/api/progress"),
        ]);

        if (exercisesResponse.data.success) {
          setExercises(exercisesResponse.data.exercises);
        }

        if (progressResponse.data.success) {
          // Convert progress array to an object for easier lookup
          const progressObj = {};
          progressResponse.data.progress.forEach((item) => {
            progressObj[item.exerciseId] = item;
          });
          setProgress(progressObj);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err.response?.data?.error ||
            err.message ||
            "Failed to fetch data. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <section className="coding-exercises">
      <style>
        {`
          .coding-exercises {
            padding: 60px 0;
            background: #f8f9ff;
          }

          .exercises-header {
            text-align: center;
            margin-bottom: 50px;
          }

          .exercises-title {
            font-size: 2.5rem;
            color: #1f2937;
            margin-bottom: 16px;
            font-weight: 700;
          }

          .exercises-description {
            color: #6b7280;
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto;
          }

          .exercises-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            justify-content: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .exercise-card {
            flex: 0 1 calc(33.333% - 20px);
            min-width: 300px;
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            animation: fadeIn 0.5s ease-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .exercise-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
          }

          .card-header {
            margin-bottom: 16px;
          }

          .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 8px;
          }

          .card-description {
            color: #6b7280;
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 24px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .start-button {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            text-align: center;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            width: 100%;
          }

          .continue-button {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            text-align: center;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            width: 100%;
          }

          .start-button:hover, .continue-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          }

          .progress-bar {
            height: 4px;
            background: #e5e7eb;
            border-radius: 2px;
            margin-bottom: 16px;
            overflow: hidden;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            transition: width 0.3s ease;
          }

          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
          }

          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #6366f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .error-message {
            text-align: center;
            color: #ef4444;
            padding: 20px;
            margin: 20px auto;
            max-width: 500px;
            background: #fee2e2;
            border-radius: 8px;
          }

          @media (max-width: 768px) {
            .exercise-card {
              flex: 0 1 100%;
            }
          }
        `}
      </style>

      <div className="exercises-header">
        <h2 className="exercises-title">Coding Exercises</h2>
        <p className="exercises-description">
          Challenge yourself with our curated collection of coding exercises.
          Master web development one step at a time.
        </p>
      </div>

      <div className="exercises-grid">
        {exercises.map((exercise, index) => {
          const exerciseProgress = progress[exercise.id] || null;
          const completionPercentage = exerciseProgress
            ? exerciseProgress.completionPercentage
            : 0;

          return (
            <div
              key={index}
              className="exercise-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div>
                <div className="card-header">
                  <h3 className="card-title">{exercise.title}</h3>
                </div>
                {exerciseProgress && (
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                )}
                <p className="card-description">{exercise.description}</p>
              </div>
              <Link
                to={`/exercise/${exercise.id}`}
                className={
                  exerciseProgress ? "continue-button" : "start-button"
                }
              >
                {exerciseProgress ? "Continue Exercise" : "Start Exercise"}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CodingExercises;
