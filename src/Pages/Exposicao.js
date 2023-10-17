import React from 'react'
import { ExposicaoApi } from '../Services/api/ExposicaoApi';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { TagAutor } from '../Components/TagAutor';
import './exposicao.css';
import { Painel } from './Painel';

const api = new ExposicaoApi();

export async function loader({ params }) {
  const p = new Promise((resolve, reject) => {
    api.carregarExposicaoPorId(params.idExposicao, (err, data, res) => {
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
  const exposicao = await p;
  exposicao.id = params.idExposicao;
  return { exposicao };
}

async function carregarPainel(idExposicao, idPainel) {
  console.log(idPainel);
  return new Promise((resolve, reject) => {
    api.carregarPainelPorId(idExposicao, idPainel, (err, data, res) => {
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

function onClickPainel(painel, setPainelAtivo) {
  painel.expandido = !painel.expandido;
  setPainelAtivo(painel.id);
}

export const Exposicao = () => {
  const { exposicao } = useLoaderData();

  const [painelAtivo, setPainelAtivo] = React.useState(0);
  const [paineis, setPaineis] = React.useState(exposicao.paineis);

  React.useEffect(() => {
    if (painelAtivo) {
      paineis.filter(p => p.id !== painelAtivo).forEach(p => {
        p.expandido = false;
      });
      const painel = paineis.find(p => p.id == painelAtivo);
      if (!painel.elementos) {
        painel.carregando = true;
        carregarPainel(exposicao.id, painelAtivo)
          .then((painel) => {
            console.log(painel);
            paineis.find(p => p.id == painelAtivo).elementos = painel.elementos;
          }).finally(() => painel.carregando = false);
      }
    }
  }, [paineis, painelAtivo]);

  return (
    <Box>
      <Container sx={{position: 'relative'}}>
        <Typography gutterBottom variant="h2" color="text.primary" align="center">{exposicao.nome}</Typography>
        <TagAutor nome={exposicao.organizador} organizador sx={{pt: '100%'}} />
      </Container>
      <Typography gutterBottom variant="h4" color="text.secondary">{exposicao.descricao}</Typography>
      <Stack>
        {paineis.map(painel => (
          <Container key={painel.id} className="painel">
            <Button
              variant="text"
              onClick={() => onClickPainel(painel, setPainelAtivo)}
              sx={{backgroundImage: `url(${painel.urlMiniatura})`}}
              className={'painel' + (painel.expandido ? '' : ' comprimido')}
              >
                <Typography variant="h3" className="painel titulo">{painel.nome}</Typography>
                <TagAutor nome={painel.autor} />
            </Button>
            <Painel painel={painel} />
          </Container>
        ))}
      </Stack>
    </Box>
  )
}
