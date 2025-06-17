import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Lesson } from '../types';
import LessonViewer from '../components/LessonViewer';

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        // In the future, this will fetch from an API
        const jsTrack = await import('../data/lessons/javascript.json');
        const foundLesson = jsTrack.default.lessons.find(
          (l: any) => l.id === lessonId
        );

        if (foundLesson) {
          setLesson({
            ...foundLesson,
            language: foundLesson.language as 'javascript' | 'python'
          });
        } else {
          setError('Lesson not found');
        }
      } catch (err) {
        setError('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">Loading lesson...</div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-red-600">{error || 'Lesson not found'}</div>
      </div>
    );
  }

  return <LessonViewer lesson={lesson} />;
};

export default LessonPage; 