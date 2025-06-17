import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Track, Lesson } from '../types';

const TrackSelector: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const navigate = useNavigate();

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/track/${track.id}`)}
          >
            <h2 className="text-2xl font-semibold mb-2">{track.name}</h2>
            <p className="text-gray-600 mb-4">{track.description}</p>
            <div className="flex items-center">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {track.language}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackSelector; 