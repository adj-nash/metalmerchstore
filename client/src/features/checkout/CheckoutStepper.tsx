import Paper from "@mui/material/Paper";
import { useState } from "react";
import Stepper from '@mui/material/Stepper';
import { Box, Button, Checkbox, FormControlLabel, Step, StepLabel, Typography } from "@mui/material";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Review from "./Review";
import { useAddressQuery, useUpdateAddressMutation } from "../account/accountAPI";
import { Address } from "../../app/models/user";
import { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useClearBasketMutation, useFetchBasketQuery } from "../basket/basketApi";


export default function CheckoutStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const {data: {name, ...address} = {} as Address, isLoading} = useAddressQuery();
    const [updateAddress] = useUpdateAddressMutation();
    const [checked, setChecked] = useState(false);
    const elements = useElements();
    const [addressComplete, setAddressComplete] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);
    const stripe = useStripe();
    const [confirmationToken, setConfirmtionToken] = useState<ConfirmationToken | null>(null)
    const [submit, setSubmit] = useState(false);
    const {data: basket} = useFetchBasketQuery();
    const navigate = useNavigate();
    const [clearBasket] = useClearBasketMutation();
   

    const steps = ["Address", "Payment", "Review"];

    const handleNext = async () => {
      if(activeStep === 0 && checked && elements)
      {
        const newAddress = await getNewStripeAddress();
        if(newAddress) await updateAddress(newAddress);
      }
      if(activeStep === 1) {
        if(!elements || !stripe) return;

        const result = await elements.submit();  
        if(result.error) return toast.error(result.error.message);

        const stripeResult = await stripe.createConfirmationToken({elements});
        if(stripeResult.error) return toast.error(stripeResult.error.message);

        setConfirmtionToken(stripeResult.confirmationToken)
        
      }
      if(activeStep === 2) {
        await confirmPayment();
      }
      setActiveStep(step => step + 1);
    };

    const getNewStripeAddress = async () => {
      const addressElement = elements?.getElement("address");
      if(!addressElement) return null;
      const {value: {name, address}} = await addressElement.getValue();

      if(name && address) return {...address, name}

      return null;
    };

    //Confirm Payment Method
    const confirmPayment = async () => {
      try {
        setSubmit(true);
        if(!confirmationToken || !basket?.clientSecret) throw new Error("There was a problem processing payment.");

        const paymentResult = await stripe?.confirmPayment({
          clientSecret: basket.clientSecret,
          redirect: "if_required",
          confirmParams: {
            confirmation_token: confirmationToken.id
          }

        });

        if(paymentResult?.paymentIntent?.status === "succeeded") {
          navigate("/checkout/success");
          clearBasket();
       
        } else if (paymentResult?.error) {
          throw new Error(paymentResult.error.message)
        } else {
          throw new Error("Something went wrong.")
        }
      } catch (error) {
        if(error instanceof Error) {
          toast.error(error.message);
        }
        setActiveStep(step => step - 1);
      } finally { 
        setSubmit(false);
      }

    };

    const handlePrevious = () => {
        setActiveStep(step => step - 1);
    };

    const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
      setAddressComplete(event.complete)
    };

    const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
      setPaymentComplete(event.complete)
    };

    if(isLoading) return <Typography>Loading checkout...</Typography>

  return (
    <Paper sx={{p: 3, borderRadius: 3}}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <Box sx={{mt: 2}}> 
          <Box sx={{display: activeStep === 0 ? "" : "none"}}>
            <AddressElement options={{
              mode: 'shipping', 
              defaultValues: {
                name: name,
                address: address
              }
              }}
              onChange={handleAddressChange}
              />
            <FormControlLabel control={<Checkbox
                            checked={checked} onChange={((e) => setChecked(e.target.checked))}
            />} label="Save as default address" sx={{display: "flex", justifyContent: "end"}}/>
          </Box>
          <Box sx={{display: activeStep === 1 ? "block" : "none"}}>
            <PaymentElement
            onChange={handlePaymentChange}
            />
          </Box>
          <Box sx={{display: activeStep === 2 ? "block" : "none"}}>
            <Review confirmationToken={confirmationToken}/>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button onClick={handlePrevious}>Previous</Button>
          <LoadingButton
          onClick={handleNext}
          disabled={(activeStep === 0 && !addressComplete) ||
            (activeStep === 1 && !paymentComplete) || submit
          }
          loading={submit}
          >Next</LoadingButton>
        </Box>
    </Paper>
  );
}