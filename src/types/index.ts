export interface Lesson {
  id: string;
  title: string;
  description: string;
  example: string;
  challenge: string;
  language: 'javascript' | 'python';
  order: number;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  language: 'javascript' | 'python';
  lessons: Lesson[];
} 