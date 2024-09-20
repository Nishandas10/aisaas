'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaPaperPlane } from 'react-icons/fa';

// Typing for the response array
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

// Debounce function
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const GeminiChatPage: React.FC = () => {
  const [prompt, setPrompt] = useState(''); // Current user input
  const [response, setResponse] = useState<ChatMessage[]>([]); // Chat history array
  const [loading, setLoading] = useState(false);
  const [hasProcessedInitialPrompt, setHasProcessedInitialPrompt] = useState(false); // Track initial prompt handling
  const [isProcessing, setIsProcessing] = useState(false); // Control API processing

  const searchParams = useSearchParams();
  const existingPrompt = searchParams?.get('page') || ''; // Get the initial prompt from URL

  // Fetch AI response logic
  const fetchAIResponse = useCallback(
    async (submittedPrompt: string) => {
      const debouncedFetch = debounce(async (submittedPrompt: string) => {
        if (isProcessing) return; // Prevent further processing if a request is in-flight

        setIsProcessing(true);
        setLoading(true);

        try {
          const res = await fetch('/api/ai-stream', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: submittedPrompt,
              chatHistory: response, // Pass chat history along with the new prompt
            }),
          });

          if (!res.body) throw new Error('No response body from AI stream');

          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let done = false;
          let aiResponse = '';

          // Read the streamed response chunk by chunk
          while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            aiResponse += decoder.decode(value);
          }

          // Update the chat history
          setResponse((prev) => [
            ...prev,
            { role: 'user', content: submittedPrompt },
            { role: 'assistant', content: aiResponse },
          ]);

          setPrompt(''); // Clear the input field
        } catch (error) {
          console.error('Error fetching AI response:', error);
        } finally {
          setLoading(false);
          setIsProcessing(false);
        }
      }, 1000);

      debouncedFetch(submittedPrompt);
    },
    [response, isProcessing] // Add debounce to the dependency array
  );

  // Handle the initial prompt only once on page load
  useEffect(() => {
    if (existingPrompt && !hasProcessedInitialPrompt) {
      setHasProcessedInitialPrompt(true); // Mark initial prompt as handled
      fetchAIResponse(existingPrompt); // Fetch AI response for the initial prompt
    }
  }, [existingPrompt, hasProcessedInitialPrompt, fetchAIResponse]);

  // Handle form submission for new prompts
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isProcessing) {
      await fetchAIResponse(prompt); // Fetch response for user-entered prompt
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-10 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Chat Session</h1>

      {/* Chat History */}
      <div className="flex-grow mb-6 overflow-y-auto bg-gray-800 p-6 rounded-lg">
        {response.length > 0 ? (
          response.map((chat, index) => (
            <div key={index} className="mb-4">
              <p><strong>{chat.role === 'user' ? 'You' : 'AI'}:</strong> {chat.content}</p>
            </div>
          ))
        ) : (
          <p>No messages yet...</p>
        )}
      </div>

      {/* Prompt input form */}
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Enter a prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow p-3 rounded-lg bg-gray-800 text-white"
        />
        <button type="submit" className="ml-2 p-3 bg-indigo-600 rounded-lg" disabled={loading || isProcessing}>
          {loading || isProcessing ? 'Loading...' : <FaPaperPlane className="text-white" />}
        </button>
      </form>
    </div>
  );
};

export default GeminiChatPage;
