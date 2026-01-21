import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  "Rapport créé",
  "Décision manager",
  "Attente de réponse du client",
  "Clôture du rapport",
];

export default function MuiStepper({ currentStep }) {
  return (
    <Box sx={{ width: '100%', marginBottom: '20px' }}>
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
