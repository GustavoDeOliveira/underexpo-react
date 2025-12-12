import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react'
import { LogoIcon } from '../LogoIcon';
import { Link } from 'react-router-dom';
import { Google as GoogleIcon, Menu as MenuIcon } from '@mui/icons-material';
import BotaoTema from '../Notificacao/BotaoTema';

const navItems = [
  {
    name: 'Exposições',
    section: 'exposicoes',
    children: [
      {
        name: 'Explorar',
        to: '/exposicoes/',
        path: ''
      },
      {
        name: 'Gerenciar Exposições',
        to: '/exposicoes/gerenciar',
        path: 'gerenciar'
      },
      {
        name: 'Gerenciar Painéis',
        to: '/exposicoes/paineis',
        path: 'paineis'
      }
    ]
  },
  {
    name: 'Perfil',
    section: 'perfil',
    children: [
      {
        name: 'Contato',
        to: '/perfil/contato',
        path: 'contato'
      },
      {
        name: 'Acervo',
        to: '/perfil/acervo',
        path: 'acervo'
      }
    ]
  }
];

const navButtonStylePrimary = style => style.palette.mode === 'dark'
  ? ({ backgroundColor: style.palette.background.default, color: style.palette.text.primary, display: 'block', width: '100%', padding: '10px 0' })
  : ({ backgroundColor: style.palette.primary.main, color: style.palette.primary.contrastText, display: 'block', width: '100%', padding: '10px 0' });
const navButtonStyleSecondary = style => style.palette.mode === 'dark'
  ? ({ backgroundColor: style.palette.background.default, color: style.palette.text.secondary, display: 'block', width: '100%', padding: '10px 0' })
  : ({ backgroundColor: style.palette.secondary.main, color: style.palette.secondary.contrastText, display: 'block', width: '100%', padding: '10px 0' });

export const MobileHeader = ({ profile, handleLogin, handleLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box onClick={handleDrawerToggle}
      sx={style => ({
        backgroundColor: style.palette.mode === 'dark'
          ? style.palette.background.paper
          : style.palette.primary.dark,
        textAlign: 'center'
      })}>
      <LogoIcon sx={{ mt: 2, ml: 1, mr: 0 }} />
      <BotaoTema sx={{ ml: 0 }} />
      {profile.id && navItems.map(item => (
        <Fragment key={item.name}>
          <Typography variant="h5"
            sx={navButtonStylePrimary}
          >{item.name}</Typography>
          {item.children.map(child => (
            <Button key={child.name} component={Link} to={child.to}
              sx={navButtonStyleSecondary}
            >
              {child.name}
            </Button>
          ))}
        </Fragment>
      ))}

    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {profile.id ? <Fragment>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <LogoIcon />
          <Button color="text" variant="text" onClick={handleLogout}>
            <GoogleIcon /> Sair
          </Button>
        </Fragment> : <Fragment>
          <BotaoTema sx={{ pl: 0, ml: 0 }} />
          <LogoIcon />
          <Button color="text" variant="text" onClick={handleLogin}>
            <GoogleIcon /> Entrar
          </Button>
        </Fragment>
        }
      </Toolbar>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        PaperProps={{
          sx: style => ({
            backgroundColor: style.palette.mode === 'dark'
              ? style.palette.common.black
              : style.palette.primary.dark
          })
        }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  )
}
