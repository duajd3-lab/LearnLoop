import React, { useEffect, useState } from 'react';

function TopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const moveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button className="topBtn" onClick={moveTop}>
  <span className="material-symbols-rounded">
    keyboard_arrow_up
  </span>
</button>
  );
}

export default TopButton;