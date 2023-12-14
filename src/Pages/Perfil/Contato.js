import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { FormularioNovoContato } from '../../Components/Perfil/Contato/FormularioNovoContato';
import { adicionarContato, buscarContatosDoUsuarioAtual } from '../../Services/PerfilService'
import { useLoaderData } from 'react-router-dom';
import { ListaContatos } from '../../Components/Perfil/Contato/ListaContatos';

export async function loader() {
  const contatos = await buscarContatosDoUsuarioAtual();
  return { contatos };
}

export const Contato = () => {
  const [contatos, setContatos] = React.useState(useLoaderData().contatos);

  return (
    <Container>
      <Typography variant="h2">Contato</Typography>
      <ListaContatos contatos={contatos} />
      <FormularioNovoContato aoAdicionarContato={adicionarContato} />
    </Container>
  );
};
