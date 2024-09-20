import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// export const messageOrigin = "http://localhost:3000";
var messageOrigin = "https://checkout.moipayway.com";
var API_URL = "https://api.moipayway.co/wallet/collection/initiate";

var MPWCheckoutContext = createContext(undefined);
var useMPWCheckout = function () {
    var context = useContext(MPWCheckoutContext);
    if (!context) {
        throw new Error('useMPWCheckout must be used within a MPWCheckoutProvider');
    }
    return context;
};
var MPWCheckoutProvider = function (_a) {
    var children = _a.children, publicKey = _a.publicKey;
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = useState(null), orderReferenceCode = _d[0], setOrderReferenceCode = _d[1];
    var _e = useState(null), popupWindow = _e[0], setPopupWindow = _e[1];
    var callbacksRef = useRef({});
    var initiatePayment = useCallback(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var response, data, width, height, left, top_1, newWindow, error_1;
        var _c, _d, _e, _f;
        var requestBody = _b.requestBody, onSuccess = _b.onSuccess, onFailure = _b.onFailure, onClose = _b.onClose, _g = _b.displayMode, displayMode = _g === void 0 ? 'inline' : _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    setIsLoading(true);
                    callbacksRef.current = { onSuccess: onSuccess, onFailure: onFailure, onClose: onClose };
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(API_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(publicKey)
                            },
                            body: JSON.stringify(requestBody),
                        })];
                case 2:
                    response = _h.sent();
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _h.sent();
                    if (!data.data || data.status === "failed" || !data.data.order_reference_code) {
                        setIsLoading(false);
                        (_d = (_c = callbacksRef.current).onFailure) === null || _d === void 0 ? void 0 : _d.call(_c, { data: {}, error: data });
                        throw new Error('Request failed: invalid publicKey or requestBody');
                    }
                    setOrderReferenceCode(data.data.order_reference_code);
                    setIsOpen(true);
                    if (displayMode === 'popup') {
                        width = 500;
                        height = 600;
                        left = (window.screen.width / 2) - (width / 2);
                        top_1 = (window.screen.height / 2) - (height / 2);
                        newWindow = window.open("".concat(messageOrigin, "/popup/").concat(data.data.order_reference_code), "MPWCheckout", "width=".concat(width, ",height=").concat(height, ",left=").concat(left, ",top=").concat(top_1));
                        if (newWindow) {
                            setPopupWindow(newWindow);
                        }
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _h.sent();
                    console.error('There was a problem with the API request:', error_1);
                    setIsLoading(false);
                    (_f = (_e = callbacksRef.current).onFailure) === null || _f === void 0 ? void 0 : _f.call(_e, { data: {}, error: error_1 });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [publicKey]);
    var handleMessage = useCallback(function (event) {
        var _a, _b, _c, _d, _e, _f;
        if (event.origin !== messageOrigin) {
            console.log('Message received from Untrusted Origin:', event.origin);
            return;
        }
        var message = event.data;
        console.log('Message received', message);
        if (message.type === 'closeMPWCheckoutModal') {
            setIsOpen(false);
            setIsLoading(false);
            if (popupWindow) {
                popupWindow.close();
                setPopupWindow(null);
            }
            if (callbacksRef.current.onClose) {
                (_b = (_a = callbacksRef.current).onClose) === null || _b === void 0 ? void 0 : _b.call(_a, message.data);
            }
        }
        else if (message.type === 'MPWCheckoutSuccess') {
            setIsOpen(false);
            setIsLoading(false);
            if (popupWindow) {
                popupWindow.close();
                setPopupWindow(null);
            }
            (_d = (_c = callbacksRef.current).onSuccess) === null || _d === void 0 ? void 0 : _d.call(_c, message.data);
        }
        else if (message.type === 'MPWCheckoutFailed') {
            setIsOpen(false);
            setIsLoading(false);
            if (popupWindow) {
                popupWindow.close();
                setPopupWindow(null);
            }
            (_f = (_e = callbacksRef.current).onFailure) === null || _f === void 0 ? void 0 : _f.call(_e, message.data);
        }
    }, [popupWindow]);
    useEffect(function () {
        window.addEventListener('message', handleMessage);
        return function () { return window.removeEventListener('message', handleMessage); };
    }, [handleMessage]);
    useEffect(function () {
        return function () {
            if (popupWindow) {
                popupWindow.close();
            }
        };
    }, [popupWindow]);
    var value = {
        publicKey: publicKey,
        isOpen: isOpen,
        isLoading: isLoading,
        orderReferenceCode: orderReferenceCode,
        popupWindow: popupWindow,
        initiatePayment: initiatePayment,
        setIsOpen: setIsOpen,
    };
    return (React.createElement(MPWCheckoutContext.Provider, { value: value }, children));
};

// MPWCheckoutButton.tsx
var MPWCheckoutButton = function (_a) {
    var children = _a.children, onClick = _a.onClick, isLoading = _a.isLoading;
    return (React.createElement("button", { onClick: onClick, disabled: isLoading, style: { display: "flex", gap: "10px", alignItems: "center", padding: "12px 15px", backgroundColor: "#111827", fontSize: "13px", borderRadius: "10px", minWidth: "100px", color: "#fff", fontFamily: "cursive" } }, isLoading ? "Processing Payment ..." : children ||
        React.createElement(React.Fragment, null,
            React.createElement("span", null, "Checkout with"),
            React.createElement("div", { style: { display: "flex", gap: "5px", alignItems: "center" } },
                React.createElement("img", { src: "https://checkout.moipayway.com/moipayway-icon.png", alt: "icon", style: { width: '20px' } }),
                React.createElement("span", null, "MoiPayWay")))));
};

// MPWCheckoutModal.tsx
var MPWCheckoutModal = function (_a) {
    var isOpen = _a.isOpen, orderReferenceCode = _a.orderReferenceCode;
    if (!isOpen || !orderReferenceCode)
        return null;
    return (React.createElement("div", { style: {
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
        } },
        React.createElement("iframe", { src: "".concat(messageOrigin, "/popup/").concat(orderReferenceCode), style: {
                border: 'none',
                background: 'transparent',
                width: '100%',
                height: '100vh'
            }, title: "MPWCheckout" })));
};

// MPWCheckout.tsx
var MPWCheckout = function (_a) {
    var children = _a.children, requestBody = _a.requestBody, onSuccess = _a.onSuccess, onFailure = _a.onFailure, _b = _a.displayMode, displayMode = _b === void 0 ? 'inline' : _b;
    var _c = useMPWCheckout(), isLoading = _c.isLoading, initiatePayment = _c.initiatePayment, isOpen = _c.isOpen, orderReferenceCode = _c.orderReferenceCode;
    var handleInitiatePayment = function () {
        initiatePayment({ requestBody: requestBody, onSuccess: onSuccess, onFailure: onFailure, displayMode: displayMode });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(MPWCheckoutButton, { onClick: handleInitiatePayment, isLoading: isLoading }, children),
        displayMode === 'inline' && (React.createElement(MPWCheckoutModal, { isOpen: isOpen, orderReferenceCode: orderReferenceCode }))));
};

export { MPWCheckout, MPWCheckoutModal, MPWCheckoutProvider, useMPWCheckout };
//# sourceMappingURL=index.esm.js.map
