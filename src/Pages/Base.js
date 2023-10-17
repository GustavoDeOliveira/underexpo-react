import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export const Base = () => {
  return (
    <Container>
      <Box sx={{ }}>
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </Container>
  )
}
