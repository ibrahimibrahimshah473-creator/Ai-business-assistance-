"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/dashboard/AppShell";
import LeadsTable from "@/components/dashboard/LeadsTable";
import StatCard from "@/components/dashboard/StatCard";
import styles from "@/components/dashboard/dashboard.module.css";
import { getAppointments, getLeads, seedDemoDataIfEmpty } from "@/lib/storage";
import { Appointment, Lead } from "@/lib/types";

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    seedDemoDataIfEmpty();
    setLeads(getLeads());
    setAppointments(getAppointments());
  }, []);

  const newLeads = leads.filter((l) => l.status === "new").length;
  const conversations = leads.length; // in this demo, 1 chat lead ≈ 1 conversation

  return (
    <AppShell title="Dashboard" subtitle="A live view of conversations, leads and bookings.">
      <div className={styles.statGrid}>
        <StatCard label="Total leads" value={leads.length} hint={leads.length > 0 ? "+ this session" : undefined} />
        <StatCard label="New leads" value={newLeads} />
        <StatCard label="Conversations" value={conversations} />
        <StatCard label="Appointments" value={appointments.length} />
      </div>

      <div className={styles.sectionGap}>
        <h2>Recent leads</h2>
        <LeadsTable leads={leads} />
      </div>
    </AppShell>
  );
}
