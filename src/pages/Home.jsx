import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import styles from '../styles/home.module.css';
import kittenImg from '/assets/lmao.png';
import firstImg from '/assets/firstImg.jpg';
import dashboardImg from '/assets/image(1).png';
import { ShieldCheck, Thermometer, Waves } from 'lucide-react';

const Hero = () => (
  <section className={styles.sector1}>
    <h2 className={styles['hidden-left']}>Urban Agriculture, Fully Autonomous.</h2>
    <p className={`${styles['hidden-left']} ${styles['delay-1']}`}>
      Transform any balcony or rooftop into a self-sustaining micro-farm. Enviro combines industrial edge nodes with AI diagnostics to automate your irrigation, saving municipal water and optimizing crop health without human intervention.
    </p>
    <Link to="../signup" className={`${styles.btn} ${styles['hidden-left']} ${styles['delay-2']}`}>
      <i className="fi fi-rr-sign-in-alt"></i> Register Now!
    </Link>
    <img src={firstImg} alt="korsy" className={`${styles['hidden-reveal']} ${styles['delay-1']}`} />
  </section>
);

const SmartSensors = () => (
  <section className={styles.sector2}>
    <h2 className={`${styles['sec2-head']} ${styles['hidden-up']}`}>Smart Sensors</h2>
    <p className={`${styles['sec2-para']} ${styles['hidden-up']} ${styles['delay-1']}`}>
      Illustrate and monitor our screen-integrated sensors and data to track soil status, humidity, and temperature directly from your smartphone.
    </p>

    <div className={styles['sec2-features']}>
      <div className={`${styles['feature-item']} ${styles['hidden-bounce']} ${styles['delay-1']}`}>
        <ShieldCheck size={70} color="#05442f" strokeWidth={1} />
        <p>Soil Status</p>
      </div>
      <div className={`${styles['feature-item']} ${styles['hidden-bounce']} ${styles['delay-2']}`}>
        <Thermometer size={70} color="#05442f" strokeWidth={1} />
        <p>Temperature</p>
      </div>
      <div className={`${styles['feature-item']} ${styles['hidden-bounce']} ${styles['delay-3']}`}>
        <Waves size={70} color="#05442f" strokeWidth={2} />
        <p>Humidity</p>
      </div>
    </div>
  </section>
);

const DashboardPreview = () => (
  <section className={styles.sector3}>
    <img src={dashboardImg} alt="dashboard" className={styles['hidden-reveal']} />
    <h2 className={styles['hidden-right']}>Personalized Dashboard</h2>
    <p className={`${styles['hidden-right']} ${styles['delay-1']}`}>
      Track vital plant signs using advanced sensors for moisture and humidity. Our intelligent system provides energy-efficient monitoring to help you manage your garden effectively.
    </p>
  </section>
);

const Story = () => (
  <section className={styles.sector4}>
    <img src={kittenImg} alt="kittenimg" className={`${styles['hidden-reveal']} ${styles['delay-1']}`} />
    <h2 className={styles['hidden-left']}>Our Story</h2>
    <p className={`${styles['hidden-left']} ${styles['delay-1']}`}>
      What started as a graduation project by a team of developers in Alexandria quickly evolved into a mission to modernize urban agriculture. We saw a massive gap between everyday nature and modern technology, so we decided to connect the dirt to the cloud.
    </p>
  </section>
);

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the hashed 'show' class from the CSS module
          entry.target.classList.add(styles.show);
        }
      });
    }, { threshold: 0 });

    // Look for elements using the hashed class names from the module
    const hiddenElements = document.querySelectorAll(
      `.${styles['hidden-left']}, .${styles['hidden-right']}, .${styles['hidden-up']}, .${styles['hidden-bounce']}, .${styles['hidden-reveal']}`
    );

    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Hero />
      <SmartSensors />
      <DashboardPreview />
      <Story />
    </main>
  );
}