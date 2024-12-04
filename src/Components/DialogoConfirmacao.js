import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import './dialogoConfirmacao.css';

export const DialogoConfirmacao = (params) => {
  return (
    <Dialog
          open={params.open}
          onClose={params.onClose}
          aria-labelledby={params.id + '-dialog-title'}
          aria-describedby={params.id + '-dialog-description'}
        >
          <DialogTitle id={params.id + '-dialog-title'}>
            {params.titulo}
          </DialogTitle>
          <DialogContent>
            <DialogContentText component="span" id={params.id + '-dialog-description'}>
              {params.mensagem}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {params.botoes}
          </DialogActions>
        </Dialog>
  )
};