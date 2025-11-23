import RemoveIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import UploadIcon from '@mui/icons-material/Upload';
import Container from '@mui/material/Container';
import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ListaCartoes } from '../../Components/Cartao/ListaCartoes';
import { ExposicaoApi, PerfilApi } from '../../Services';
import { Box, Button } from '@mui/material';
import { UploadArquivo } from '../../Components/Geral/UploadArquivo';
import * as ExpoService from '../../Services/ExpoService';
import { DialogoConfirmacao } from '../../Components/DialogoConfirmacao';

const api = new PerfilApi();
const expoApi = new ExposicaoApi();

const organizarExposicao = (nome, descricao, resolve, reject) => {
  expoApi.organizarExposicao({ nome: nome, descricao: descricao }, nome, descricao, (err, data, res) => {
    if (err) {
      console.log('error: %o', err);
      if (reject) reject();
    }
    else {
      console.log('data: %o', data);
      if (resolve) resolve();
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

async function removerExposicao(id) {
  return new Promise((resolve, reject) => {
    expoApi.removerExposicao(id, (err, data, res) => {
      if (err) {
        console.log('error: %o', err);
        reject(err);
      }
      else {
        console.log('data: %o', data);
        resolve(data);
      }
    });
  });
}

export async function loader() {
  const exposicoes = await buscar(1);
  return { exposicoes: exposicoes };
}

export const GerenciarExposicoes = () => {
  const novaExposicao = () => {
    return new Promise((resolve, reject) => {
      organizarExposicao('Minha Exposição', 'Adicione uma descrição!', resolve, reject);
    });
  }
  const [idTrocarMiniatura, setIdTrocarMiniatura] = React.useState();
  const [cards, setCards] = React.useState(useLoaderData().exposicoes);
  const [exposicaoARemover, setExposicaoARemover] = React.useState();
  
  const trocarMiniatura = (ev, conteudo) => new Promise((res, rej) => {
    console.log(ev);
    console.log(conteudo.arquivo);
    ExpoService.trocarMiniatura(conteudo.arquivo, idTrocarMiniatura)
    .then(data => {
      setCards(cards.map(c => {
        if (c.id === idTrocarMiniatura) {
          return {...c, urlMiniatura: data.urlMiniatura};
        }
        return c;
      }));
      setIdTrocarMiniatura(undefined);
      res(data);
    }).catch(reason => alert(reason));
  });

  const dialogoExcluirExposicao = (id) => {
    setExposicaoARemover(cards.find(c => c.id === id));
  };

  const cancelarRemocaoExposicao = () => setExposicaoARemover(undefined);

  const confirmarRemoverExposicao = () => {
    if (exposicaoARemover) {
      removerExposicao(exposicaoARemover.id)
      .then(data => {
        setCards(cards.filter(c => c.id !== exposicaoARemover.id));
      }).finally(() => setExposicaoARemover(undefined));
    }
  }

  const interacoes = [
    { nome: 'visualizar', botao: id => <Button variant="contained" href={`/exposicoes/${id}`}><PreviewIcon fontSize="large" /></Button> },
    { nome: 'editar', botao: id => <Button variant="contained" href={`/exposicoes/${id}/editar`}><EditIcon fontSize="large" /></Button> },
    { nome: 'trocar miniatura', botao: id => <Button variant="contained" onClick={ev => setIdTrocarMiniatura(id)}><UploadIcon fontSize="large" /></Button> },
    { nome: 'excluir', botao: id => <Button variant="contained" className="destacado" onClick={ev => dialogoExcluirExposicao(id)}><RemoveIcon fontSize="large" /></Button> },
  ];
  console.log('cards: ' + cards);

  return (
    <React.Fragment>
      {exposicaoARemover ?
        <DialogoConfirmacao
          id="confirmar-excluir-expo"
          onClose={cancelarRemocaoExposicao}
          open={exposicaoARemover}
          titulo="Confirmar remoção"
          mensagem={`Tem certeza de que quer remover a exposição "${exposicaoARemover.nome}"? Essa ação não pode ser desfeita, e os participantes perderão todo o trabalho que foi feito em seus painéis!`}
          botoes={[<Button onClick={() => confirmarRemoverExposicao()} className="confirmar-critico">Excluir</Button>, <Button variant="contained" onClick={cancelarRemocaoExposicao} className="cancelar-principal" autoFocus>Cancelar</Button>]}
        />
      :''}
      <UploadArquivo aoEnviarArquivo={trocarMiniatura} id={idTrocarMiniatura} />
      <Box sx={{ py: 8 }}>
        <ListaCartoes cards={cards} interacoes={interacoes} aoAdicionarElemento={novaExposicao} />
      </Box>
    </React.Fragment>
  )
}
