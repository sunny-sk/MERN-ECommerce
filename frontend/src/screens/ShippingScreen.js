import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';

import { saveShippingAddress } from '../actions/cartActions.js';

import { CheckoutsSteps } from '../components';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (shippingAddress) {
      const {
        address: add,
        city: cit,
        postalCode: pc,
        country: cn,
      } = shippingAddress;
      if (add) setAddress(add);
      if (cit) setCity(cit);
      if (pc) setPostalCode(pc);
      if (cn) setCountry(cn);
    }
  }, [shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      }),
    );
    history.push('/payment');
  };
  return (
    <FormContainer>
      <CheckoutsSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={address}
            aria-placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            required
          />
        </Form.Group>
        {/* city */}
        <Form.Group controlId="address">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            aria-placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
            type="text"
            required
          />
        </Form.Group>
        {/* postal code */}
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={postalCode}
            aria-placeholder="Enter postal code"
            onChange={(e) => setPostalCode(e.target.value)}
            type="number"
            required
          />
        </Form.Group>
        {/* country */}
        <Form.Group controlId="country">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={country}
            aria-placeholder="Enter Country"
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
