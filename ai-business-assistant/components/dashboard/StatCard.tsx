import styles from "./dashboard.module.css";

export default function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className={`card ${styles.statCard}`}>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
      {hint && <p className={styles.statHint}>{hint}</p>}
    </div>
  );
}
