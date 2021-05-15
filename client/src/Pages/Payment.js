import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer/FormContainer';
import CheckoutSteps from '../components/CheckoutStep/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartAction';
import * as routes from '../constants/routes';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core/';

const PaymentMethod = ({ history }) => {
  if (!localStorage.getItem('shippingAddress')) {
    history.push({
      pathname: routes.SHIPPING,
    });
  }

  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod === '') {
      return;
    }
    dispatch(savePaymentMethod(paymentMethod));
    history.push({
      pathname: routes.PLACE_ORDER,
    });
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Method</FormLabel>
          <Row>
            <Col md="8">
              <RadioGroup
                aria-label="paymemtMethod"
                name="paymemtMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="PayPal" control={<Radio color="primary" />} label="PayPal or Credit Card" />
              </RadioGroup>
            </Col>
            <Col md="4">
              <RadioGroup
                aria-label="paymemtMethod"
                name="paymemtMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="esewa" control={<Radio color="primary" />} label="Esewa" />
              </RadioGroup>
            </Col>
          </Row>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMethod;
