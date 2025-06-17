import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TrackSelector from './components/TrackSelector';
import LessonPage from './pages/LessonPage';
import Dashboard from './pages/Dashboard';
import { ProgressProvider } from './context/ProgressContext';

const App: React.FC = () => {
  return (
    <ProgressProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-blue-600">CodeOnTheGo</Link>
              <div>
                <Link to="/dashboard" className="text-blue-600 hover:underline font-medium mr-4">Dashboard</Link>
                <Link to="/tracks" className="text-blue-600 hover:underline font-medium mr-4">Tracks</Link>
              </div>
            </div>
          </nav>

          <main className="py-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tracks" element={<TrackSelector />} />
              <Route path="/lesson/:lessonId" element={<LessonPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProgressProvider>
  );
};

export default App; 