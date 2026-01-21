import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SanctionModal = ({ open, handleClose, handleSanction }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="sanction-modal-title"
      aria-describedby="sanction-modal-description"
    >
      <Box sx={style}>
        <Typography id="sanction-modal-title" variant="h6" component="h2">
          Choisir une action
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button variant="contained" onClick={() => handleSanction('mail')}>
            Envoyer un mail
          </Button>
          <Button variant="contained" onClick={() => handleSanction('phone')}>
            Appeler par téléphone
          </Button>
          <Button variant="contained" onClick={() => handleSanction('letter')}>
            Envoyer un recommandé
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SanctionModal;