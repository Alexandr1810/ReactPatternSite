import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = 'auto';

    html.scrollTop = 0;
    document.body.scrollTop = 0;

    return () => {
        html.style.scrollBehavior = '';
    };
  }, [pathname]);


  return null;
}
export default ScrollToTop;