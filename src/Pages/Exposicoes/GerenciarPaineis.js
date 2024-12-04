import RemoveIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import UploadIcon from '@mui/icons-material/Upload';
import Container from '@mui/material/Container';
import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ListaCartoes } from '../../Components/Cartao/ListaCartoes';
import { PerfilApi } from '../../Services';
import { Button } from '@mui/material';

const api = new PerfilApi();

async function buscar() {
  return new Promise((resolve, reject) => {
    api.carregarMeusPaineis((err, data, res) => {
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
  const paineis = await buscar();
  return { paineis: paineis };
}

export const GerenciarPaineis = () => {
  const [cards] = React.useState(useLoaderData().paineis.map(p => ({
    id: p.id, nome: p.exposicao.nome, descricao: p.nome, expoId: p.exposicao.id, urlMiniatura: p.urlMiniatura
  })));
  const interacoes = [
    { nome: 'visualizar', botao: (id, id2) => <Button variant="contained" href={`/exposicoes/${id2}`}><PreviewIcon fontSize="large" /></Button> },
    { nome: 'editar', botao: (id, id2) => <Button variant="contained" href={`/exposicoes/${id2}/paineis/${id}/editar`}><EditIcon fontSize="large" /></Button> },
    { nome: 'trocar miniatura', botao: id => <Button variant="contained" onClick={ev => console.log('trocar miniatura')}><UploadIcon fontSize="large" /></Button> },
    { nome: 'excluir', botao: id => <Button variant="contained" className="destacado" onClick={ev => console.log('excluir painel')}><RemoveIcon fontSize="large" /></Button> },
  ];
  return (
    <Container sx={{ backgroundColor: 'primary.main', py: 8 }}>
      <ListaCartoes cards={cards} interacoes={interacoes} />
    </Container>
  )
}
