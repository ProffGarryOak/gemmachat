'use client';
import { useState, useRef, useEffect } from 'react';
import { generateFromAPI } from '../lib/api';
import ReactMarkdown from 'react-markdown';
import { FiSend, FiRotateCw, FiAlertTriangle, FiInfo } from 'react-icons/fi';

export default function ChatBox() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [creditsLeft, setCreditsLeft] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { text: prompt, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    setLoading(true);
    setError('');
    setPrompt('');
    
    const result = await generateFromAPI(prompt);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      if (result.error.toLowerCase().includes('recharge')) {
        setCreditsLeft(0);
      }
    } else {
      setReply(result.response);
      setMessages(prev => [...prev, { text: result.response, sender: 'bot' }]);
      setCreditsLeft((prev) => (prev !== null ? prev - 1 : 4));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-zinc-900">
      <header className="bg-white dark:bg-zinc-800 shadow-sm py-4">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Gemma AI Assistant</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ask anything – from recipes to programming help
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-hidden max-w-3xl w-full mx-auto px-4 py-6">
        <div className="h-full flex flex-col">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6 max-w-md">
                  <div className="mx-auto bg-purple-100 dark:bg-purple-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <FiSend className="text-purple-600 dark:text-purple-400 text-2xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    How can I help you today?
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ask me anything and I'll do my best to assist you.
                  </p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-3 ${message.sender === 'user' 
                ? 'bg-purple-600 text-white rounded-br-none' 
                : 'bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-bl-none'}`}
            >
              {message.sender === 'bot' ? (
                <div className="prose dark:prose-invert prose-sm text-gray-50">
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              ) : (
                <p>{message.text}</p>
              )}
            </div>
          </div>
        ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-lg rounded-bl-none px-4 py-3 max-w-[80%]">
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <FiRotateCw className="animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="mt-auto">
            {error && (
              <div className="text-gray-50 flex items-start mb-4 p-3 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
                <FiAlertTriangle className="flex-shrink-0 mt-0.5 mr-2" />
                <div>
                  <strong className="font-medium">Error:</strong> {error}
                </div>
              </div>
            )}

            {creditsLeft === 0 && (
              <div className="flex items-start mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <FiInfo className="flex-shrink-0 mt-0.5 mr-2" />
                <div>
                  <strong className="font-medium">Notice:</strong> You've used all your credits. Please recharge to continue.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                rows={1}
                className="text-gray-50 w-full pr-12 pl-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-zinc-800 dark:border-zinc-700"
              />
              <button
                type="submit"
                disabled={loading || creditsLeft === 0}
                className={`absolute right-2 bottom-2 p-2 rounded-full ${loading || creditsLeft === 0 
                  ? 'text-gray-400 dark:text-gray-600' 
                  : 'text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50'}`}
              >
                <FiSend className="text-xl" />
              </button>
            </form>

            {creditsLeft !== null && (
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
                <span>
                  <strong>Credits remaining:</strong> {creditsLeft}
                </span>
                <span className="text-gray-400 dark:text-gray-500">
                  Powered by Gemma AI
                </span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}