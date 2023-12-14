import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'

function abreviarLink(link, max) {
  if (link && link.length > max)
    return link.substring(0, max - 3).concat('...');
  return link;
}
export const ListaContatos = (params) => {
  return (
    <Stack>
      {params.contatos.map(contato => (
        <Grid container xs={12}>
          <Grid item xs={1}>E</Grid>
          <Grid item xs={2}>{contato.canal}</Grid>
          <Grid item xs={3}>{contato.nome}</Grid>
          <Grid item xs={5}>{abreviarLink(contato.link, 36)}</Grid>
          <Grid item xs={1}>X</Grid>
        </Grid>
      ))}
    </Stack>
  )
}
