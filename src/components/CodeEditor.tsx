import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode: string;
  language: 'javascript' | 'python';
  onRun: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode, language, onRun }) => {
  const [code, setCode] = useState(initialCode);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-[400px] border rounded-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={language}
          defaultValue={initialCode}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      <div className="mt-4">
        <button
          onClick={() => onRun(code)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Run Code
        </button>
      </div>
    </div>
  );
};

export default CodeEditor; 