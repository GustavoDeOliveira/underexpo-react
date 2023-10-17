import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Cartao from '../Components/Cartao';
import { ExposicaoApi } from '../Services/api/ExposicaoApi';
import { useLoaderData } from 'react-router-dom';

const pageSize = 10;
const api = new ExposicaoApi();

async function buscar(page) {
  return new Promise((resolve, reject) => {
    api.buscarExposicoesPublicadas(page, pageSize, (err, data, res) => {
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

export const Explorar = () => {
  const [cards, setCards] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const { exposicoes } = useLoaderData();
  React.useEffect(() => {
    if (page > 1)
      buscar(page).then((data) => setCards(data));
    else
      setCards(exposicoes);
  }, [page]);
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Cartao info={card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}