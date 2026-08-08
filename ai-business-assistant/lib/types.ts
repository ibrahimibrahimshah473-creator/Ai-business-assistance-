// Central place for shared types.
// Keeping these in one file means every component and function agrees
// on what a "Lead" or "Message" looks like — no duplicated shapes.

export type MessageSender = "user" | "assistant";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: number;
  quickReplies?: string[];
}

export type Intent =
  | "greeting"
  | "pricing"
  | "services"
  | "appointment"
  | "contact"
  | "human_handoff"
  | "lead_intent"
  | "hours"
  | "location"
  | "unknown";

export interface AIResponse {
  intent: Intent;
  text: string;
  quickReplies?: string[];
  triggerLeadForm?: boolean;
}

export type LeadStatus = "new" | "contacted" | "qualified" | "booked";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: LeadStatus;
  source: "chat" | "appointment";
  createdAt: number;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string; // ISO date, e.g. "2026-08-15"
  time: string; // e.g. "10:30"
  createdAt: number;
}

export interface BusinessService {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
