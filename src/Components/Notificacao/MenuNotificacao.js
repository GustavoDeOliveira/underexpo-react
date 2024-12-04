import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, Stack } from '@mui/material';
import { PerfilApi } from '../../Services';

const api = new PerfilApi();

function aceitarConvite(id) {
  const p = new Promise((resolve, reject) => {
    console.log('request: %o', { id });
    api.aceitarConviteNotificacao(id, (err, data, res) => {
      if (err) {
        console.log('error: %o', err);
        reject(err);
      }
      else {
        console.log('data: %o', data);
        resolve(data);
      }
    });
  });
  return p;
}

export default function MenuNotificacao(params) {
  const aceitarNotificacao = (notificacao) => {
    aceitarConvite(notificacao.id)
      .then(response => {
        
      });
  };
  const {anchorEl, handleClose, open, notificacoes} = params;
  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
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
        {notificacoes.map(n => <MenuItem id={'notificacao-' + n.id}>
          <Stack>
          <Box>@{n.expo.organizador} convidou você para participar da exposição '{n.expo.nome}'!</Box>
          <Stack direction="row" spacing={2} sx={{justifyContent: 'center'}}>
            <Button variant='outlined' className='confirmar-destaque' onClick={() => aceitarConvite(n)}>Aceitar</Button>
            <Button className='confirmar-critico'>Recusar</Button></Stack>
          </Stack>
        </MenuItem>)}
      </Menu>
    </React.Fragment>
  );
}
