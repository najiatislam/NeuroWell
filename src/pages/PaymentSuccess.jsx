import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-gray-700">Thank you for your payment. Your transaction was successful.</p>
    </div>
  );
};

export default PaymentSuccess;