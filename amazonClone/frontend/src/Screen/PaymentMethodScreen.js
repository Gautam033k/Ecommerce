import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckOutSteps from '../components/CheckOutSteps';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'paypal'
  );

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
    localStorage.setItem('paymentmethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div className=" container small-container ">
        <Helmet>
          <title>payment Method</title>
        </Helmet>
        <h1 className="my-3">payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="paypal"
              label="paypal"
              value="paypal"
              checked={paymentMethodName === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              id="stripe"
              label="stripe"
              value="stripe"
              checked={paymentMethodName === 'stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
