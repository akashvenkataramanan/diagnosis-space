import { useState } from 'react';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

export function ApiKeyInput({ onApiKeySet, hasApiKey }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
      setApiKey('');
    }
  };

  const handleClear = () => {
    onApiKeySet('');
    setApiKey('');
  };

  if (hasApiKey) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <span className="text-sm text-green-800 font-medium">
                🔗 OpenAI API Connected
              </span>
              <p className="text-xs text-green-600 mt-0.5">Ready for AI analysis</p>
            </div>
          </div>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 text-xs text-green-700 hover:text-green-900 bg-green-100 hover:bg-green-200 rounded-md transition-colors duration-200 font-medium"
          >
            🔄 Change Key
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">🔑</span>
          <h3 className="text-sm font-medium text-gray-900">
            OpenAI API Key Required
          </h3>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          Connect your OpenAI API key to unlock AI-powered clinical reasoning. Your key stays secure in your browser and never touches our servers.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type={isVisible ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key (sk-...)"
            className="w-full px-3 py-2.5 text-sm border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-16 bg-white transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs text-orange-600 hover:text-orange-800 bg-orange-100 hover:bg-orange-200 rounded-md transition-colors duration-200"
          >
            {isVisible ? '👁️' : '🙈'}
          </button>
        </div>
        
        <button
          type="submit"
          disabled={!apiKey.trim()}
          className="w-full px-3 py-2.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-sm transition-all duration-200"
        >
          🚀 Connect & Activate AI
        </button>
      </form>
      
      <div className="mt-3 flex items-center gap-2 text-xs text-orange-700">
        <span>💡</span>
        <p>
          Need an API key?{' '}
          <a 
            href="https://platform.openai.com/api-keys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium underline hover:text-orange-900 transition-colors duration-200"
          >
            Get one from OpenAI →
          </a>
        </p>
      </div>
    </div>
  );
}