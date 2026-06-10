import { useEffect, useState } from 'react';

/**
 * #6 Scroll progress bar + #7 Floating WhatsApp FAB + #10 Back-to-top
 * All three are fixed-position UI helpers that track scroll state.
 */
export default function ScrollHelpers() {
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setScrollPct(pct);
      setShowTop(scrolled > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* Floating WhatsApp FAB */}
      <a
        className="fab-whatsapp"
        href="https://wa.me/919042360621"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp to order"
      >
        <i className="fab fa-whatsapp" />
        <span className="fab-tooltip">Chat to Order! 🎂</span>
      </a>

      {/* Back-to-top */}
      <button
        className={`back-to-top${showTop ? ' visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
}
