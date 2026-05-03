// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/about.module.css';
import { Droplets, ThermometerSun, Globe } from 'lucide-react'; 

export default function About() {
  return (
    <main className={styles.wrapper}>
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.aboutContent}>
          <span className={styles.smallbox}>OUR STORY</span>
          <h1>Connecting the Dirt to the Cloud.</h1>
          <p>
            What started as a graduation project by a team of developers in Alexandria quickly evolved into a
            mission to modernize urban agriculture. We saw a massive gap between everyday nature and modern
            technology, so we decided to build a bridge.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.missionText}>
          <h2>Our Mission</h2>
          <p>
            We are here to serve the underserved home gardener with a complete, fully autonomous ecosystem. By
            eliminating guesswork through smart sensors and AI diagnostics, we make urban agriculture accessible
            to everyone.
          </p>
          <p>
            More than just technology, we are reconnecting a digital generation to their agricultural roots
            through gamified learning and community-driven farming.
          </p>
        </div>
        <div className={styles.missionImage}>
          {/* Make sure to drop this image into your public/assets/ folder! */}
          <img src="/assets/261325a697d7dd6467fd816a1216b97f.png" alt="Illustration of a digital greenhouse" />
        </div>
      </section>

      {/* Core Values Section */}
      <section className={styles.coreSection}>
        <h2>Our Vision for the Future</h2>
        <div className={styles.valuesGrid}>
          
          <div className={styles.valueCards}>
            <div className={styles.icon}><Droplets size={28} /></div>
            <h3>Resource Efficiency</h3>
            <p>Fighting the resource crisis by reducing water consumption through precision, real-time predictive hydration powered by AI.</p>
          </div>

          <div className={styles.valueCards}>
            <div className={styles.icon}><ThermometerSun size={28} /></div>
            <h3>Urban Cooling</h3>
            <p>Transforming unused balconies and rooftops into micro-jungles that actively offset the thermal impact of millions of AC units.</p>
          </div>

          <div className={styles.valueCards}>
            <div className={styles.icon}><Globe size={28} /></div>
            <h3>The Connected City</h3>
            <p>Starting with the Mediterranean 3-crop ecosystem, our goal is to scale from home gardens to enterprise farms, aligning with Egypt Vision 2030.</p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to grow smarter, together?</h2>
        <Link to="/signup" className={styles.btnPrimary}>
          Register Now!
        </Link>
      </section>

    </main>
  );
}