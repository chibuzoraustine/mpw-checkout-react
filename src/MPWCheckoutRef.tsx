// MPWCheckout.tsx
import React from 'react';
import { MPWCheckoutRefProps } from './types/global.types';
import { useMPWCheckout } from './context/MPWCheckoutContext';
import { MPWCheckoutRefButton } from './MPWCheckoutRefButton';
import { MPWCheckoutModal } from './MPWCheckoutModal';

const MPWCheckoutRef: React.FC<MPWCheckoutRefProps> = ({ 
  children, 
  orderReferenceCode, 
  onSuccess, 
  onFailure, 
  displayMode = 'inline' 
}) => {
  const { 
    isLoading, 
    payReference, 
    isOpen, 
    orderReferenceCode: refCode, 
  } = useMPWCheckout();

  const handlePayReference = () => {
    payReference({orderReferenceCode, onSuccess, onFailure, displayMode});
  };

  return (
    <>
      <MPWCheckoutRefButton onClick={handlePayReference} isLoading={isLoading}>
        {children} 
      </MPWCheckoutRefButton>
      {displayMode === 'inline' && (
        <MPWCheckoutModal isOpen={isOpen} orderReferenceCode={refCode} />
      )}
    </>
  );
};

export default MPWCheckoutRef;