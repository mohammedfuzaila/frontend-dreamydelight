import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageWrapper({ children }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      // eslint-disable-next-line
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={transitionStage === 'fadeIn' ? 'page-enter-active' : 'page-exit-active'}
      onAnimationEnd={handleAnimationEnd}
      onTransitionEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
}
