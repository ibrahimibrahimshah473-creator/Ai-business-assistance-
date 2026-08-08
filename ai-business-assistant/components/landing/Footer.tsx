import Link from "next/link";
import styles from "./landing.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <span className={styles.logo}>
          Lumière <span>AI</span>
        </span>
        <nav aria-label="Footer">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/appointments">Appointments</Link>
          <Link href="/settings">Settings</Link>
        </nav>
        <span className={styles.footerNote}>Portfolio demo — mock data only.</span>
      </div>
    </footer>
  );
}
