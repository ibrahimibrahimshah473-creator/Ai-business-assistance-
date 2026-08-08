import { Lead } from "@/lib/types";
import styles from "./dashboard.module.css";

const badgeClass: Record<Lead["status"], string> = {
  new: "badge badge-new",
  contacted: "badge badge-contacted",
  qualified: "badge badge-qualified",
  booked: "badge badge-booked",
};

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className={`card ${styles.emptyState}`}>
        <p className={styles.emptyTitle}>No leads yet</p>
        <p className={styles.emptyBody}>
          Leads captured from the chat widget or appointment form will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className={`card ${styles.tableCard}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td className={styles.mono}>{lead.email}</td>
              <td className={styles.mono}>{lead.phone}</td>
              <td>{lead.service}</td>
              <td>
                <span className={badgeClass[lead.status]}>{lead.status}</span>
              </td>
              <td className={styles.mono}>
                {new Date(lead.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
