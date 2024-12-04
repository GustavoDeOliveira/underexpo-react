import CameraIcon from '@mui/icons-material/PhotoCamera';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Divider, Stack } from '@mui/material';
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

const rotas = [
  { titulo: 'Exposições', destino: '/exposicoes/explorar' },
  { titulo: 'Perfil', destino: '/perfil/contato' }
]

export default function Header() {
  const [user, setUser] = React.useState();
  const [profile, setProfile] = React.useState({id: getUserKey()});

  async function promptCriarUsuario(previousError) {
    const username = prompt(previousError + 'Escolha um nome de usuário! Use apenas letras, números, ponto e sublinhado ( . e _ )');
    if (username) {
      try {
        const data = await criarUsuario(profile.id, username);
        localStorage.setItem('name', data.nome);
        return data;
      } catch (reason) {
        if (reason.statusCode == 409) {
          return await promptCriarUsuario('Já existe um usuário com esse nome, por favor escolha outro.\n');
        } else {
          return await promptCriarUsuario('Ocorreu um erro inesperado. Por favor tente novamente.\n');
        }
      }
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
      if (profile.id) {
        console.log(profile);
        buscarUsuario(profile.id)
        .then(data => {
          console.log(data);
          localStorage.setItem('key', profile.id);
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
        if (location.pathname !== '/exposicoes/explorar') {
          location.pathname = '/exposicoes/explorar';
        }
      }
    },
    [profile]
  );

  const logOut = () => {
    googleLogout();
    setProfile({});
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificacoes, setNotificacoes] = React.useState([{id: 123, expo: {id: 12, painelId: 11424, nome: 'Exposição A', organizador: 'gustavo.oliveira'}}]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
    <AppBar position="relative">
      <Toolbar sx={{ justifyContent: 'space-between', width: '100%'}}>
        <CameraIcon sx={{ mr: 2 }} />
        <Stack
          direction="row"
          spacing={2}
        >
          <Typography variant="h6" color="inherit" noWrap>
            UnderExpo
          </Typography>
          { profile.id ? (rotas.map((rota, index) =>
              <Button key={index} href={rota.destino} variant="text" color="text">{rota.titulo}</Button>
            )):('')
          }
        </Stack>
        <Box sx={{ ml: "auto" }}></Box>
        <Stack
          direction="row"
          spacing={2}>
        { profile.id ?
          (<React.Fragment><BotaoNotificacoes handleClick={handleClick} /><Button variant="text" color="text" onClick={() => logOut()}><GoogleIcon /> Sair</Button></React.Fragment>)
        : (<Button variant="text" color="text" onClick={() => login()}><GoogleIcon /> Entrar</Button>)}
        </Stack>
      </Toolbar>
    </AppBar>
    <MenuNotificacao anchorEl={anchorEl} handleClose={handleClose} open={open} notificacoes={notificacoes} />
    </React.Fragment>
  );
}