<h1>MoiPayWay Checkout React</h1>

`MPWCheckout` is a versatile React component library that integrates the MoiPayWay payment gateway into your React apps. It supports both inline and popup payment modes, and now offers two distinct ways to handle payments: initiating payments with `MPWCheckout` or continuing existing payments with `MPWCheckoutRef` using an `orderReferenceCode`.

<h2>Table of Contents</h2>

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
  - [Basic Setup](#basic-setup)
  - [Using Inline Checkout](#using-inline-checkout)
  - [Using Popup Checkout](#using-popup-checkout)
  - [Customizing Checkout Button](#customizing-checkout-button)
  - [Continue Payment with Order Reference](#continue-payment-with-order-reference)
  - [Full Checkout Control](#full-checkout-control)
- [API](#api)
  - [`MPWCheckoutProvider`](#mpwcheckoutprovider)
  - [`useMPWCheckout`](#usempwcheckout)
  - [`MPWCheckout`](#mpwcheckout)
  - [`MPWCheckoutRef`](#mpwcheckoutref)
  - [`MPWCheckoutModal`](#mpwcheckoutmodal)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install `MPWCheckout` React via npm

```bash
npm install mpw-checkout-react
```

## Prerequisites

- React: This library requires React 18.0 or higher.
- Node: Node version >=14.x is recommended.

##  Usage

### Basic Setup

Wrap your app in `MPWCheckoutProvider` to provide the necessary context. The `publicKey` is only required if you're using `MPWCheckout` to initiate payments. If you're continuing a payment with `MPWCheckoutRef`, the `publicKey` is optional.

```tsx
import React from 'react';
import { MPWCheckoutProvider } from 'mpw-checkout-react';

const App = () => (
  <MPWCheckoutProvider publicKey="your-public-key">
    {/* Your application code */}
  </MPWCheckoutProvider>
);

export default App;
```

### Using Inline Checkout

The inline checkout opens a payment modal inside your application. Use the `MPWCheckout` component, passing the `requestBody`. With optional callbacks like `onSuccess`, `onFailure`, `onClose`. By default the `displayMode` is `"inline"`, so you don't need to pass it as a prop.

```tsx
import React from 'react';
import { MPWCheckout, IRequestBody } from 'mpw-checkout-react';

const requestBody: IRequestBody = {
  // Your payment details here
};

const handleSuccess = (data) => {
  console.log('Payment Successful', data);
};

const handleFailure = (error) => {
  console.error('Payment Failed', error);
};

const MyCheckoutButton = () => (
  <MPWCheckout
    requestBody={requestBody}
    onSuccess={handleSuccess}
    onFailure={handleFailure}
  />
);

export default MyCheckoutButton;
```

### Using Popup Checkout

For popup checkout, simply set the `displayMode` to `"popup"`. The payment will open in a new window.

```tsx
import React from 'react';
import { MPWCheckout, IRequestBody } from 'mpw-checkout-react';

const requestBody:IRequestBody = {
  // Your payment details here
};

const MyPopupCheckoutButton = () => (
  <MPWCheckout
    requestBody={requestBody}
    displayMode="popup"
    onSuccess={(data) => console.log('Payment Successful', data)}
    onFailure={(error) => console.error('Payment Failed', error)}
  />
);

export default MyPopupCheckoutButton;
```

### Customizing Checkout Button

You can fully customize the checkout button by passing your own child components inside the `MPWCheckout` component.

```tsx
<MPWCheckout 
    requestBody={requestBody}
>
  <button>Custom Checkout Button</button>
</MPWCheckout>
```

### Continue Payment with Order Reference

If the payment has already been initiated and you have an `orderReferenceCode`, use `MPWCheckoutRef` to continue the payment without needing a `publicKey`.
```tsx
import { MPWCheckoutRef } from 'mpw-checkout-react';

const ContinuePaymentButton = () => (
  <MPWCheckoutRef
    orderReferenceCode="your-order-reference-code"
    onSuccess={(data) => console.log('Payment Successful', data)}
    onFailure={(error) => console.error('Payment Failed', error)}
  />
);
```

### Full Checkout Control

For full control, use the `useMPWCheckout` hook. You can either initiate a new payment or continue a payment using the `payReference` and `orderReferenceCode`. The `MPWCheckoutModal` is necessary for displaying the payment iframe.

**Initiate a Payment**
```tsx
import React from 'react';
import { useMPWCheckout, MPWCheckoutModal } from 'mpw-checkout-react';

const CustomPayButton = () => {
  const { initiatePayment, isLoading, isOpen, orderReferenceCode } = useMPWCheckout();

  const handlePayment = () => {
    initiatePayment({
      requestBody: {/*request body*/},
      onSuccess: (data) => console.log('Payment successful', data),
      onFailure: (data) => console.log('Payment failed', data),
      onClose: (data) => console.log("Closed data:", data)
    });
  };

  return (
    <>
      <div className='mb-3'>
        <button onClick={handlePayment} disabled={isLoading}>Pay</button> 
      </div>
      <MPWCheckoutModal isOpen={isOpen} orderReferenceCode={orderReferenceCode} />
    </>
  );
};

export default CustomPayButton;
```

**Continue a Payment**

If you want full control of the payment process using an existing `orderReferenceCode`, you can use `payReference` from `useMPWCheckout`:
```tsx
import React from 'react';
import { useMPWCheckout, MPWCheckoutModal } from 'mpw-checkout-react';

const CustomPayButton = () => {
  const { payReference, isLoading, isOpen, orderReferenceCode } = useMPWCheckout();

  const handlePayment = () => {
    payReference({
      orderReferenceCode: "input order reference code",
      onSuccess: (data) => console.log('Payment successful', data),
      onFailure: (data) => console.log('Payment failed', data),
      onClose: (data) => console.log("Closed data:", data)
    });
  };

  return (
    <>
      <div className='mb-3'>
        <button onClick={handlePayment} disabled={isLoading}>Pay</button> 
      </div>
      <MPWCheckoutModal isOpen={isOpen} orderReferenceCode={orderReferenceCode} />
    </>
  );
};

export default CustomPayButton;
```

## API

### `MPWCheckoutProvider`

Wraps your app and provides the checkout context. The `publicKey` is optional but required if using `MPWCheckout` to initiate payments.

**Props**
- `publicKey` (string, optional): Public key for the MoiPayWay gateway, required for MPWCheckout.

**Example**
```tsx
<MPWCheckoutProvider publicKey="your-public-key">
  {children}
</MPWCheckoutProvider>
```

### `useMPWCheckout`

A hook that gives access to the payment state and functions such as `initiatePayment`, `payReference`, `isOpen`, `isLoading`, and more.

- `initiatePayment`: Starts a new payment flow with the provided `requestBody`.
- `payReference`: Continues a payment using an existing `orderReferenceCode`.

**Example**
```tsx
const { initiatePayment, isLoading } = useMPWCheckout();
```

### `MPWCheckout`

A component that initiates the payment process. It provides an easy-to-use interface for both inline and popup modes. Requires a publicKey to be passed in the provider.

**Props**
- `requestBody`: An object containing the details of the payment.
- `onSuccess`(optional): A callback function that is called when the payment is successful.
- `onFailure`(optional): A callback function that is called when the payment fails.
- `onClosed`(optional): A callback function that is called when the payment modal or window is closed by clicking the close button.
- `displayMode` (optional): "inline" or "popup". Defaults to "inline".

**Example**
```tsx
<MPWCheckout
  requestBody={requestBody}
  onSuccess={handleSuccess}
  onFailure={handleFailure}
  displayMode="popup"
>
  Pay Now
</MPWCheckout>
```

### `MPWCheckoutRef`

Use this component to continue a payment that has already been initiated. An orderReferenceCode is required. No publicKey is required in the provider.

**Props**
- `orderReferenceCode`: (string): Required reference code from the initial payment.
- `onSuccess`(optional): A callback function that is called when the payment is successful.
- `onFailure`(optional): A callback function that is called when the payment fails.
- `onClosed`(optional): A callback function that is called when the payment modal or window is closed by clicking the close button.
- `displayMode` (optional): "inline" or "popup". Defaults to "inline".

**Example**
```tsx
<MPWCheckoutRef
  orderReferenceCode={"orderReferenceCode"}
  onSuccess={handleSuccess}
  onFailure={handleFailure}
  displayMode="popup"
>
  Pay Now
</MPWCheckoutRef>
```

### `MPWCheckoutModal`

A modal component that displays the checkout process inline. This is necessary when using the `MPWCheckout` component or when you want to have full control of the checkout process.

**Props**
- `isOpen`: Boolean to control the visibility of the modal.
- `orderReferenceCode`: The order reference code returned from the payment initiation.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.