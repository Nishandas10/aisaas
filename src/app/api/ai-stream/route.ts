// app/api/ai-stream/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateLongFormContentStream } from "@/lib/openai"; // Your existing OpenAI utility

export async function POST(req: NextRequest) {
  try {
    const {
      prompt,
      chatHistory,
      maxTokens = 4000,
      temperature = 0.7,
    } = await req.json();

    // Validate input
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      console.error("Invalid prompt:", prompt);
      return NextResponse.json(
        { error: "Invalid prompt. Prompt must be a non-empty string." },
        { status: 400 }
      );
    }

    // Validate chatHistory
    if (!Array.isArray(chatHistory)) {
      console.error("Invalid chat history:", chatHistory);
      return NextResponse.json(
        { error: "Invalid chat history. Must be an array." },
        { status: 400 }
      );
    }

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          // Pass the full conversation history along with the latest prompt to OpenAI
          await generateLongFormContentStream(
            JSON.stringify([...chatHistory, { role: "user", content: prompt }]), // Convert array to string
            maxTokens,
            temperature,
            (content) => {
              controller.enqueue(encoder.encode(content)); // Stream content chunk by chunk
            }
          );
          controller.close(); // Close the stream after it's done
        } catch (error) {
          console.error("Streaming error:", error); // Log the actual streaming error
          controller.error(error); // Handle errors in the stream
        }
      },
    });

    return new Response(readableStream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Server Error in AI Stream:", error); // Log the exact error
    return NextResponse.json(
      { error: "Server error while processing the AI request." },
      { status: 500 }
    );
  }
}
