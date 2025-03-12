import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, Grid, Stack } from '@mui/material';
import { PerfilApi } from '../../Services';

const api = new PerfilApi();

const itens = [
    {id:'T', name: 'Texto'},
    {id:'I', name: 'Imagem'},
    {id:'A', name: 'Áudio'},
    {id:'V', name: 'Vídeo'}
]

export default function MenuNovoElemento({anchorEl, handleClose, open}) {
  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={ev => handleClose()}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {itens.map(i => <MenuItem id={'opcao-' + i.id}>
          <Button onClick={()=>handleClose(i)}>{i.name}</Button>
        </MenuItem>)}
      </Menu>
    </React.Fragment>
  );
}
