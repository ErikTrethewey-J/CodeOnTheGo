import React, { useState } from 'react';
import { Lesson } from '../types';
import CodeEditor from './CodeEditor';

interface LessonViewerProps {
  lesson: Lesson;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ lesson }) => {
  const [output, setOutput] = useState<string>('');

  const handleRunCode = (code: string) => {
    try {
      // For now, we'll only support JavaScript execution
      if (lesson.language === 'javascript') {
        // Capture console.log output
        const logs: string[] = [];
        const originalConsoleLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(arg => String(arg)).join(' '));
          originalConsoleLog.apply(console, args);
        };

        // Execute the code
        eval(code);

        // Restore console.log
        console.log = originalConsoleLog;

        // Update output
        setOutput(logs.join('\n'));
      } else {
        setOutput('Python execution will be supported soon!');
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
        <p className="text-gray-700 mb-6">{lesson.description}</p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Example</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>{lesson.example}</code>
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Challenge</h2>
          <p className="text-gray-700 whitespace-pre-line">{lesson.challenge}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Code</h2>
          <CodeEditor
            initialCode={lesson.example}
            language={lesson.language}
            onRun={handleRunCode}
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Output</h2>
          <div className="bg-gray-800 text-white p-4 rounded-lg h-[400px] overflow-auto">
            <pre className="whitespace-pre-wrap">{output || 'Run your code to see the output here...'}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer; 