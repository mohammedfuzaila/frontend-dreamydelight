import { useEffect, useState, useRef } from 'react';
import { API_BASE_URL } from '../utils/api';

export default function StatsCounter() {
  const [inView, setInView] = useState(false);
  const [stats, setStats] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/public/stats/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setStats(data);
        }
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

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

  const defaultStats = [
    { id: 'd1', title: 'Happy Customers', value: '500+', icon: 'fas fa-smile' },
    { id: 'd2', title: 'Products Available', value: '16+', icon: 'fas fa-birthday-cake' },
    { id: 'd3', title: 'Years of Baking', value: '5+', icon: 'fas fa-star' },
    { id: 'd4', title: 'Orders Delivered', value: '1000+', icon: 'fas fa-box' }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <section className="stats-section fade-in" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {displayStats.map(s => (
            <StatCard key={s.id} inView={inView} value={s.value} label={s.title} icon={s.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ inView, value, label, icon }) {
  return (
    <div className={`stat-card ${inView ? 'visible' : ''}`} style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s ease' }}>
      <span className="stat-icon">
        {icon.startsWith('fa') || icon.startsWith('fas') ? <i className={icon}></i> : icon}
      </span>
      <div className="stat-number">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
