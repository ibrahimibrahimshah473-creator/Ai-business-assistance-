import Link from "next/link";
import styles from "./landing.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <span className="eyebrow">AI Business Assistant — Demo</span>
          <h1 className={styles.heroTitle}>
            Every customer question,
            <br />
            answered before you wake up.
          </h1>
          <p className={styles.heroSub}>
            A conversational assistant that knows your business, answers like your best
            front-desk hire, and quietly turns visitors into booked appointments —
            24 hours a day.
          </p>
          <div className={styles.heroActions}>
            <a href="#demo" className="btn btn-primary">
              Try the live demo
            </a>
            <Link href="/dashboard" className="btn btn-secondary">
              See the dashboard
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div>
              <strong>24/7</strong>
              <span>Always responding</span>
            </div>
            <div>
              <strong>&lt;2s</strong>
              <span>Average reply time</span>
            </div>
            <div>
              <strong>0</strong>
              <span>Missed leads</span>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={`${styles.heroBubble} ${styles.bubbleUser}`}>
            Do you have any openings this week?
          </div>
          <div className={`${styles.heroBubble} ${styles.bubbleAssistant}`}>
            Yes — I have Thursday at 2:30 PM or Friday at 10:00 AM. Which works better?
          </div>
          <div className={styles.heroTyping}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
