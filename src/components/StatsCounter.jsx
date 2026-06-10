import { useEffect, useState, useRef } from 'react';

export default function StatsCounter() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section fade-in" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          <StatCard inView={inView} endValue={500} label="Happy Customers" icon="😊" />
          <StatCard inView={inView} endValue={16} label="Products Available" icon="🎂" />
          <StatCard inView={inView} endValue={5} label="Years of Baking" icon="⭐" />
          <StatCard inView={inView} endValue={1000} label="Orders Delivered" icon="📦" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ inView, endValue, label, icon }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = endValue / (duration / 16); // 60fps

    const animate = () => {
      start += increment;
      if (start < endValue) {
        setCount(Math.ceil(start));
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, endValue]);

  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <div className="stat-number">{count}+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
