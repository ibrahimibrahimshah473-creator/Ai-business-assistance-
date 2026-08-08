import Link from "next/link";
import styles from "./landing.module.css";

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={`container ${styles.ctaInner}`}>
        <h2 className={styles.sectionTitle}>See it running your business</h2>
        <p className={styles.sectionSub}>
          This is a portfolio demo — the same architecture can be configured for your
          real services, pricing and hours in a few hours of setup.
        </p>
        <div className={styles.heroActions}>
          <a href="#demo" className="btn btn-primary">
            Try the demo
          </a>
          <Link href="/dashboard" className="btn btn-secondary">
            Explore the dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
