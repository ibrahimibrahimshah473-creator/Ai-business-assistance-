// This file is the "knowledge base" the AI assistant draws from.
// In a real product, this would live in a database or CMS. Keeping it as
// one typed object means the AI, the chat widget, and the settings page
// all read from the same source of truth — change a price here and it
// updates everywhere.

import { BusinessService, FAQ } from "./types";

export const business = {
  name: "Lumière Dental Studio",
  tagline: "Boutique dentistry, quietly exceptional.",
  hours: {
    weekdays: "9:00 AM – 7:00 PM",
    saturday: "10:00 AM – 4:00 PM",
    sunday: "Closed",
  },
  location: {
    address: "48 Ashworth Lane, Suite 3, Meridian District",
    city: "San Francisco, CA",
  },
  contact: {
    phone: "(415) 555-0142",
    email: "hello@lumieredental.com",
  },
  aiAssistantEnabled: true,
};

export const services: BusinessService[] = [
  {
    id: "svc-cleaning",
    name: "Signature Cleaning & Exam",
    description: "A thorough cleaning and full exam with digital imaging.",
    price: "$180",
    duration: "45 min",
  },
  {
    id: "svc-whitening",
    name: "Studio Whitening",
    description: "In-office whitening treatment, visible results same day.",
    price: "$450",
    duration: "60 min",
  },
  {
    id: "svc-invisalign",
    name: "Invisalign Consultation",
    description: "Custom treatment plan with 3D scanning, no molds.",
    price: "$150",
    duration: "30 min",
  },
  {
    id: "svc-veneers",
    name: "Porcelain Veneers",
    description: "Handcrafted veneers designed and fitted in-studio.",
    price: "From $1,200 / tooth",
    duration: "Multiple visits",
  },
  {
    id: "svc-emergency",
    name: "Same-Day Emergency Visit",
    description: "Priority slot for urgent pain or dental trauma.",
    price: "$220",
    duration: "30–45 min",
  },
];

export const faqs: FAQ[] = [
  {
    question: "Do you accept dental insurance?",
    answer:
      "We accept most major PPO plans and can provide a superbill for out-of-network reimbursement.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "Routine visits are usually available within 3–5 business days. Emergencies are seen same-day.",
  },
  {
    question: "Is parking available?",
    answer: "Yes, complimentary valet parking is available at the studio entrance.",
  },
  {
    question: "Do you treat dental anxiety?",
    answer:
      "Yes — we offer a calm, sensory-considerate environment and optional sedation options.",
  },
];
