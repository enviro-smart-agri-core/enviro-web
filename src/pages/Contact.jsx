// src/pages/Contact.jsx
import React from 'react';
import styles from '../styles/contact.module.css';
import { Mail, Phone, MapPin } from 'lucide-react'; // 🌟 Converted your icons to React components!

export default function Contact() {
  return (
    <main className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.firstPart}>
        <div className={styles.firstPartContent}>
          <span className={styles.smallbox}>INQUIRY & CONNECTION</span>
          <h1>Connect with the Arboretum.</h1>
          <p>Our Agents are ready to assist you in cultivating your digital landscape. Reach out for technical support, partnership inquiries, or general stewardship questions.</p>
        </div>
        <div className={styles.illImage}>
          {/* Ensure these images are in your public/assets folder! */}
          <img src="/assets/Contact_us-bro_1.png" alt="People interacting with digital communication devices" />
        </div>
      </section>

      {/* Quote Section */}
      <section className={styles.underTopQuote}>
        <h2>“Your Opinion Matters To Us”</h2>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        {/* Support Info Panel */}
        <div className={styles.info}>
          <h3>Enviro Support</h3>

          <div className={styles.method}>
            <div className={styles.icon}><Mail size={20} /></div>
            <div className={styles.details}>
              <h4>EMAIL OUR AGENTS</h4>
              <p>Enviro@gmail.com</p>
            </div>
          </div>

          <div className={styles.method}>
            <div className={styles.icon}><Phone size={20} /></div>
            <div className={styles.details}>
              <h4>TALK WITH US</h4>
              <p>+20 1507446099</p>
            </div>
          </div>

          <div className={styles.method}>
            <div className={styles.icon}><MapPin size={20} /></div>
            <div className={styles.details}>
              <h4>OUR GREENHOUSE OFFICE</h4>
              <p>42 Fernwood Lande,<br />Cascadia Arboretum, WA 98001</p>
            </div>
          </div>

          <div className={styles.supportCards}>
            <div className={`${styles.card} ${styles.availability}`}>
              <h4>AVAILABILITY</h4>
              <p>Mon - Fri<br />09:00 - 17:00 EG</p>
            </div>
            <div className={`${styles.card} ${styles.social}`}>
              <h4>SOCIAL</h4>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Mail</a></li>
                <li><a href="#">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className={styles.contactForm}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">FULL NAME</label>
                <input type="text" id="fullName" name="fullName" placeholder="E.g Youssef Elshenawy" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">EMAIL ADDRESS</label>
                <input type="email" id="email" name="email" placeholder="E.g Enviro@gmail.com" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="topic">TOPIC OF INQUIRY</label>
              <select id="topic" name="topic">
                <option value="general">General Question</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="How can we cultivate your vision?"></textarea>
            </div>

            <div className={styles.formFooter}>
              <p>By sending this message, you agree to our Arboretum Privacy Framework.</p>
              <button type="submit">Send Message &rarr;</button>
            </div>
          </form>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterCard}>
          <div className={styles.newsletterContent}>
            <h2>Join the Journal.</h2>
            <p>Receive bi-weekly insights on agricultural innovation and digital sustainability, delivered directly to your field office.</p>
            <form className={styles.subscribeForm} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="steward@domain.com" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className={styles.newsletterImage}>
          <img src="/assets/brand_communication-bro_1.png" alt="Illustration of digital sustainability insights" />
        </div>
      </section>
    </main>
  );
}