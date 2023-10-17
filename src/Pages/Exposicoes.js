import { Button, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const rotas = [
  {titulo: 'Explorar', destino: 'explorar'},
  {titulo: 'Minhas Exposições', destino: 'gerenciar'}
]

export default function Exposicoes() {
  return (
    <div>
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <Stack
            direction="row"
            spacing={2}
          >
            {rotas.map((rota, index) => 
                <Button key={index} href={rota.destino} variant="text" color="text">{rota.titulo}</Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}