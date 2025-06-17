import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Interactive Code Editor',
    description: 'Write and run code directly in your browser or on your phone.'
  },
  {
    title: 'Multiple Languages',
    description: 'Start with JavaScript. Python and more coming soon!'
  },
  {
    title: 'Structured Lessons',
    description: 'Learn with clear explanations, real examples, and hands-on challenges.'
  },
  {
    title: 'Mobile-Friendly',
    description: 'Enjoy a seamless experience on any device, anywhere.'
  }
];

const steps = [
  {
    title: '1. Choose a Track',
    description: 'Pick your preferred programming language to start learning.'
  },
  {
    title: '2. Learn & Explore',
    description: 'Go through interactive lessons with examples and challenges.'
  },
  {
    title: '3. Practice & Run',
    description: 'Write code, run it instantly, and see your progress.'
  }
];

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-blue-500 to-blue-400 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">CodeOnTheGo</h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8">Learn to Code Anywhere, Anytime.</p>
        <Link
          to="/tracks"
          className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-50 transition"
        >
          Get Started
        </Link>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-blue-50 py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-blue-700">How it Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto">
          {steps.map((step) => (
            <div key={step.title} className="flex-1 bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-blue-500">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-500 text-sm bg-white border-t">
        &copy; {new Date().getFullYear()} CodeOnTheGo. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage; 