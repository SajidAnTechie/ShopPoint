import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import FormContainer from "../Components/FormContainer/FormContainer"
import CheckoutSteps from "../Components/CheckoutStep/CheckoutSteps"
import { savePaymentMethod } from "../Actions/cartAction"
import {  Button,Radio,RadioGroup,FormControlLabel,FormControl,FormLabel } from "@material-ui/core/";

const PaymentMethod = ({history})=>{
  
    if (!localStorage.getItem('shippingAddress')) {
      history.push('/shipping')
    }
  
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
  
    const dispatch = useDispatch()
  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(savePaymentMethod(paymentMethod))
      history.push('/placeorder')
    }

    return(
    <FormContainer>
        <CheckoutSteps step1 step2 />
            <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
        <FormControl component="fieldset">
            <FormLabel component="legend">Select Method</FormLabel>
            <RadioGroup aria-label="paymemtMethod" name="paymemtMethod" value={paymentMethod} onChange={(e)=> setPaymentMethod(e.target.value)}>
                <FormControlLabel value="PayPal" control={<Radio color="primary" />} label="PayPal or Credit Card" />
            </RadioGroup>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
            Continue
        </Button>
        </Form>
    </FormContainer>
    )
}

export default PaymentMethod;