"use client";

import { FormEvent, useEffect, useState } from "react";
import AppShell from "@/components/dashboard/AppShell";
import styles from "@/components/dashboard/dashboard.module.css";
import { services } from "@/lib/business-data";
import { addAppointment, getAppointments } from "@/lib/storage";
import { Appointment } from "@/lib/types";
import apptStyles from "./appointments.module.css";

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [service, setService] = useState(services[0].name);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!date || !time || !name.trim() || !email.trim() || !phone.trim()) {
      setError("Please complete every field before submitting.");
      return;
    }
    setError("");
    const appt = addAppointment({ name, email, phone, service, date, time });
    setAppointments((prev) => [appt, ...prev]);
    setSuccess(true);
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setTime("");
  }

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <AppShell title="Appointments" subtitle="Book a demo visit — this uses the same mock storage as the chat widget.">
      <div className={apptStyles.grid}>
        <form className={`card ${apptStyles.form}`} onSubmit={handleSubmit}>
          <h2 className={apptStyles.formTitle}>Request an appointment</h2>

          <label className={apptStyles.field}>
            Service
            <select value={service} onChange={(e) => setService(e.target.value)}>
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} — {s.price}
                </option>
              ))}
            </select>
          </label>

          <div className={apptStyles.row}>
            <label className={apptStyles.field}>
              Date
              <input type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label className={apptStyles.field}>
              Time
              <select value={time} onChange={(e) => setTime(e.target.value)}>
                <option value="">Select a time</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className={apptStyles.field}>
            Full name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Lee" />
          </label>
          <div className={apptStyles.row}>
            <label className={apptStyles.field}>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jordan@email.com" />
            </label>
            <label className={apptStyles.field}>
              Phone
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(415) 555-0100" />
            </label>
          </div>

          {error && <p className={apptStyles.error}>{error}</p>}
          {success && <p className={apptStyles.success}>Appointment requested — see it listed to the right.</p>}

          <button type="submit" className="btn btn-primary">
            Request appointment
          </button>
        </form>

        <div className={apptStyles.list}>
          <h2 className={apptStyles.formTitle}>Upcoming (mock)</h2>
          {appointments.length === 0 ? (
            <div className={`card ${styles.emptyState}`}>
              <p className={styles.emptyTitle}>Nothing booked yet</p>
              <p className={styles.emptyBody}>Submit the form to see it appear here instantly.</p>
            </div>
          ) : (
            appointments.map((a) => (
              <div key={a.id} className={`card ${apptStyles.apptCard}`}>
                <div>
                  <p className={apptStyles.apptService}>{a.service}</p>
                  <p className={apptStyles.apptMeta}>{a.name} · {a.email}</p>
                </div>
                <div className={apptStyles.apptTime}>
                  <span>{a.date}</span>
                  <span>{a.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}

