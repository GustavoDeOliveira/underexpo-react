import { Grid, Tooltip } from '@mui/material';
import React from 'react';
import './painelBotoesOcultos.css';

export const PainelBotoesOcultos = (params) => {
  return (
    <Grid container spacing={1} padding={1} textAlign={'center'}>
      {params.interacoes.map((interacao, index) => {
        return (<Grid key={index} item xs={6}><Tooltip slotProps={{popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        },}} followCursor disableInteractive title={interacao.nome}>{interacao.botao(params.id, params.id2)}</Tooltip></Grid>)
      })}
    </Grid>
  )
}
