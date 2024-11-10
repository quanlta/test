import React from 'react';
import { useLocation } from 'react-router-dom';
import './index.css';
import paymentBanner from '../../assets/logo.png';

const PaymentPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const orderId = queryParams.get('OrderInfo');
  const transactionStatus = queryParams.get('status') === '00' ? 'Successful' : 'Failed';
  const amount = queryParams.get('Amount');
  const payDate = queryParams.get('payDate');

  return (
    <div className="payment-container">
      <img src={paymentBanner} alt="Payment Banner" className="payment-banner" />
      <h1>Payment {transactionStatus}</h1>
      <p>Order: {orderId}</p>
      <p>Transaction Status: {transactionStatus}</p>
      <p>Amount: {amount}</p>
      <p>Pay Date: {payDate}</p>
    </div>
  );
};

export default PaymentPage;