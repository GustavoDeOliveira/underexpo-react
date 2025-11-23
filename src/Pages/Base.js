import './base.css';
import { Box, Container, CssBaseline, Experimental_CssVarsProvider as CssVarsProvider, useMediaQuery } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import getTheme from '../theme';

export const Base = (profile, setProfile) => {
  if (location.pathname === '' || location.pathname === '/') {
    location.replace('/exposicoes/');
  }
  if (location.pathname === '/perfil' || location.pathname === '/perfil/') {
    location.replace('/exposicoes/');
  }

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = getTheme(prefersDarkMode);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Container disableGutters className="base-container">
        <Header profile={profile} setProfile={setProfile} />
        <Box className="base-box">
          <Outlet profile={profile} sx={{minHeight: '100vh'}} />
        </Box>
        <Box sx={style => ({backgroundColor: style.palette.background.default})}>
          <Footer />
        </Box>
      </Container>
    </CssVarsProvider>
  )
}
