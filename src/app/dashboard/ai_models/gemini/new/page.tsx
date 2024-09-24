'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaPaperPlane } from 'react-icons/fa';

// Typing for the response array
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const GeminiChatPage: React.FC = () => {
  const [prompt, setPrompt] = useState(''); // Current user input
  const [response, setResponse] = useState<ChatMessage[]>([]); // Chat history array
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Control API processing
  const [streamedResponse, setStreamedResponse] = useState(''); // Store the streamed response incrementally
  const [initialPromptHandled, setInitialPromptHandled] = useState(false); // To ensure initial prompt is handled only once

  const searchParams = useSearchParams();
  const existingPrompt = searchParams?.get('page') || ''; // Get the initial prompt from URL

  // Function to handle the streamed AI response
  const handleStreamedAIResponse = useCallback(async (submittedPrompt: string) => {
    if (isProcessing) return;

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

      setStreamedResponse(''); // Reset the streamed response for each request

      // Read the streamed response chunk by chunk
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value);
        aiResponse += chunk;
        setStreamedResponse((prev) => prev + chunk); // Append each chunk to the ongoing response
      }

      // After streaming is done, update the chat history
      setResponse((prev) => [
        ...prev,
        { role: 'user', content: submittedPrompt },
        { role: 'assistant', content: aiResponse }, // Final response after streaming is done
      ]);

      setPrompt(''); // Clear the input field
    } catch (error) {
      console.error('Error fetching AI response:', error);
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  }, [isProcessing, response]);

  // Handle form submission for new prompts
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isProcessing) {
      handleStreamedAIResponse(prompt); // Stream the response as the prompt is submitted
    }
  };

  // Handle the initial prompt only once on page load
  useEffect(() => {
    if (existingPrompt && !initialPromptHandled) {
      handleStreamedAIResponse(existingPrompt); // Fetch AI response for the initial prompt
      setInitialPromptHandled(true); // Ensure this is only triggered once
    }
  }, [existingPrompt, initialPromptHandled, handleStreamedAIResponse]);

  return (
    <div className="flex flex-col justify-between min-h-screen p-10 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Gemini Chat</h1>

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

        {/* Show streaming content */}
        {isProcessing && <p className="text-indigo-400">AI: {streamedResponse}</p>}
      </div>

      {/* Prompt input form */}
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Enter a prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)} // Only update the value here, no API call
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
//deBounce