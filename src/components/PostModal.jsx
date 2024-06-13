import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const PostModal = ({ onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onClose}
      ></div>
      <div className='bg-white rounded shadow-lg p-8 z-50'>{children}</div>
    </div>,
    document.body,
  );
};

export default PostModal;
