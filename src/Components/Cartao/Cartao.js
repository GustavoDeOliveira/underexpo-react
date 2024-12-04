import { Button, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import * as React from 'react';
import { CartaoConteudo } from './CartaoConteudo';
import { CartaoMidia } from './CartaoMidia';

export default function Cartao({ card, interacoes }) {
  
  return (
    <Card sx={{height: '100%'}}>
      <CardActionArea className="card" disableRipple={interacoes != undefined} sx={{height: '100%'}} href={interacoes != undefined ? '' : '/exposicoes/' + card.id}>
          <CartaoMidia card={card} interacoes={interacoes} />
          <CartaoConteudo nome={card.nome} descricao={card.descricao} />
      </CardActionArea>
    </Card>
  );
}