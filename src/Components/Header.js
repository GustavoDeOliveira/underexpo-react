import CameraIcon from '@mui/icons-material/PhotoCamera';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Divider, Stack, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import './header.css'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { buscarUsuario, criarUsuario } from '../Services/UsuarioService';
import { getUserKey } from '../Services/LocalStorageService';
import BotaoNotificacoes from './Notificacao/BotaoNotificacoes';
import MenuNotificacao from './Notificacao/MenuNotificacao';
import * as PerfilService from '../Services/PerfilService';
import router from '../router';
import { Link, useLocation } from 'react-router-dom';
import BotaoTema from './Notificacao/BotaoTema';
import { LogoIcon } from './LogoIcon';
import { useTheme } from '@emotion/react';
import { MobileHeader } from './Header/MobileHeader';

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname.split('/');
  const [user, setUser] = React.useState();
  const [profile, setProfile] = React.useState({ id: getUserKey() });
  const [section, setSection] = React.useState(currentPath[1]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  async function promptCriarUsuario(previousError) {
    const username = prompt(previousError ? previousError : '' + 'Escolha um nome de usuário! Use apenas letras, números, ponto e sublinhado ( . e _ )');
    console.log('MATCH %o', username.match("[^a-zA-Z0-9._]"));
    if (username && !username.match("[^a-zA-Z0-9._]")) {
      try {
        const data = await criarUsuario(profile.id, username);
        localStorage.setItem('key', profile.id);
        localStorage.setItem('name', data.nome);
        return data;
      } catch (reason) {
        if (reason.status == 409) {
          return await promptCriarUsuario('Já existe um usuário com esse nome, por favor escolha outro.\n');
        } else {
          return await promptCriarUsuario('Ocorreu um erro inesperado. Por favor tente novamente.\n');
        }
      }
    }
    if (username === undefined || username === null) {
      logOut();
    } else {
      return await promptCriarUsuario();
    }
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  React.useEffect(
    () => {
      if (user) {
        console.log(user);
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile({ id: res.data.id });
          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );

  React.useEffect(
    () => {
      console.log('PROFILE %o', profile);
      if (profile.id) {
        console.log(profile);
        buscarUsuario(profile.id)
          .then(data => {
            console.log(data);
            localStorage.setItem('key', profile.id);
            localStorage.setItem('name', data.nome);
          }).catch(reason => {
            console.log('REASON: ' + reason)
            if ((reason.status && reason.status === 404) || (reason.response && reason.response.notFound)) {
              promptCriarUsuario();
            } else {
              logOut();
              console.log(reason);
            }
          });
      } else {
        localStorage.removeItem('key');
        localStorage.removeItem('name');
        if (window.location.pathname !== '/exposicoes/')
        window.location.pathname = '/exposicoes/';
      }
    },
    [profile]
  );

  const logOut = () => {
    googleLogout();
    setProfile({});
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificacoes, setNotificacoes] = React.useState([]);
  const open = Boolean(anchorEl);

  const atualizarNotificacoes = () => {
    PerfilService.buscarNotificacoesDoUsuarioAtual()
      .then(response => {
        setNotificacoes(response);
      });
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    atualizarNotificacoes();

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const hasPointer = () => {
    console.log('POINTER %o', window.matchMedia("(pointer: fine)"));
    return window.matchMedia("(pointer: fine)").matches;
  }

  const handleSectionClick = (ev) => {
    console.log('click');
    if (!hasPointer()) {
      console.log('no pointer');
      ev.preventDefault();
      setSection(ev.currentTarget.getAttribute('href').split('/')[1]);
    }
  };

  if (isMobile) return <MobileHeader profile={profile} handleLogout={logOut} handleLogin={login} />
  return (
    <React.Fragment>
      <AppBar position="relative" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
          <LogoIcon sx={{mr: 12}} />
          <Stack
            direction="row"
            spacing={2}
          >
            <Button component={Link} to="/exposicoes/"
                  color="text"
                  variant={'text'}
                  sx={style => (
                    style.palette.mode === 'dark' ? {
                      textDecoration: 'exposicoes' === section ? 'underline' : 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    } : {
                    backgroundColor: 'exposicoes' === section ? style.palette.primary.light : style.palette.primary.main,
                    '&:hover': {
                      backgroundColor: style.palette.primary.light
                    }
                  })}
                  onMouseEnter={() => setSection("exposicoes")}
                  onClick={handleSectionClick}>
              Exposições
            </Button>
            {profile.id ?
              <Button component={Link} to="/perfil/contato" 
                  color="text"
                  variant={'text'}
                  sx={style => (style.palette.mode === 'dark' ? {
                      textDecoration: 'perfil' === section ? 'underline' : 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    } : {
                    backgroundColor: 'perfil' === section ? style.palette.primary.light : style.palette.primary.main,
                    '&:hover': {
                      backgroundColor: style.palette.primary.light
                    }
                  })}
                  onMouseEnter={() => setSection("perfil")}
                  onClick={handleSectionClick}>
                Perfil
              </Button>
              : ''}
          </Stack>
          <Box sx={{ ml: "auto" }}></Box>
          <Stack
            direction="row"
            spacing={2}>
            <BotaoTema />
            {profile.id ?
              (<React.Fragment><BotaoNotificacoes handleClick={handleClick} /><Button color="text" variant="text" onClick={() => logOut()}><GoogleIcon /> Sair</Button></React.Fragment>)
              : (<Button color="text" variant="text" onClick={() => login()}><GoogleIcon /> Entrar</Button>)}
          </Stack>
        </Toolbar>
      </AppBar>
      {profile.id ?
        <AppBar position="relative" color="secondary">
          <Toolbar>
            <Stack
              direction="row"
              spacing={2}
            >
              {router.routes[0].children.filter(s => s.navBar === true && s.path === section)
                .flatMap((secao) =>
                  secao.children.filter(r => r.navBar === true)
                    .map((rota) =>
                      <Button component={Link} key={rota.id} to={secao.path.concat('/', rota.path)} color="text"
                          variant="text" sx={style => (style.palette.mode === 'dark' ? {
                            textDecoration: rota.path === currentPath[2] || (rota.path === '' && !currentPath[2]) ? 'underline' : 'none',
                            '&:hover': {
                              textDecoration: 'underline'
                            }
                          } : {
                            backgroundColor: rota.path === currentPath[2] || (rota.path === '' && !currentPath[2]) ? style.palette.secondary.light : style.palette.secondary.main
                          })}>
                        {rota.name}
                      </Button>
                  )
                )}
            </Stack>
          </Toolbar>
        </AppBar>
        : ''}
      <MenuNotificacao anchorEl={anchorEl} handleClose={handleClose} open={open} notificacoes={notificacoes} atualizarNotificacoes={atualizarNotificacoes} />
    </React.Fragment>
  );
}