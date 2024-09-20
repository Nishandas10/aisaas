import { FaMicrophone, FaPaperPlane } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PromptBar: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (prompt.trim()) {
      const sessionUrl = `/dashboard/ai_models/gemini/new?page=${encodeURIComponent(prompt)}`;
      router.push(sessionUrl); // Redirect to the chat page with the prompt in the URL
    }
  };

  return (
    <div className="fixed bottom-0 left-64 right-0 p-4 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl w-full flex items-center bg-gray-700 rounded-full shadow-md px-6 py-3"
      >
        <FaMicrophone className="text-gray-400 mr-4 text-xl cursor-pointer hover:text-gray-300" />
        <input
          type="text"
          placeholder="Message ChatGPT"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow bg-transparent outline-none text-white placeholder-gray-400"
        />
        <button type="submit">
          <FaPaperPlane className="text-indigo-500 ml-4 text-xl cursor-pointer hover:text-indigo-400" />
        </button>
      </form>
    </div>
  );
};

export default PromptBar;
