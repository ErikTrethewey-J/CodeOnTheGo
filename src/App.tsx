import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrackSelector from './components/TrackSelector';
import LessonPage from './pages/LessonPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <h1 className="text-2xl font-bold text-blue-600">CodeOnTheGo</h1>
          </div>
        </nav>

        <main className="py-8">
          <Routes>
            <Route path="/" element={<TrackSelector />} />
            <Route path="/track/:trackId" element={<TrackSelector />} />
            <Route path="/lesson/:lessonId" element={<LessonPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 