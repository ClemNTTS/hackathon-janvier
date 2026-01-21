import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  "Rapport créé par le facteur",
  "Le manager a sélectionné l'action à faire",
  "Attente de la réponse, le manager indique que le problème a été géré",
  "Confirmation par le facteur et cloture de l'incident",
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
