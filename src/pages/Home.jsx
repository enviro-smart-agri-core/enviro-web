import { useEffect, useRef } from 'react';

import kittenImg from '/assets/lmao.png';
import firstImg from '/assets/firstImg.jpg';
import dashboardImg from '/assets/image(1).png';
import { ShieldCheck, Thermometer, Waves } from 'lucide-react';




const Hero = () => (
  <section className="sector1">
    <h2 className="hidden-left">Urban Agriculture, Fully Autonomous.</h2>
    <p className="hidden-left delay-1">Transform any balcony or rooftop into a self-sustaining micro-farm. Enviro combines industrial edge nodes with AI diagnostics to automate your irrigation, saving municipal water and optimizing crop health without human intervention.</p>
    <a href="#" className="btn hidden-left delay-2"><i className="fi fi-rr-sign-in-alt"></i> Register Now!</a>
    <img src={firstImg} alt="korsy" className="hidden-reveal delay-1" />
  </section>
);

const SmartSensors = () => (
  <section className="sector2">
    <h2 className="sec2-head hidden-up">Smart Sensors</h2>
    <p className="sec2-para hidden-up delay-1">
      Illustrate and monitor our screen-integrated sensors and data to track soil status, humidity, and temperature directly from your smartphone.
    </p>

    <div className="sec2-features">
      <div className="feature-item hidden-bounce delay-1">
        <ShieldCheck size={70} color="#05442f" strokeWidth={1} />
        <p>Soil Status</p>
      </div>
      <div className="feature-item hidden-bounce delay-2">
        <Thermometer size={70} color="#05442f" strokeWidth={1} />
        <p>Temperature</p>
      </div>
      <div className="feature-item hidden-bounce delay-3">
        <Waves size={70} color="#05442f" strokeWidth={2} />
        <p>Humidity</p>
      </div>
    </div>
  </section>
);

const DashboardPreview = () => (
  <section className="sector3">
    <img src={dashboardImg} alt="dashboard" className="hidden-reveal" />
    <h2 className="hidden-right">Personalized Dashboard</h2>
    <p className="hidden-right delay-1">Track vital plant signs using advanced sensors for moisture and humidity. Our intelligent system provides energy-efficient monitoring to help you manage your garden effectively.</p>
  </section>
);

const Story = () => (
  <section className="sector4">
    <img src={kittenImg} alt="kittenimg" className="hidden-reveal delay-1" />
    <h2 className="hidden-left">Our Story</h2>
    <p className="hidden-left delay-1">What started as a graduation project by a team of developers in Alexandria quickly evolved into a mission to modernize urban agriculture. We saw a massive gap between everyday nature and modern technology, so we decided to connect the dirt to the cloud.</p>
  </section>
);

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0 });

    const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-up, .hidden-bounce, .hidden-reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main >
      <Hero />
      <SmartSensors />
      <DashboardPreview />
      <Story />
    </main>
  );
}