"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./dashboard.module.css";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/appointments", label: "Appointments" },
  { href: "/settings", label: "Settings" },
];

export default function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.shellLogo}>
          Lumière <span>AI</span>
        </Link>
        <nav aria-label="App navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? styles.navLinkActive : styles.navLink}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className={styles.backLink}>
          ← Back to site
        </Link>
      </aside>

      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {children}
      </main>
    </div>
  );
}
