import './base.css';
import { Box, Container, CssBaseline, useMediaQuery } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import getTheme from '../theme';

export const Base = (profile, setProfile) => {
  console.log('PROFILE %o', profile);
  if (!profile.id && !location.pathname.match(/\/exposicoes\/?[0-9]?/i)) {
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
          <Outlet profile={profile} sx={{ minHeight: '100vh' }} />
        </Box>
        <Box sx={style => ({ backgroundColor: style.palette.background.default })}>
          <Footer />
        </Box>
      </Container>
    </CssVarsProvider>
  )
}
