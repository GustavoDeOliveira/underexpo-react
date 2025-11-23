import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { ListaObras } from '../../Components/Perfil/Acervo/ListaObras';
import * as PerfilService from '../../Services/PerfilService';

const TAMANHO_PAGINA = 9;
const buscar = async (pagina, tamanho = TAMANHO_PAGINA) => {
  return await PerfilService.buscarAcervo(pagina, tamanho, 'todos', 'recentes');
}

export async function loader() {
  const resposta = await buscar(1, TAMANHO_PAGINA - 1);
  return { obras: resposta };
}

export const Acervo = () => {
  return (
    <Box color="primary" sx={{ py: 8}}>
      <Typography align="center" variant="h2">Acervo</Typography>
      <ListaObras obrasLoader={useLoaderData().obras} buscar={buscar} tamanhoPagina={TAMANHO_PAGINA} />
    </Box>
  )
}