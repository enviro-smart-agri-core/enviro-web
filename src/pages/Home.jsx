import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import styles from '../styles/home.module.css';
import kittenImg from '/assets/lmao.png';
import firstImg from '/assets/firstImg.jpg';
import dashboardImg from '/assets/image(1).png';
import { ShieldCheck, Thermometer, Waves } from 'lucide-react';
import { isLoggedIn } from '../utils/checker(scrapped)';

const Hero = () => {
  const loggedIn = isLoggedIn();

  return (
    <section className={styles.box1}>
      <h2 className={styles.left}>Urban Agriculture, Fully Autonomous.</h2>
      <p className={`${styles.left} ${styles.delay1}`}>
        Transform any balcony or rooftop into a self-sustaining micro-farm. Enviro combines industrial edge nodes with AI diagnostics to automate your irrigation, saving municipal water and optimizing crop health without human intervention.
      </p>

      {loggedIn ? (
        <Link to="/dashboard" className={`${styles.hype} ${styles.left} ${styles.delay2}`}>
          Go to Dashboard
        </Link>
      ) : (
        <Link to="/signup" className={`${styles.hype} ${styles.left} ${styles.delay2}`}>
          <i className="fi fi-rr-sign-in-alt"></i> Register Now!
        </Link>
      )}

      <img src={firstImg} alt="korsy" className={`${styles.reveal} ${styles.delay1}`} />
    </section>
  );
};

const SmartSensors = () => (
  <section className={styles.box2}>
    <h2 className={`${styles.heading} ${styles.up}`}>Smart Sensors</h2>
    <p className={`${styles.paragraph} ${styles.up} ${styles.delay1}`}>
      Illustrate and monitor our screen-integrated sensors and data to track soil status, humidity, and temperature directly from your smartphone.
    </p>

    <div className={styles.features}>
      <div className={`${styles.feature} ${styles.bounce} ${styles.delay1}`}>
        <ShieldCheck size={70} color="#05442f" strokeWidth={1} />
        <p>Soil Status</p>
      </div>
      <div className={`${styles.feature} ${styles.bounce} ${styles.delay2}`}>
        <Thermometer size={70} color="#05442f" strokeWidth={1} />
        <p>Temperature</p>
      </div>
      <div className={`${styles.feature} ${styles.bounce} ${styles.delay3}`}>
        <Waves size={70} color="#05442f" strokeWidth={2} />
        <p>Humidity</p>
      </div>
    </div>
  </section>
);

const DashboardPreview = () => (
  <section className={styles.box3}>
    <img src={dashboardImg} alt="dashboard" className={styles.reveal} />
    <h2 className={styles.right}>Personalized Dashboard</h2>
    <p className={`${styles.right} ${styles.delay1}`}>
      Track vital plant signs using advanced sensors for moisture and humidity. Our intelligent system provides energy-efficient monitoring to help you manage your garden effectively.
    </p>
  </section>
);

const Story = () => (
  <section className={styles.box4}>
    <img src={kittenImg} alt="kittenimg" className={`${styles.reveal} ${styles.delay1}`} />
    <h2 className={styles.left}>Our Story</h2>
    <p className={`${styles.left} ${styles.delay1}`}>
      What started as a graduation project by a team of developers in Alexandria quickly evolved into a mission to modernize urban agriculture. We saw a massive gap between everyday nature and modern technology, so we decided to connect the dirt to the cloud.
    </p>
  </section>
);

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.slay);
        }
      });
    }, { threshold: 0 });

    const hiddenElements = document.querySelectorAll(
      `.${styles.left}, .${styles.right}, .${styles.up}, .${styles.bounce}, .${styles.reveal}`
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