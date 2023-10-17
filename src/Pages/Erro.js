import { Box, Container, Typography } from '@mui/material';
import React from 'react'
import { useRouteError } from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export const Erro = () => {
  const error = useRouteError();
  console.error(error);
  return (
    
    <Container>
      <Box sx={{ }}>
        <Header />
        <Container maxWidth="md">
          <Typography gutterBottom align="center" variant="h1">Epa!</Typography>
          <Typography align="center">Ocorreu um erro inesperado.</Typography>
          <Typography align="center">
            <i>{error.statusText || error.message}</i>
          </Typography>
        </Container>
        <Footer />
      </Box>
    </Container>
  )
}
