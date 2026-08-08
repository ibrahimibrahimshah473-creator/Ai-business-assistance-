import styles from "./landing.module.css";

const features = [
  {
    title: "Understands your business",
    desc: "Trained on your services, prices, hours and FAQs — no generic small talk.",
  },
  {
    title: "Captures leads automatically",
    desc: "Recognizes buying intent mid-conversation and collects contact details naturally.",
  },
  {
    title: "Books real appointments",
    desc: "Walks visitors through service, date and time selection without leaving chat.",
  },
  {
    title: "Knows when to hand off",
    desc: "Escalates to a human the moment a conversation needs a person, not a bot.",
  },
  {
    title: "Built to upgrade",
    desc: "Starts on a mock engine, swaps in a real LLM API with a single file change.",
  },
  {
    title: "Full visibility",
    desc: "Every conversation and lead lands in a dashboard your team already trusts.",
  },
];

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className="container">
        <span className="eyebrow">Features</span>
        <h2 className={styles.sectionTitle}>Built for how customers actually ask</h2>
        <div className={styles.featureGrid}>
          {features.map((f) => (
            <div key={f.title} className={`card ${styles.featureCard}`}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
