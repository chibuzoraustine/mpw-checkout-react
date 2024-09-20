// MPWCheckoutButton.tsx
import React from 'react';

interface MPWCheckoutButtonProps {
    children?: React.ReactNode;
    onClick: () => void;
    isLoading: boolean;
}

export const MPWCheckoutButton: React.FC<MPWCheckoutButtonProps> = ({ children, onClick, isLoading }) => {
    return (
        <button onClick={onClick} disabled={isLoading} style={{ display: "flex", gap: "10px", alignItems: "center", padding: "12px 15px", backgroundColor: "#111827", fontSize: "13px", borderRadius: "10px", minWidth: "100px", color: "#fff", fontFamily: "cursive" }} >
            {
                isLoading ? "Processing Payment ..." : children ||
                    <>
                        <span>Checkout with</span>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                            <img src="https://checkout.moipayway.com/moipayway-icon.png" alt="icon" style={{ width: '20px' }} />
                            <span>MoiPayWay</span>
                        </div>
                    </>
            }
        </button>
    );
};