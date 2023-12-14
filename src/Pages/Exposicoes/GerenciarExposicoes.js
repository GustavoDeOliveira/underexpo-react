import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import Cartao from '../../Components/Cartao';
import { ExposicaoApi, PerfilApi } from '../../Services';
import { Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LoadingIcon from '@mui/icons-material/HourglassTop';

const api = new PerfilApi();
const expoApi = new ExposicaoApi();

const organizarExposicao = (nome, descricao, callback) => {
  expoApi.organizarExposicao({ nome: nome, descrição: descricao }, nome, descricao, (err, data, res) => {
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
    setOrganizandoExposicao(true);
    organizarExposicao('Minha Exposição', 'Adicione uma descrição!', () => setOrganizandoExposicao(false));
  }
  const [cards] = React.useState(useLoaderData().exposicoes);
  const [organizandoExposicao, setOrganizandoExposicao] = React.useState(false);
  return (
    <Container sx={{ backgroundColor: 'primary.main', py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        <Grid item key={0} xs={12} sm={6} md={4}>
          <Button onClick={organizandoExposicao ? ()=>{} : novaExposicao} sx={theme => ({height: '100%', width: '100%', backgroundColor: theme.palette.primary.light, color: theme.palette.text.primary })}>
            <Stack alignItems="center">
              {organizandoExposicao ? <LoadingIcon fontSize="large" /> : <AddIcon fontSize="large" />}
                <Typography variant="h5">{organizandoExposicao ? 'Organizando exposição...': 'Nova Exposição'}</Typography>
            </Stack>
          </Button>
        </Grid>
        {cards.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Cartao info={card} editavel />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
