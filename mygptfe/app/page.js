import ChatBox from '../components/ChatBox';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Gemma AI Assistant</title>
        <meta name="description" content="Chat with Gemma AI Assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-zinc-900 dark:to-zinc-800 p-4 md:p-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 mb-2">
              Gemma AI Assistant
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Your intelligent conversation partner
            </p>
          </div>
          
          <div className="rounded-xl shadow-xl overflow-hidden">
            <ChatBox />
          </div>

          <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Gemma AI Assistant. All rights reserved.</p>
            <p className="mt-1">Powered by cutting-edge AI technology</p>
          </footer>
        </div>
      </main>
    </>
  );
}