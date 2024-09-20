// MPWCheckoutModal.tsx
import React from 'react';
import { messageOrigin } from './utils/constant';

interface MPWCheckoutModalProps {
  isOpen: boolean;
  orderReferenceCode: string | null;
}

export const MPWCheckoutModal: React.FC<MPWCheckoutModalProps> = ({ isOpen, orderReferenceCode }) => {
  if (!isOpen || !orderReferenceCode) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <iframe
        src={`${messageOrigin}/popup/${orderReferenceCode}`}
        style={{
          border: 'none',
          background: 'transparent',
          width: '100%',
          height: '100vh'
        }}
        title="MPWCheckout"
      />
    </div>
  );
};