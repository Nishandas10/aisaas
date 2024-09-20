// utils/openai.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateLongFormContentStream = async (
  prompt: string,
  maxTokens: number = 3000,
  temperature: number = 0.7,
  onStream: (content: string) => void // Callback function to handle streaming content
) => {
  // Validate the input prompt
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    throw new Error("Prompt is required and must be a non-empty string.");
  }

  try {
    // Use the chat-based endpoint with the chat model and enable streaming
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
      temperature: temperature,
      stream: true, // Enable streaming
    });

    // Handle the stream by processing each chunk of data as it arrives
    for await (const chunk of response) {
      const { choices } = chunk;

      if (choices && choices.length > 0) {
        const content = choices[0].delta?.content;
        if (content) {
          onStream(content); // Pass each piece of content to the callback
        }
      }
    }
  } catch (error) {
    console.error("Error streaming content with GPT-4:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to stream content: ${error.message}`);
    } else {
      throw new Error("Failed to stream content due to an unknown error.");
    }
  }
};
