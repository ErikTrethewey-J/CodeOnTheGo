import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { Track } from '../types';

const Dashboard: React.FC = () => {
  const { completedLessons } = useProgress();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [lastIncomplete, setLastIncomplete] = useState<{ trackId: string; lessonId: string } | null>(null);

  useEffect(() => {
    const loadTracks = async () => {
      const jsTrack = await import('../data/lessons/javascript.json');
      const allTracks: Track[] = [
        {
          ...jsTrack.default,
          language: jsTrack.default.language as 'javascript' | 'python',
          lessons: jsTrack.default.lessons.map((lesson: any) => ({
            ...lesson,
            language: lesson.language as 'javascript' | 'python',
          })),
        },
      ];
      setTracks(allTracks);

      // Find the first incomplete lesson for resume
      for (const track of allTracks) {
        const incomplete = track.lessons.find((lesson) => !completedLessons.includes(lesson.id));
        if (incomplete) {
          setLastIncomplete({ trackId: track.id, lessonId: incomplete.id });
          return;
        }
      }
      setLastIncomplete(null);
    };
    loadTracks();
  }, [completedLessons]);

  // Stats
  const totalLessons = tracks.reduce((sum, t) => sum + t.lessons.length, 0);
  const completedCount = completedLessons.length;
  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-blue-700">Overall Progress</span>
          <span className="text-sm text-gray-600">{completedCount} of {totalLessons} lessons completed ({percent}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
      <div className="mb-8">
        {lastIncomplete ? (
          <Link
            to={`/lesson/${lastIncomplete.lessonId}`}
            className="inline-block px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition mb-4"
          >
            Resume Learning
          </Link>
        ) : (
          <span className="inline-block px-6 py-2 bg-gray-300 text-gray-700 rounded mb-4">All lessons complete!</span>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tracks.map((track) => {
            const completed = track.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
            const total = track.lessons.length;
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            return (
              <div key={track.id} className="border rounded-lg p-6 bg-white shadow">
                <h3 className="text-lg font-bold mb-2">{track.name}</h3>
                <p className="text-gray-600 mb-2">{track.description}</p>
                <div className="mb-2">
                  <span className="text-blue-600 font-semibold">{completed} / {total} lessons completed</span>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-400 h-2 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
                <Link
                  to={`/tracks`}
                  className="inline-block mt-2 px-4 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                >
                  Go to Track
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 