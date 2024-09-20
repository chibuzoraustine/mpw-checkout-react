<h1>MoiPayWay Checkout React</h1>

`MPWCheckout` is a React component library for integrating the MoiPayWay payment gateway into your React applications. This package allows developers to initiate payments, display checkout modals, and handle payment success and failure events seamlessly, with support for both inline and popup modes.

<h2>Table of Contents</h2>

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
  - [Basic Setup](#basic-setup)
  - [Using Inline Checkout](#using-inline-checkout)
  - [Using Popup Checkout](#using-popup-checkout)
  - [Customizing Checkout Button](#customizing-checkout-button)
  - [Using MPWCheckoutModal for Full Control](#using-mpwcheckoutmodal-for-full-control)
- [API](#api)
  - [`MPWCheckoutProvider`](#mpwcheckoutprovider)
  - [`useMPWCheckout`](#usempwcheckout)
  - [`MPWCheckout`](#mpwcheckout)
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

Wrap your application in the `MPWCheckoutProvider` to provide the necessary context for the checkout flow. You'll need to pass your `publicKey` to the provider.

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

### Using MPWCheckoutModal for Full Control

If you want full control over the checkout process, you can use the `useMPWCheckout` hook to initiate transactions with your own button. The `MPWCheckoutModal` is necessary for displaying the payment iframe.

Here's how you can do it:
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
      onClose: (data) => {
        console.log("Closed data:", data);
        alert("Closed");
      }
    });
  };

  return (
    <>
      <div className='mb-3'>
        <button onClick={handlePayment} disabled={isLoading}>Submit</button> 
      </div>
      <MPWCheckoutModal isOpen={isOpen} orderReferenceCode={orderReferenceCode} />
    </>
  );
};

export default CustomPayButton;
```

## API

### `MPWCheckoutProvider`

Provides the checkout context to all child components. This is required to use any checkout features.

**Props**
- `publicKey` (string): Your public key for the MoiPayWay payment system.

**Example**
```tsx
<MPWCheckoutProvider publicKey="your-public-key">
  {children}
</MPWCheckoutProvider>
```

### `useMPWCheckout`

A hook that gives access to the payment state and functions such as `initiatePayment`, `isOpen`, `isLoading`, and more.

**Example**
```tsx
const { initiatePayment, isLoading } = useMPWCheckout();
```

### `MPWCheckout`

A component that initiates the payment process. It provides an easy-to-use interface for both inline and popup modes.

**Props**
- `requestBody`: An object containing the details of the payment.
- `onSuccess`: A callback function that is called when the payment is successful.
- `onFailure`: A callback function that is called when the payment fails.
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

### `MPWCheckoutModal`

A modal component that displays the checkout process inline. This is necessary when using the `MPWCheckout` component or when you want to have full control of the checkout process.

**Props**
- `isOpen`: Boolean to control the visibility of the modal.
- `orderReferenceCode`: The order reference code returned from the payment initiation.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.