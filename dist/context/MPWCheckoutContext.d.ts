import React from 'react';
import { IRequestBody, MPWCheckoutProviderProps } from '../types/global.types';
interface InitiatePaymentParams {
    requestBody: IRequestBody;
    onSuccess?: (data: any) => void;
    onFailure?: (error: any) => void;
    onClose?: (data: any) => void;
    displayMode?: 'inline' | 'popup';
}
interface MPWCheckoutContextType {
    publicKey: string;
    isOpen: boolean;
    isLoading: boolean;
    orderReferenceCode: string | null;
    popupWindow: Window | null;
    initiatePayment: (params: InitiatePaymentParams) => Promise<void>;
    setIsOpen: (isOpen: boolean) => void;
}
export declare const useMPWCheckout: () => MPWCheckoutContextType;
export declare const MPWCheckoutProvider: React.FC<MPWCheckoutProviderProps>;
export {};
