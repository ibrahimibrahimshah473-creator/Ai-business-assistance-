"use client";

import { useState } from "react";
import AppShell from "@/components/dashboard/AppShell";
import { business, services } from "@/lib/business-data";
import styles from "./settings.module.css";

export default function SettingsPage() {
  const [aiEnabled, setAiEnabled] = useState(business.aiAssistantEnabled);

  return (
    <AppShell title="Settings" subtitle="Mock configuration — this is what powers the assistant's answers.">
      <div className={styles.grid}>
        <section className={`card ${styles.panel}`}>
          <h2>Business profile</h2>
          <dl className={styles.dl}>
            <div>
              <dt>Name</dt>
              <dd>{business.name}</dd>
            </div>
            <div>
              <dt>Tagline</dt>
              <dd>{business.tagline}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>
                {business.location.address}, {business.location.city}
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{business.contact.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{business.contact.email}</dd>
            </div>
          </dl>
        </section>

        <section className={`card ${styles.panel}`}>
          <h2>Business hours</h2>
          <dl className={styles.dl}>
            <div>
              <dt>Mon – Fri</dt>
              <dd>{business.hours.weekdays}</dd>
            </div>
            <div>
              <dt>Saturday</dt>
              <dd>{business.hours.saturday}</dd>
            </div>
            <div>
              <dt>Sunday</dt>
              <dd>{business.hours.sunday}</dd>
            </div>
          </dl>
        </section>

        <section className={`card ${styles.panel}`}>
          <h2>Services</h2>
          <ul className={styles.serviceList}>
            {services.map((s) => (
              <li key={s.id}>
                <span>{s.name}</span>
                <span className={styles.mono}>{s.price}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`card ${styles.panel}`}>
          <h2>AI assistant</h2>
          <div className={styles.toggleRow}>
            <div>
              <p className={styles.toggleLabel}>Assistant status</p>
              <p className={styles.toggleHint}>
                {aiEnabled ? "Live — responding to visitors now" : "Paused — chat widget hidden"}
              </p>
            </div>
            <button
              role="switch"
              aria-checked={aiEnabled}
              className={`${styles.toggle} ${aiEnabled ? styles.toggleOn : ""}`}
              onClick={() => setAiEnabled((v) => !v)}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>
          <p className={styles.note}>
            This is a mock toggle for the demo. In a connected version, this would enable or
            disable the live API integration.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
