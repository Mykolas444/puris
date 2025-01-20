import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => { onClose();}, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg transition-all duration-300 ${type === 'success' ? 'bg-green-500 text-white' : type === 'error' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white' }`} >
      <div className="flex items-center justify-between">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
