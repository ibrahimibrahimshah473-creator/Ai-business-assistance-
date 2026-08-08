// FUTURE AI CONNECTION POINT
// ----------------------------
// Right now the chat widget calls lib/mock-ai-engine.ts directly in the
// browser — no network request, no API key, zero cost.
//
// When you're ready to use a real AI model, the chat widget would instead
// POST to this route, and this route (running on the server, never in the
// browser) would call the real API using a key stored in an environment
// variable. That way the key is NEVER exposed to visitors.
//
// Example of what this would look like with a real key:
//
//   const apiKey = process.env.AI_API_KEY; // set in .env.local, never committed
//   const res = await fetch("https://api.anthropic.com/v1/messages", {
//     method: "POST",
//     headers: {
//       "x-api-key": apiKey!,
//       "content-type": "application/json",
//       "anthropic-version": "2023-06-01",
//     },
//     body: JSON.stringify({
//       model: "claude-sonnet-4-6",
//       max_tokens: 500,
//       system: buildSystemPromptFromBusinessData(),
//       messages: conversationHistory,
//     }),
//   });
//
// For now this route just proxies to the same mock engine, so the
// architecture is already in place — swapping it later is a small,
// contained change.

import { NextRequest, NextResponse } from "next/server";
import { getAIResponse } from "@/lib/mock-ai-engine";
import { ChatMessage } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message: string = body.message ?? "";
    const history: ChatMessage[] = body.history ?? [];

    // Swap this line for a real API call when ready:
    const response = getAIResponse(message, history);

    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong processing your message." },
      { status: 500 }
    );
  }
}
