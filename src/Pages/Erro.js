import { Box, Container, Typography, CssBaseline, useMediaQuery } from '@mui/material';
import { useRouteError } from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import getTheme from '../theme';

export const Erro = () => {
  const error = useRouteError();
  console.error('API ERROR %o', error);
  switch (error.status) {
    case 401:
    case 403:
      localStorage.removeItem('key');
    case 404:
      location.replace('/exposicoes');
      break;
  }

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = getTheme(prefersDarkMode);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box sx={style => ({backgroundColor: style.palette.background.default, minHeight: '100vh'})}>
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
    </CssVarsProvider>
  )
}
