'use client';
import { useState } from 'react';
import { generateFromAPI } from '../lib/api';
import ReactMarkdown from 'react-markdown';

export default function ChatBox() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [creditsLeft, setCreditsLeft] = useState(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setReply('');
    
    const result = await generateFromAPI(prompt);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      if (result.error.toLowerCase().includes('recharge')) {
        setCreditsLeft(0);
      }
    } else {
      setReply(result.response);
      setCreditsLeft((prev) => (prev !== null ? prev - 1 : 4));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 border shadow-md rounded-xl space-y-5 bg-white dark:bg-zinc-900 dark:text-white">
      <h1 className="text-3xl font-semibold text-center">Gemma Chat Assistant</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
        Ask anything – from recipes to programming help.
      </p>

      <div className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows={4}
          className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-zinc-800 dark:border-zinc-700"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || creditsLeft === 0}
          className={`w-full bg-purple-600 text-white py-2 rounded-lg transition hover:bg-purple-700 disabled:opacity-50`}
        >
          {loading ? 'Thinking...' : 'Generate Response'}
        </button>
      </div>

      {reply && (
        <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg border dark:border-zinc-700 prose dark:prose-invert max-w-none">
          <ReactMarkdown>{reply}</ReactMarkdown>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md border border-red-300 dark:border-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {creditsLeft !== null && (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Credits Left:</strong> {creditsLeft}
        </p>
      )}

      {creditsLeft === 0 && (
        <div className="mt-3 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700 rounded-md text-center">
          You have exhausted your credits. Please recharge to continue using the assistant.
        </div>
      )}
    </div>
  );
}
