"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./landing.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`${styles.nav} glass`}>
      <div className={`container ${styles.navInner}`}>
        <Link href="/" className={styles.logo}>
          Lumière <span>AI</span>
        </Link>

        <nav className={styles.navLinksDesktop} aria-label="Primary">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#use-cases">Use cases</a>
          <Link href="/dashboard">Dashboard</Link>
        </nav>

        <div className={styles.navActionsDesktop}>
          <Link href="/appointments" className="btn btn-ghost">
            Book demo
          </Link>
          <Link href="/dashboard" className="btn btn-primary">
            View dashboard
          </Link>
        </div>

        <button
          className={styles.navToggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className={styles.navMobile}>
          <a href="#features" onClick={() => setOpen(false)}>
            Features
          </a>
          <a href="#how-it-works" onClick={() => setOpen(false)}>
            How it works
          </a>
          <a href="#use-cases" onClick={() => setOpen(false)}>
            Use cases
          </a>
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <Link href="/appointments" onClick={() => setOpen(false)}>
            Book demo
          </Link>
        </div>
      )}
    </header>
  );
}
