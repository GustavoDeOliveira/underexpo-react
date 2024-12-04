import { AppBar, Button, Stack, Toolbar } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const rotas = [
  {titulo: 'Contato', destino: 'contato'},
  {titulo: 'Acervo', destino: 'acervo'}
]

export const Perfil = () => {
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
  )
}
