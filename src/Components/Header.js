import CameraIcon from '@mui/icons-material/PhotoCamera';
import { Button, Divider, Link, List, ListItem, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css'

const rotas = [
  {titulo: 'Exposições', destino: '/exposicoes/explorar'},
  {titulo: 'Perfil', destino: '/perfil'}
]

export default function Header() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <CameraIcon sx={{ mr: 2 }} />
        <Stack
          direction="row"
          spacing={2}
        >
          <Typography variant="h6" color="inherit" noWrap>
            UnderExpo
          </Typography>
          {rotas.map((rota, index) => 
            
              <Button key={index} href={rota.destino} variant="text" color="text">{rota.titulo}</Button>
            
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}