import { Card } from '@mui/material';
import React from 'react';
import { CartaoMidia } from '../../Cartao/CartaoMidia';
import { CartaoConteudo } from '../../Cartao/CartaoConteudo';

export const CardObra = (params) => {
  const {obra: {url, tipo, id, nome, dataCarregamento}, interacoes} = params;
  const descricao = 'Carregada em ' + dataCarregamento.toLocaleString();
  return (
    <Card className="card" sx={{height: '100%'}}>
      <CartaoMidia miniatura={url} organizador={''} interacoes={interacoes} id={id}/>
      <CartaoConteudo nome={nome} descricao={descricao} />
    </Card>
  )
}
