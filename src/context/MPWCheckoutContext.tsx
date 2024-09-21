// MPWCheckoutContext.tsx
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { InitiatePaymentParams, MPWCheckoutContextType, MPWCheckoutProviderProps, PayReferenceParams } from '../types/global.types';
import { INFO_API_URL, INITIATE_API_URL, messageOrigin } from '../utils/constant';

const MPWCheckoutContext = createContext<MPWCheckoutContextType | undefined>(undefined);

export const useMPWCheckout = () => {
    const context = useContext(MPWCheckoutContext);
    if (!context) {
        throw new Error('useMPWCheckout must be used within a MPWCheckoutProvider');
    }
    return context;
};

export const MPWCheckoutProvider: React.FC<MPWCheckoutProviderProps> = ({
    children,
    publicKey = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [orderReferenceCode, setOrderReferenceCode] = useState<string | null>(null);
    const [popupWindow, setPopupWindow] = useState<Window | null>(null);

    const callbacksRef = useRef<{ onSuccess?: (data: any) => void, onFailure?: (error: any) => void, onClose?: (data: any) => void }>({});

    const initiatePayment = useCallback(async ({
        requestBody,
        onSuccess,
        onFailure,
        onClose,
        displayMode = 'inline'
    }: InitiatePaymentParams) => {
        setIsLoading(true);
        callbacksRef.current = { onSuccess, onFailure, onClose };
        try {
            const response = await fetch(INITIATE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${publicKey}`
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (!data.data || data.status === "failed" || !data.data.order_reference_code) {
                setIsLoading(false); 
                callbacksRef.current.onFailure?.({ data: undefined, message: "Error initiating payment" });
                return;
            }

            setOrderReferenceCode(data.data.order_reference_code);
            setIsOpen(true);

            if (displayMode === 'popup') {
                const width = 500;
                const height = 600;
                const left = (window.screen.width / 2) - (width / 2);
                const top = (window.screen.height / 2) - (height / 2);

                const newWindow = window.open(
                    `${messageOrigin}/popup/${data.data.order_reference_code}`,
                    "MPWCheckout",
                    `width=${width},height=${height},left=${left},top=${top}`
                );

                if (newWindow) {
                    setPopupWindow(newWindow);
                }
            }
        } catch (error) {
            console.error('There was a problem with the API request:', error);
            setIsLoading(false);
            callbacksRef.current.onFailure?.({ data: undefined, message: (error as any).message});
        }
    }, [publicKey]);

    const payRefrence = useCallback(async ({
        orderReferenceCode,
        onSuccess,
        onFailure,
        onClose,
        displayMode = 'inline'
    }: PayReferenceParams) => {
        setIsLoading(true);
        callbacksRef.current = { onSuccess, onFailure, onClose };
        try {
            const response = await fetch(INFO_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({order_reference_code: orderReferenceCode}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (!data.data || data.status === "failed" || !data.data.order_reference_code) {
                setIsLoading(false);
                callbacksRef.current.onFailure?.({ data: undefined, message: "Invalid order reference code" });
                return;
            }

            if (data.data.payment_status !== "Pending") {
                setIsLoading(false);
                callbacksRef.current.onFailure?.({ data: data.data, message: `Current order has already been completed (${data.data.payment_status})` });
                return;
            }

            setOrderReferenceCode(data.data.order_reference_code);
            setIsOpen(true);

            if (displayMode === 'popup') {
                const width = 500;
                const height = 600;
                const left = (window.screen.width / 2) - (width / 2);
                const top = (window.screen.height / 2) - (height / 2);

                const newWindow = window.open(
                    `${messageOrigin}/popup/${data.data.order_reference_code}`,
                    "MPWCheckout",
                    `width=${width},height=${height},left=${left},top=${top}`
                );

                if (newWindow) {
                    setPopupWindow(newWindow);
                }
            }
        } catch (error) {
            console.error('There was a problem with the API request:', error);
            setIsLoading(false);
            callbacksRef.current.onFailure?.({ data: undefined, message: (error as any).message });
        }
    }, [publicKey]);

    const handleMessage = useCallback((event: MessageEvent) => {
        if (event.origin !== messageOrigin) {
            console.log('Message received from Untrusted Origin:', event.origin);
            return;
        }

        const message = event.data;
        console.log('Message received', message);
        if (message.type === 'closeMPWCheckoutModal') {
            setIsOpen(false);
            setIsLoading(false);
            if (popupWindow) {
                popupWindow.close();
                setPopupWindow(null);
            }
            if (callbacksRef.current.onClose) {
                callbacksRef.current.onClose?.(message.data);
            }
        } else if (message.type === 'MPWCheckoutSuccess') {
            setIsOpen(false);
            setIsLoading(false);
            if (popupWindow) {
                popupWindow.close();
                setPopupWindow(null);
            }
            callbacksRef.current.onSuccess?.(message.data);
        } else if (message.type === 'MPWCheckoutFailed') {
            setIsOpen(false);
            setIsLoading(false);
            if (popupWindow) {
                popupWindow.close();
                setPopupWindow(null);
            }
            callbacksRef.current.onFailure?.({data:message.data, message: "Payment Failed"});
        }
    }, [popupWindow]);

    useEffect(() => {
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [handleMessage]);

    useEffect(() => {
        return () => {
            if (popupWindow) {
                popupWindow.close();
            }
        };
    }, [popupWindow]);

    const value = {
        publicKey,
        isOpen,
        isLoading,
        orderReferenceCode,
        popupWindow,
        initiatePayment,
        payRefrence,
        setIsOpen,
    };

    return (
        <MPWCheckoutContext.Provider value={value}>
            {children}
        </MPWCheckoutContext.Provider>
    );
};