"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { getAIResponse } from "@/lib/mock-ai-engine";
import { addLead } from "@/lib/storage";
import { ChatMessage } from "@/lib/types";
import styles from "./ChatWidget.module.css";

const WELCOME: ChatMessage = {
  id: "welcome",
  sender: "assistant",
  text: "Hi, I'm the Lumière assistant. Ask me about services, pricing, hours, or say you'd like to book a visit.",
  timestamp: Date.now(),
  quickReplies: ["What services do you offer?", "What are your prices?", "Book an appointment"],
};

interface ChatWidgetProps {
  variant?: "inline" | "floating";
}

export default function ChatWidget({ variant = "inline" }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [pendingService, setPendingService] = useState<string>("General inquiry");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  function pushMessage(msg: ChatMessage) {
    setMessages((prev) => [...prev, msg]);
  }

  function handleUserText(text: string) {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: "user",
      text,
      timestamp: Date.now(),
    };
    pushMessage(userMsg);
    setInput("");
    setIsTyping(true);

    // Simulated network/thinking delay makes the mock feel like a real
    // AI call. When you connect a real API, this setTimeout becomes an
    // actual fetch() to /api/chat.
    setTimeout(() => {
      const response = getAIResponse(text, messages);
      const assistantMsg: ChatMessage = {
        id: `a_${Date.now()}`,
        sender: "assistant",
        text: response.text,
        timestamp: Date.now(),
        quickReplies: response.quickReplies,
      };
      setIsTyping(false);
      pushMessage(assistantMsg);

      if (response.triggerLeadForm) {
        setPendingService(guessServiceFromText(text));
        setShowLeadForm(true);
      }
    }, 700 + Math.random() * 500);
  }

  function guessServiceFromText(text: string): string {
    const t = text.toLowerCase();
    if (t.includes("whiten")) return "Studio Whitening";
    if (t.includes("invisalign")) return "Invisalign Consultation";
    if (t.includes("veneer")) return "Porcelain Veneers";
    if (t.includes("clean")) return "Signature Cleaning & Exam";
    if (t.includes("emergency")) return "Same-Day Emergency Visit";
    return "General inquiry";
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handleUserText(input);
  }

  function handleLeadSubmit(lead: { name: string; email: string; phone: string; service: string }) {
    addLead({ ...lead, source: "chat" });
    setShowLeadForm(false);
    pushMessage({
      id: `sys_${Date.now()}`,
      sender: "assistant",
      text: `Thank you, ${lead.name.split(" ")[0]}! Your details are saved and our team will reach out shortly to confirm ${lead.service.toLowerCase()}.`,
      timestamp: Date.now(),
    });
  }

  return (
    <div className={`${styles.widget} card ${variant === "floating" ? styles.floating : ""}`}>
      <div className={styles.header}>
        <div className={styles.headerAvatar}>L</div>
        <div>
          <p className={styles.headerName}>Lumière Assistant</p>
          <p className={styles.headerStatus}>
            <span className={styles.statusDot} /> Online now
          </p>
        </div>
      </div>

      <div className={styles.messages} ref={scrollRef}>
        {messages.map((m) => (
          <div key={m.id}>
            <div className={m.sender === "user" ? styles.bubbleUser : styles.bubbleAssistant}>
              {m.text}
            </div>
            {m.quickReplies && (
              <div className={styles.quickReplies}>
                {m.quickReplies.map((q) => (
                  <button key={q} onClick={() => handleUserText(q)} className={styles.quickReply}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className={styles.typingIndicator} aria-label="Assistant is typing">
            <span />
            <span />
            <span />
          </div>
        )}

        {showLeadForm && (
          <LeadCaptureForm
            defaultService={pendingService}
            onCancel={() => setShowLeadForm(false)}
            onSubmit={handleLeadSubmit}
          />
        )}
      </div>

      <form className={styles.inputRow} onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          aria-label="Message"
        />
        <button type="submit" className="btn btn-primary" disabled={!input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}

function LeadCaptureForm({
  defaultService,
  onCancel,
  onSubmit,
}: {
  defaultService: string;
  onCancel: () => void;
  onSubmit: (lead: { name: string; email: string; phone: string; service: string }) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService);
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in name, email and phone to continue.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("That email doesn't look quite right.");
      return;
    }
    setError("");
    onSubmit({ name, email, phone, service });
  }

  return (
    <form className={styles.leadForm} onSubmit={submit} aria-label="Contact details">
      <p className={styles.leadFormTitle}>A couple of details, and we'll take it from here</p>

      <label>
        Full name
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Lee" />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jordan@email.com"
        />
      </label>
      <label>
        Phone
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(415) 555-0100" />
      </label>
      <label>
        Interested in
        <select value={service} onChange={(e) => setService(e.target.value)}>
          <option>General inquiry</option>
          <option>Signature Cleaning &amp; Exam</option>
          <option>Studio Whitening</option>
          <option>Invisalign Consultation</option>
          <option>Porcelain Veneers</option>
          <option>Same-Day Emergency Visit</option>
        </select>
      </label>

      {error && <p className={styles.leadFormError}>{error}</p>}

      <div className={styles.leadFormActions}>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Not now
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
