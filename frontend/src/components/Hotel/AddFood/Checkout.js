import React from "react";
import PropTypes from "prop-types";
// import withStyles from "@mui/styles";
import  styled from "@emotion/styled";
import Paper from '@mui/material/Paper';
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddDescription from "./AddDesription.js";
import Review from "./Review.js";
import { useState } from "react";



//Link :https://codesandbox.io/s/pk1yrzr8vm?file=/src/Review.js:0-3064

const steps = ["Food Details", "Review your food details"];







// ---------------------------------


function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddDescription />;
    // case 1:
    //   return <AddQuantity/>;
    case 1:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}


const Checkout=()=> {


  const [ activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
setActiveStep((prevActiveStep)=>prevActiveStep+1)
  };

 const  handleBack = () => {
    setActiveStep((prevActiveStep)=>prevActiveStep-1)
  };

 const  handleReset = () => {
    setActiveStep(0)
  };



// -----
// Add food description and  quantiti in one page
// -----




    
    return (
      <React.Fragment>
      
       
        <main >
          <Paper >
            <Typography component="h1" variant="h4" align="center">
               Add Food
            </Typography>
            <Stepper activeStep={activeStep} style={{margin:" 1rem 0  2rem"}}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {/* {activeStep === steps.length ? ( */}
                <React.Fragment>
             <div style={{padding:"2rem "}}>
             <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
              </div>
                </React.Fragment>
              {/* ) : ( */}
                {/* <React.Fragment>
                  {getStepContent(activeStep)}
                  <div >
                    {activeStep !== 0 && (
                      <Button
                      onClick={()=>{handleNext()}}
                      style={{margin:" 2rem 0 2rem 2rem"}}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={()=>{handleNext()}}
                      style={{margin:"2rem "}}
                    >
                      {activeStep === steps.length - 1 ? "Add Food" : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              // )}
         */}
             </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }


Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Checkout;
