import { Card, CardActionArea, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import React from 'react';
import './dialogoConfirmacao.css';
import { CardObra } from './Perfil/Acervo/CardObra';
import { CartaoConteudo } from './Cartao/CartaoConteudo';

export const DialogoObras = ({open, onClose, id, element, works}) => {
  return (
    <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby={id + '-dialog-title'}
          aria-describedby={id + '-dialog-description'}
          scroll='paper'
        >
          <DialogTitle id={id + '-dialog-title'}>
            {element.titulo}
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText component="span" id={id + '-dialog-description'}>
              Escolha uma de suas obras para adicionar ao painel.
            </DialogContentText>
            <Grid container spacing={4} >
            {works.map(w => (
              <Grid item key={w.id} xs={12} sm={6} md={4}>
                <CardActionArea className="card" sx={{height: '100%'}} onClick={ev => onClose(element, w)}>
                <Card className="card" sx={{height: '100%'}}>
                  <CardMedia
                    component="div"
                    sx={{pt: '56.25%', position: 'relative'}}
                    image={w.url}
                  />
                  <CartaoConteudo nome={w.nome} descricao={w.dataCarregamento.toLocaleString()} />
                </Card>
                </CardActionArea>
              </Grid>
            ))}
            </Grid>
          </DialogContent>
        </Dialog>
  )
};