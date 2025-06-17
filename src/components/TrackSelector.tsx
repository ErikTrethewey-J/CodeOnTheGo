import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Track } from '../types';
import { useProgress } from '../context/ProgressContext';

const TrackSelector: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const navigate = useNavigate();
  const { isLessonComplete } = useProgress();

  useEffect(() => {
    // In the future, this will fetch from an API
    const loadTracks = async () => {
      try {
        const jsTrack = await import('../data/lessons/javascript.json');
        // Ensure the language type is correct for both track and lessons
        const track: Track = {
          ...jsTrack.default,
          language: jsTrack.default.language as 'javascript' | 'python',
          lessons: jsTrack.default.lessons.map((lesson: any) => ({
            ...lesson,
            language: lesson.language as 'javascript' | 'python'
          }))
        };
        setTracks([track]);
      } catch (error) {
        console.error('Error loading tracks:', error);
      }
    };

    loadTracks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Choose Your Learning Track</h1>
      {tracks.map((track) => {
        const total = track.lessons.length;
        const completed = track.lessons.filter(lesson => isLessonComplete(lesson.id)).length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        return (
          <div key={track.id} className="mb-8">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-blue-700">Progress</span>
                <span className="text-sm text-gray-600">{completed} of {total} lessons completed ({percent}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
            <div
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/tracks/${track.id}`)}
            >
              <h2 className="text-2xl font-semibold mb-2">{track.name}</h2>
              <p className="text-gray-600 mb-4">{track.description}</p>
              <div className="flex items-center mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2">
                  {track.language}
                </span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Lessons:</h3>
                <ul className="list-none pl-0">
                  {track.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center mb-1">
                      <span className="mr-2">
                        {isLessonComplete(lesson.id) ? (
                          <span className="text-green-500" title="Completed">✔</span>
                        ) : (
                          <span className="inline-block w-3 h-3 rounded-full bg-gray-300"></span>
                        )}
                      </span>
                      <span>{lesson.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackSelector; 