// MPWCheckout.tsx
import React from 'react';
import { MPWCheckoutProps } from './types/global.types';
import { useMPWCheckout } from './context/MPWCheckoutContext';
import { MPWCheckoutButton } from './MPWCheckoutButton';
import { MPWCheckoutModal } from './MPWCheckoutModal';

const MPWCheckout: React.FC<MPWCheckoutProps> = ({ 
  children, 
  requestBody, 
  onSuccess, 
  onFailure, 
  displayMode = 'inline' 
}) => {
  const { 
    isLoading, 
    initiatePayment, 
    isOpen, 
    orderReferenceCode, 
  } = useMPWCheckout();

  const handleInitiatePayment = () => {
    initiatePayment({requestBody, onSuccess, onFailure, displayMode});
  };

  return (
    <>
      <MPWCheckoutButton onClick={handleInitiatePayment} isLoading={isLoading}>
        {children} 
      </MPWCheckoutButton>
      {displayMode === 'inline' && (
        <MPWCheckoutModal isOpen={isOpen} orderReferenceCode={orderReferenceCode} />
      )}
    </>
  );
};

export default MPWCheckout;