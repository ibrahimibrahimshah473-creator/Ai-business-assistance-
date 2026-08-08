import styles from "./landing.module.css";

const steps = [
  { label: "Customer message", detail: "Visitor asks a question in chat" },
  { label: "AI assistant", detail: "Detects intent in real time" },
  { label: "Knowledge base", detail: "Matches services, pricing, hours" },
  { label: "Lead qualification", detail: "Recognizes buying signals" },
  { label: "Lead saved", detail: "Stored instantly in dashboard" },
  { label: "Appointment / handoff", detail: "Booked, or passed to your team" },
];

export default function WorkflowVisualization() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className="container">
        <span className="eyebrow">How it works</span>
        <h2 className={styles.sectionTitle}>From question to booked appointment</h2>

        <div className={styles.workflow}>
          {steps.map((step, i) => (
            <div className={styles.workflowStep} key={step.label}>
              <div className={styles.workflowNode}>
                <span className={styles.workflowIndex}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.label}</h3>
                <p>{step.detail}</p>
              </div>
              {i < steps.length - 1 && <div className={styles.workflowConnector} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
