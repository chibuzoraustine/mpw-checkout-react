// types/global.types.ts
export interface MPWCheckoutProviderProps {
    publicKey: string;
    children: React.ReactNode;
}

export interface MPWCheckoutProps {
    requestBody: IRequestBody;
    onSuccess: (data: any) => void;
    onFailure: (data: any) => void;
    onClose?: (data: any) => void;
    displayMode?: 'inline' | 'popup';
    children?: React.ReactNode; 
}

export interface IRequestBody {
    order_reference_code?: string,
    meta: {
        amount: string,
        narration: string,
        wallet_id: string,
        redirect_url?: string,
        bearer?: string,
        user_id: string,
        split?: {
            type: string,
            wallet: {
                id: string,
                share: string
            }[]
        },
        allow_payment_method?: Array<'card' | 'dynamic_virtual_account' | 'ussd'>;
        allow_currency_exchange?: string[]
    }
}