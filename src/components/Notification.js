// src/components/Notification.js
import React, { useEffect, useState } from 'react';

const Notification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return visible ? (
    <div className="notification">
      {message}
    </div>
  ) : null;
};

export default Notification;
