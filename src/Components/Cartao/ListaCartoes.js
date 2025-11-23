import AddIcon from '@mui/icons-material/Add';
import LoadingIcon from '@mui/icons-material/HourglassTop';
import { Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Cartao from '../../Components/Cartao/Cartao';

export const ListaCartoes = ({cards, interacoes, aoAdicionarElemento}) => {
  const adicionarElemento = () => {
    setAdicionandoElemento(true);
    aoAdicionarElemento().finally(() => setAdicionandoElemento(false));
  }
  const [adicionandoElemento, setAdicionandoElemento] = React.useState(false);
  console.log('cards: ' + cards);
  return (
    <Grid container spacing={4}>
      {aoAdicionarElemento
        ? <Grid item key={0} xs={12} sm={6} md={4}>
            <Button onClick={adicionandoElemento ? () => { } : adicionarElemento} disabled={adicionandoElemento} sx={theme => ({ height: '100%', width: '100%', backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText })}>
              <Stack alignItems="center">
                {adicionandoElemento ? <LoadingIcon fontSize="large" /> : <AddIcon fontSize="large" />}
                <Typography variant="h5">{adicionandoElemento ? 'Organizando exposição...' : 'Nova Exposição'}</Typography>
              </Stack>
            </Button>
          </Grid>
        : ''}
      {cards.map((card) => (
        <Grid item key={card.id} xs={12} sm={6} md={4}>
          {console.log('card: ' + card)}
          <Cartao card={card} interacoes={interacoes} />
        </Grid>
      ))}
    </Grid>
  )
}
