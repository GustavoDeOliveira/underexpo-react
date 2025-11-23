import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconNotif from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function BotaoNotificacoes({handleClick, open}) {
  return (
    <React.Fragment>
      <Tooltip title="Notificações" enterDelay={500}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={style => ({ ml: 2, color: style.palette.primary.contrastText })}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <IconNotif sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
