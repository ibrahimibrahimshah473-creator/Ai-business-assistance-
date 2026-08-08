// This module is the ONLY place that talks to localStorage.
// Why: when you're ready to move to a real database (e.g. Postgres +
// an API route, or Supabase), you only rewrite the functions in this
// one file. Every component that calls getLeads() / addLead() etc.
// stays exactly the same.

import { Appointment, Lead } from "./types";

const LEADS_KEY = "aba_leads";
const APPOINTMENTS_KEY = "aba_appointments";

function isBrowser() {
  return typeof window !== "undefined";
}

function read<T>(key: string): T[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

// ---------- Leads ----------

export function getLeads(): Lead[] {
  return read<Lead>(LEADS_KEY).sort((a, b) => b.createdAt - a.createdAt);
}

export function addLead(lead: Omit<Lead, "id" | "createdAt" | "status">): Lead {
  const newLead: Lead = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    status: "new",
    createdAt: Date.now(),
  };
  const existing = read<Lead>(LEADS_KEY);
  write(LEADS_KEY, [...existing, newLead]);
  return newLead;
}

// ---------- Appointments ----------

export function getAppointments(): Appointment[] {
  return read<Appointment>(APPOINTMENTS_KEY).sort((a, b) => b.createdAt - a.createdAt);
}

export function addAppointment(
  appointment: Omit<Appointment, "id" | "createdAt">
): Appointment {
  const newAppointment: Appointment = {
    ...appointment,
    id: `appt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
  };
  const existing = read<Appointment>(APPOINTMENTS_KEY);
  write(APPOINTMENTS_KEY, [...existing, newAppointment]);
  return newAppointment;
}

export function seedDemoDataIfEmpty() {
  if (!isBrowser()) return;
  const leads = read<Lead>(LEADS_KEY);
  if (leads.length === 0) {
    const demoLeads: Lead[] = [
      {
        id: "lead_demo_1",
        name: "Priya Nataraj",
        email: "priya.n@example.com",
        phone: "(415) 555-0110",
        service: "Invisalign Consultation",
        status: "qualified",
        source: "chat",
        createdAt: Date.now() - 1000 * 60 * 60 * 6,
      },
      {
        id: "lead_demo_2",
        name: "Marcus Webb",
        email: "marcus.webb@example.com",
        phone: "(415) 555-0187",
        service: "Studio Whitening",
        status: "new",
        source: "chat",
        createdAt: Date.now() - 1000 * 60 * 60 * 22,
      },
      {
        id: "lead_demo_3",
        name: "Elena Torres",
        email: "elena.t@example.com",
        phone: "(415) 555-0199",
        service: "Porcelain Veneers",
        status: "booked",
        source: "appointment",
        createdAt: Date.now() - 1000 * 60 * 60 * 48,
      },
    ];
    write(LEADS_KEY, demoLeads);
  }
}
