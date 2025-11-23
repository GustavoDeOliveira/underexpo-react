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

async function removerPainel(id, expoId) {
  return new Promise((resolve, reject) => {
    expoApi.excluirPainel(expoId, id, (err, data, res) => {
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
  const [cards, setCards] = React.useState(useLoaderData().paineis.map(p => ({
    id: p.id, nome: p.exposicao.nome, descricao: p.nome, expoId: p.exposicao.id, urlMiniatura: p.urlMiniatura
  })));
  const [painelARemover, setPainelARemover] = React.useState();

  const [idTrocarMiniatura, setIdTrocarMiniatura] = React.useState();

  const trocarMiniatura = (ev, conteudo) => new Promise((res, rej) => {
    console.log(ev);
    console.log(conteudo.arquivo);
    ExpoService.trocarMiniaturaPainel(conteudo.arquivo, idTrocarMiniatura.expoId, idTrocarMiniatura.id)
      .then(data => {
        setCards(cards.map(c => {
          if (c.id === idTrocarMiniatura.id) {
            return { ...c, urlMiniatura: data.urlMiniatura };
          }
          return c;
        }));
        setIdTrocarMiniatura(undefined);
        res(data);
      }).catch(rej);
  });

  const dialogoExcluirPainel = (id) => {
    setPainelARemover(cards.find(c => c.id === id));
  };

  const cancelarRemocaoPainel = () => setPainelARemover(undefined);

  const confirmarRemoverPainel = () => {
    if (painelARemover) {
      removerPainel(painelARemover.id, painelARemover.expoId)
      .then(data => {
        setCards(cards.filter(c => c.id !== painelARemover.id));
      }).finally(() => setPainelARemover(undefined));
    }
  }
  const interacoes = [
    { nome: 'visualizar', botao: (_, expoId) => <Button variant="contained" href={`/exposicoes/${expoId}`}><PreviewIcon fontSize="large" /></Button> },
    { nome: 'editar', botao: (id, expoId) => <Button variant="contained" href={`/exposicoes/${expoId}/paineis/${id}/editar`}><EditIcon fontSize="large" /></Button> },
    { nome: 'trocar miniatura', botao: (id, expoId) => <Button variant="contained" onClick={ev => setIdTrocarMiniatura({ id, expoId })}><UploadIcon fontSize="large" /></Button> },
    { nome: 'excluir', botao: (id) => <Button variant="contained" className="destacado" onClick={ev => dialogoExcluirPainel(id)}><RemoveIcon fontSize="large" /></Button> },
  ];
  return (
    <React.Fragment>
      {painelARemover ?
        <DialogoConfirmacao
          id="confirmar-excluir-painel"
          onClose={cancelarRemocaoPainel}
          open={painelARemover}
          titulo="Confirmar remoção"
          mensagem={`Tem certeza de que quer remover o painel "${painelARemover.descricao}" da exposição "${painelARemover.nome}"? Essa ação não pode ser desfeita e o conteúdo, com exceção das obras, será perdido!`}
          botoes={[<Button onClick={() => confirmarRemoverPainel()} className="confirmar-critico">Excluir</Button>, <Button variant="contained" onClick={cancelarRemocaoPainel} className="cancelar-principal" autoFocus>Cancelar</Button>]}
        />
      :''}
      <UploadArquivo aoEnviarArquivo={trocarMiniatura} id={idTrocarMiniatura} tipo="image/*" />
      <Box sx={{ py: 8 }}>
        <ListaCartoes cards={cards} interacoes={interacoes} />
      </Box>
    </React.Fragment>
  )
}
