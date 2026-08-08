import styles from "./landing.module.css";

const cases = [
  { name: "Dental & medical clinics", detail: "Answer insurance and pricing questions, book visits." },
  { name: "Salons & spas", detail: "Handle service questions and capture booking requests after hours." },
  { name: "Boutique agencies", detail: "Qualify inbound leads before a human ever joins the thread." },
  { name: "Local service businesses", detail: "Never miss a call-in question again, even overnight." },
];

export default function UseCases() {
  return (
    <section id="use-cases" className={styles.section}>
      <div className="container">
        <span className="eyebrow">Use cases</span>
        <h2 className={styles.sectionTitle}>One assistant, many front desks</h2>
        <div className={styles.useCaseGrid}>
          {cases.map((c) => (
            <div key={c.name} className={`card ${styles.useCaseCard}`}>
              <h3>{c.name}</h3>
              <p>{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
