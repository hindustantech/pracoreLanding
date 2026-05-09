import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from './analytics/pixel';

const RouteTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  return null;
};

export default RouteTracker;