import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';

import { savePaymentMethod } from '../actions/cartActions.js';

import { CheckoutsSteps } from '../components';

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  useEffect(() => {
    if (shippingAddress) {
      //do nothing
    } else {
      history.push('/shipping');
    }
  }, [shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  return (
    <FormContainer>
      <CheckoutsSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="lagend">Select Method</Form.Label>
        </Form.Group>
        <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            name="paymentMethod"
            id="PayPal"
            value="PayPal"
            checked
            onChange={(e) => {
              setPaymentMethod(e.target.value);
            }}></Form.Check>
          <br />
          {/* <Form.Check
            type="radio"
            label="Stripe"
            name="paymentMethod"
            id="Stripe"
            value="Stripe"
            onChange={(e) => {
              setPaymentMethod(e.target.value);
            }}></Form.Check> */}
        </Col>
        <br />
        <br />
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
