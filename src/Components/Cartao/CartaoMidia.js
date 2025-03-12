import CardMedia from '@mui/material/CardMedia';
import * as React from 'react';
import { TagAutor } from '../TagAutor';
import { PainelBotoesOcultos } from '../PainelBotoesOcultos';

export const CartaoMidia = ({interacoes, card}) => {
  return (
    <CardMedia
      component="div"
      sx={{pt: interacoes ? '0': '56.25%', position: 'relative'}}
      image={card.urlMiniatura}
    >
      {interacoes
      ? <PainelBotoesOcultos interacoes={interacoes} id={card.id} id2={card.expoId} />
      : <TagAutor nome={card.organizador} />}
    </CardMedia>
  );
};