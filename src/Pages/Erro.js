import { Box, Container, Typography } from '@mui/material';
import { useRouteError } from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export const Erro = () => {
  const error = useRouteError();
  console.error(error);
  switch (error.status) {
    case 401:
    case 403:
      localStorage.removeItem('key');
    case 404:
      location.replace('/exposicoes');
      break;
  }
  return (
    
    <Container>
      <Box sx={{ backgroundColor: 'background.paper' }}>
        <Header />
        <Container maxWidth="md">
          <Typography gutterBottom align="center" variant="h1">Epa!</Typography>
          <Typography align="center">Ocorreu um erro inesperado.</Typography>
          <Typography align="center">
            <i>{error.statusText || error.message}</i>
          </Typography>
          <Typography align="center">
            <i>{error.data}</i>
          </Typography>
        </Container>
        <Footer />
      </Box>
    </Container>
  )
}
