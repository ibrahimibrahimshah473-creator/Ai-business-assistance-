// MOCK AI ENGINE
// ----------------
// This simulates what a real AI API call would do: take the conversation,
// figure out what the person wants (the "intent"), and return a reply.
//
// It's deliberately built with the same shape a real integration would use:
//
//   const response = await getAIResponse(history, latestMessage)
//
// Later, you can replace the INSIDE of getAIResponse with a real call to
// Claude, OpenAI, etc. (see app/api/chat/route.ts for where that goes)
// without touching any component that uses this function.

import { business, faqs, services } from "./business-data";
import { AIResponse, ChatMessage, Intent } from "./types";

// Simple keyword -> intent rules. A real LLM would replace this whole
// function, but keeping it rule-based here means the demo works with
// zero API cost and is fully predictable for a portfolio walkthrough.
function detectIntent(message: string): Intent {
  const m = message.toLowerCase();

  if (/\b(hi|hello|hey|good morning|good afternoon)\b/.test(m)) return "greeting";
  if (/\b(price|cost|how much|pricing|fee)\b/.test(m)) return "pricing";
  if (/\b(service|offer|treatment|whitening|veneer|invisalign|cleaning)\b/.test(m))
    return "services";
  if (/\b(appointment|book|schedule|available|slot|availability)\b/.test(m))
    return "appointment";
  if (/\b(address|location|where are you|parking|directions)\b/.test(m)) return "location";
  if (/\b(hour|open|close|opening)\b/.test(m)) return "hours";
  if (/\b(call|phone|email|contact|reach you)\b/.test(m)) return "contact";
  if (/\b(human|person|agent|someone|representative|talk to)\b/.test(m))
    return "human_handoff";
  if (/\b(interested|sign me up|i want|get started|sounds good|book me)\b/.test(m))
    return "lead_intent";

  return "unknown";
}

function buildServicesList(): string {
  return services.map((s) => `${s.name} — ${s.price}`).join(", ");
}

export function getAIResponse(latestMessage: string, _history: ChatMessage[]): AIResponse {
  const intent = detectIntent(latestMessage);

  switch (intent) {
    case "greeting":
      return {
        intent,
        text: `Hi! I'm the ${business.name} assistant. I can help with services, pricing, hours, or booking a visit. What would you like to know?`,
        quickReplies: ["What services do you offer?", "What are your prices?", "Book an appointment"],
      };

    case "services":
      return {
        intent,
        text: `We offer: ${buildServicesList()}. Want details on any of these, or should I help you book one?`,
        quickReplies: ["What are your prices?", "Book an appointment", "Talk to someone"],
      };

    case "pricing":
      return {
        intent,
        text: `Here's our pricing — ${buildServicesList()}. Prices vary by case complexity for veneers and Invisalign. Want me to check availability?`,
        quickReplies: ["Book an appointment", "I'm interested in your service"],
      };

    case "appointment":
      return {
        intent,
        text: "I'd be happy to help you book a visit. I just need a few details to get you on the calendar.",
        quickReplies: ["Continue to booking"],
        triggerLeadForm: true,
      };

    case "hours":
      return {
        intent,
        text: `We're open ${business.hours.weekdays} on weekdays, ${business.hours.saturday} on Saturdays, and closed Sundays.`,
        quickReplies: ["Book an appointment", "Where are you located?"],
      };

    case "location":
      return {
        intent,
        text: `We're at ${business.location.address}, ${business.location.city}. Complimentary valet parking is available.`,
        quickReplies: ["What are your hours?", "Book an appointment"],
      };

    case "contact":
      return {
        intent,
        text: `You can reach us at ${business.contact.phone} or ${business.contact.email} — or I can have someone follow up with you directly.`,
        quickReplies: ["Have someone contact me", "Book an appointment"],
      };

    case "human_handoff":
      return {
        intent,
        text: "Of course — let me get your details so our team can reach out personally.",
        quickReplies: ["Continue"],
        triggerLeadForm: true,
      };

    case "lead_intent":
      return {
        intent,
        text: "Great! I just need a few quick details and our team will follow up to confirm everything.",
        quickReplies: ["Continue"],
        triggerLeadForm: true,
      };

    default: {
      const faq = faqs.find((f) =>
        latestMessage.toLowerCase().includes(f.question.toLowerCase().split(" ")[2] ?? "")
      );
      if (faq) {
        return { intent: "unknown", text: faq.answer, quickReplies: ["Book an appointment"] };
      }
      return {
        intent: "unknown",
        text: "I want to make sure you get the right answer — could you rephrase that, or would you like to speak with our team directly?",
        quickReplies: ["Talk to someone", "What services do you offer?"],
      };
    }
  }
}
