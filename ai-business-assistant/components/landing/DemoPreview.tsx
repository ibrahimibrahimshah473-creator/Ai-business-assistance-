import ChatWidget from "@/components/chat/ChatWidget";
import styles from "./landing.module.css";

export default function DemoPreview() {
  return (
    <section id="demo" className={styles.section}>
      <div className="container">
        <span className="eyebrow">Live demo</span>
        <h2 className={styles.sectionTitle}>Talk to the assistant yourself</h2>
        <p className={styles.sectionSub}>
          This is running on the mock AI engine — try asking about pricing, hours, or say
          you&rsquo;d like to book.
        </p>
        <div className={styles.demoFrame}>
          <ChatWidget variant="inline" />
        </div>
      </div>
    </section>
  );
}
