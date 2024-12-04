import RemoveIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import UploadIcon from '@mui/icons-material/Upload';
import Container from '@mui/material/Container';
import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ListaCartoes } from '../../Components/Cartao/ListaCartoes';
import { ExposicaoApi, PerfilApi } from '../../Services';
import { Button } from '@mui/material';

const api = new PerfilApi();
const expoApi = new ExposicaoApi();

const organizarExposicao = (nome, descricao, callback) => {
  expoApi.organizarExposicao({ nome: nome, descricao: descricao }, nome, descricao, (err, data, res) => {
    if (callback) callback();
    if (err) {
      console.log('error: %o', err);
    }
    else {
      console.log('data: %o', data);
      window.location = `${data.id}/editar`;
    }
  });
}

async function buscar() {
  return new Promise((resolve, reject) => {
    api.carregarMinhasExposicoes((err, data, res) => {
      if (err) {
        console.log('error: %o', err);
        reject(err);
      }
      else {
        console.log('data: %o', data);
        resolve(data);
      }
    })
  });
}

export async function loader() {
  const exposicoes = await buscar(1);
  return { exposicoes: exposicoes };
}

export const GerenciarExposicoes = () => {
  const novaExposicao = () => {
    return new Promise((resolve, reject) => {
      organizarExposicao('Minha Exposição', 'Adicione uma descrição!', () => resolve());
    });
  }
  const [cards] = React.useState(useLoaderData().exposicoes);
  const interacoes = [
    { nome: 'visualizar', botao: id => <Button variant="contained" href={`/exposicoes/${id}`}><PreviewIcon fontSize="large" /></Button> },
    { nome: 'editar', botao: id => <Button variant="contained" href={`/exposicoes/${id}/editar`}><EditIcon fontSize="large" /></Button> },
    { nome: 'trocar miniatura', botao: id => <Button variant="contained" onClick={ev => console.log('trocar miniatura')}><UploadIcon fontSize="large" /></Button> },
    { nome: 'excluir', botao: id => <Button variant="contained" className="destacado" onClick={ev => console.log('excluir exposição')}><RemoveIcon fontSize="large" /></Button> },
  ];
  console.log('cards: ' + cards);
  return (
    <Container sx={{ backgroundColor: 'primary.main', py: 8 }}>
      <ListaCartoes cards={cards} interacoes={interacoes} aoAdicionarElemento={novaExposicao} />
    </Container>
  )
}
