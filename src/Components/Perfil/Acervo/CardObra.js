import { Card } from '@mui/material';
import React from 'react';
import { CartaoMidia } from '../../Cartao/CartaoMidia';
import { CartaoConteudo } from '../../Cartao/CartaoConteudo';

export const CardObra = ({obra: {url, tipo, id, nome, dataCarregamento}, interacoes}) => {
  const descricao = 'Carregada em ' + dataCarregamento.toLocaleString();
  return (
    <Card className="card" sx={{height: '100%'}}>
      <CartaoMidia organizador={''} interacoes={interacoes} card={{id, urlMiniatura: url}} />
      <CartaoConteudo nome={nome} descricao={descricao} />
    </Card>
  )
}
