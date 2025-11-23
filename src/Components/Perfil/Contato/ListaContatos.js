import { Button, Grid, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react';

export const ListaContatos = (params) => {

  return (
    <Stack>
      {params.contatos.map(contato => (
        <Grid key={contato.id} container columnSpacing={{xs: 2, md: 1}} alignItems={'center'}>
          <Grid item xs={2} sm={1}><Button onClick={(ev) => params.aoEditarContato(ev, contato)} color="primary"><EditIcon /></Button></Grid>
          <Grid item xs={10} sm={3} sx={{overflow: 'clip'}} md={2}>{contato.canal}</Grid>
          <Grid item xs={12} sm={3} sx={{overflow: 'clip'}}>{contato.nome}</Grid>
          <Grid item xs={10} sm={4} md={5} sx={{overflow: 'clip'}}>{contato.link}</Grid>
          <Grid item xs={2} sm={1} ><Button onClick={(ev) => params.aoRemoverContato(ev, contato)} color="error"><RemoveIcon /></Button></Grid>
        </Grid>
      ))}
    </Stack>
  )
}
