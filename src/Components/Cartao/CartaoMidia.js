import CardMedia from '@mui/material/CardMedia';
import * as React from 'react';
import { TagAutor } from '../TagAutor';
import { PainelBotoesOcultos } from '../PainelBotoesOcultos';

export const CartaoMidia = (params) => {
  return (
    <CardMedia
      component="div"
      sx={{pt: params.interacoes ? '0': '56.25%', position: 'relative'}}
      image={params.card.urlMiniatura}
    >
      {params.interacoes
      ? <PainelBotoesOcultos interacoes={params.interacoes} id={params.card.id} id2={params.card.expoId} />
      : <TagAutor nome={params.card.organizador} />}
    </CardMedia>
  );
};