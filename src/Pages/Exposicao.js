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

function onClickPainel(painel, painelAtivo, setPainelAtivo) {
  if (painel.id === painelAtivo) setPainelAtivo(0);
  else setPainelAtivo(painel.id);
}

export const Exposicao = () => {
  const { exposicao } = useLoaderData();

  const [painelAtivo, setPainelAtivo] = React.useState(0);
  const [paineis] = React.useState(exposicao.paineis);
  const [carregando, setCarregando] = React.useState(false);

  React.useEffect(() => {
    if (painelAtivo) {
      const painel = paineis.find(p => p.id === painelAtivo);
      if (!painel.elementos) {
        setCarregando(true);
        carregarPainel(exposicao.id, painelAtivo)
          .then((retornoPainel) => {
            painel.elementos = retornoPainel.elementos;
            setCarregando(false);
          });
      }
    }
  }, [painelAtivo]);

  return (
    <Box>
      <Container sx={{position: 'relative', height: '128px',pt: '16px'}}>
        <Typography gutterBottom variant="h2" color="text.primary" align="center">{exposicao.nome}</Typography>
        <TagAutor nome={exposicao.organizador} organizador sx={{pt: '100%'}} />
      </Container>
      <Typography gutterBottom variant="h4" color="text.secondary">{exposicao.descricao}</Typography>
      <Stack>
        {paineis.map(painel => (
          <Container key={painel.id} className="painel">
            <Button
              variant="text"
              onClick={() => onClickPainel(painel, painelAtivo, setPainelAtivo)}
              sx={{backgroundImage: `url(${painel.urlMiniatura})`}}
              className={'painel' + (painelAtivo === painel.id ? '' : ' comprimido')}
              >
                <Typography variant="h3" className="painel titulo">{painel.nome}</Typography>
                <TagAutor nome={painel.autor} />
            </Button>
            <Painel painel={painel} ativo={painelAtivo === painel.id} />
          </Container>
        ))}
      </Stack>
    </Box>
  )
}
