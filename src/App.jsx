import React from 'react';
import ChatInterface from './components/ChatInterface';
import { Heart } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-semibold text-gray-900">Mental Health Support</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                24/7 Emergency: <span className="font-medium">988</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-8rem)]">
          <ChatInterface />
        </div>
      </main>
    </div>
  );
}

export default App;