import va from '@vercel/analytics';
import { useLayoutEffect } from 'react';

const VercelAnalytics = (props: Record<string, unknown> = {}) => {
  useLayoutEffect(() => {
    va.inject(props);
  }, []);

  return null;
};

export default VercelAnalytics;
