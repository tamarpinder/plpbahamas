import React, { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ModalPortalContext = createContext(null);

export const ModalPortalProvider = ({ children }) => {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    // Find the phone modal root element
    const root = document.getElementById('phone-modal-root');
    setModalRoot(root);
  }, []);

  return (
    <ModalPortalContext.Provider value={modalRoot}>
      {children}
    </ModalPortalContext.Provider>
  );
};

export const useModalPortal = () => {
  const modalRoot = useContext(ModalPortalContext);
  return modalRoot;
};

// Custom hook for creating portals within the phone container
export const usePhonePortal = (children) => {
  const modalRoot = useModalPortal();
  
  if (!modalRoot || !children) {
    return null;
  }
  
  return createPortal(children, modalRoot);
};

// HOC for wrapping components that need to render in phone container
export const withPhonePortal = (Component) => {
  return (props) => {
    const modalRoot = useModalPortal();
    
    if (!modalRoot) {
      return null;
    }
    
    return createPortal(<Component {...props} />, modalRoot);
  };
};

export default ModalPortalContext;