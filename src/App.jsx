import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import Home from './Home';
import TechPrep from './TechPrep';
import DesignLab from './DesignLab';
import Internships from './Internships';
import Projects from './Projects';
import ExercisePage from './components/ExercisePage';
import Profile from './components/Profile';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tech-prep" element={<TechPrep />} />
        <Route path="/design-lab" element={<DesignLab />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/exercise/:id" element={<ExercisePage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}



export default App;
