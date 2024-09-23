export interface MPWCheckoutProviderProps {
    publicKey?: string;
    children: React.ReactNode;
}
export interface MPWCheckoutProps {
    requestBody: IRequestBody;
    onSuccess: (data: IOrderInfo) => void;
    onFailure: ({ data, message }: {
        data: IOrderInfo | undefined;
        message: string;
    }) => void;
    onClose?: (data: IOrderInfo) => void;
    displayMode?: 'inline' | 'popup';
    children?: React.ReactNode;
}
export interface MPWCheckoutRefProps {
    orderReferenceCode: string;
    onSuccess: (data: IOrderInfo) => void;
    onFailure: ({ data, message }: {
        data: IOrderInfo | undefined;
        message: string;
    }) => void;
    onClose?: (data: IOrderInfo) => void;
    displayMode?: 'inline' | 'popup';
    children?: React.ReactNode;
}
export interface IRequestBody {
    order_reference_code?: string;
    meta: {
        amount: string;
        narration: string;
        wallet_id: string;
        redirect_url?: string;
        bearer?: string;
        user_id: string;
        split?: {
            type: string;
            wallet: {
                id: string;
                share: string;
            }[];
        };
        allow_payment_method?: Array<'card' | 'dynamic_virtual_account' | 'ussd'>;
        allow_currency_exchange?: string[];
    };
}
export interface InitiatePaymentParams {
    requestBody: IRequestBody;
    onSuccess?: (data: IOrderInfo) => void;
    onFailure?: ({ data, message }: {
        data: IOrderInfo | undefined;
        message: string;
    }) => void;
    onClose?: (data: IOrderInfo) => void;
    displayMode?: 'inline' | 'popup';
}
export interface PayReferenceParams {
    orderReferenceCode: string;
    onSuccess?: (data: IOrderInfo) => void;
    onFailure?: ({ data, message }: {
        data: IOrderInfo | undefined;
        message: string;
    }) => void;
    onClose?: (data: IOrderInfo) => void;
    displayMode?: 'inline' | 'popup';
}
export interface MPWCheckoutContextType {
    publicKey: string;
    isOpen: boolean;
    isLoading: boolean;
    orderReferenceCode: string | null;
    popupWindow: Window | null;
    initiatePayment: (params: InitiatePaymentParams) => Promise<void>;
    payReference: (params: PayReferenceParams) => Promise<void>;
    setIsOpen: (isOpen: boolean) => void;
}
export interface IOrderInfo {
    order_reference_code: string;
    payment_status: string;
    order_status: string;
    amount: 500.00;
    currency: string;
    narration: string;
    redirect_url: string;
    merchant: {
        name: string;
        logo: string;
    };
    user: {
        email: string;
        fullname: string;
        phone: string;
    };
    payment_method: {
        main: string;
        counts: string;
        allowed: Array<'card' | 'dynamic_virtual_account' | 'ussd'>;
    };
    design_options: string;
}
