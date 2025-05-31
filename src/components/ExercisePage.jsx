import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CodeEditorPage from "./CodeEditorPage";

const axiosInstance = axios.create({
  baseURL: "import.meta.env.VITE_API_URL",
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
        await axios.get("http://localhost:3000/api/token/refresh-token", {
          withCredentials: true,
        });

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

const ExercisePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axiosInstance.get(`/api/exercises/${id}`);

        if (response.data.success) {
          setExercise(response.data.exercise);
        } else {
          throw new Error(response.data.error || "Failed to fetch exercise");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching exercise:", err);
        if (err.response?.status === 401) {
          navigate("/");
        } else {
          setError(
            err.response?.data?.error ||
              err.message ||
              "Failed to fetch exercise details. Please try again later."
          );
        }
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !exercise) {
    return <div className="error-message">{error || "Exercise not found"}</div>;
  }

  return (
    <div className="exercise-page">
      <style>
        {`
          .exercise-page {
            padding: 40px 20px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .exercise-header {
            margin-bottom: 40px;
          }

          .exercise-title {
            font-size: 2rem;
            color: #1f2937;
            margin-bottom: 16px;
            font-weight: 700;
          }

          .exercise-description {
            color: #6b7280;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 30px;
            white-space: pre-wrap;
          }

          .back-button {
            background: transparent;
            border: 2px solid #6366f1;
            color: #6366f1;
            padding: 8px 20px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 20px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }

          .back-button:hover {
            background: #6366f1;
            color: white;
          }

          .editor-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            overflow: hidden;
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
        `}
      </style>

      <button className="back-button" onClick={() => navigate("/home")}>
        <i className="fas fa-arrow-left"></i>
        Back to Exercises
      </button>

      <div className="exercise-header">
        <h1 className="exercise-title">{exercise.title}</h1>
        <p className="exercise-description">{exercise.description}</p>
      </div>

      <div className="editor-container">
        <CodeEditorPage initialCode={exercise.starterCode} />
      </div>
    </div>
  );
};

export default ExercisePage;
