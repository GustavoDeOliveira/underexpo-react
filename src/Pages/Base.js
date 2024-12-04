import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export const Base = (profile, setProfile) => {
  return (
    <Container>
      <Box sx={{backgroundColor: 'background.paper'}}>
        <Header profile={profile} setProfile={setProfile} />
        <Outlet profile={profile} />
        <Footer />
      </Box>
    </Container>
  )
}
