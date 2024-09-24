import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateLongFormContentStream = async (
  prompt: string,
  maxTokens: number = 4000, // Adjust for longer content
  temperature: number = 0.7,
  onStream: (content: string) => void // Callback function to handle streaming content
) => {
  // Validate the input prompt
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    throw new Error("Prompt is required and must be a non-empty string.");
  }

  try {
    // Use the GPT-4 model (or GPT-3.5-turbo if GPT-4 isn't available), with chat completions and streaming
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // GPT-4 can be better for generating more detailed, coherent long-form content
      messages: [
        {
          role: "system",
          content:
            "You are a chat completion AI that provides detailed and comprehensive long-form content in response to user questions.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: maxTokens, // Longer token limit for more detailed output
      temperature: temperature, // Adjust temperature for creativity/control
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
