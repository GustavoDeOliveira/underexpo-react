import React, { useEffect } from 'react'
import { Alert, Box, Button, ButtonGroup, Collapse, Container, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useLoaderData } from 'react-router-dom';
import { TagAutor } from '../../Components/TagAutor';
import './exposicao.css';
import './editarExposicao.css';
import Edit from '@mui/icons-material/Edit';
import Cancel from '@mui/icons-material/CancelOutlined';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Delete';
import { ExposicaoApi, PerfilApi } from '../../Services';
import { DialogoConfirmacao } from '../../Components/DialogoConfirmacao';

const api = new ExposicaoApi();
const perfilApi = new PerfilApi();

function atualizarExposicao(id, titulo, descricao, paineis) {
  const p = new Promise((resolve, reject) => {
    console.log('request: %o', { id, titulo, descricao, paineis });
    api.atualizarExposicao({ nome: titulo, descricao: descricao, paineis: paineis }, titulo, descricao, paineis, id, (err, data, res) => {
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

function excluirPainel(id, idPainel) {
  const p = new Promise((resolve, reject) => {
    api.excluirPainel(id, idPainel, (err, data, res) => {
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

function buscarUsuarios(chave) {
  const p = new Promise((resolve, reject) => {
    perfilApi.buscarPerfis(chave, (err, data, res) => {
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

function enviarConvite(expoId, destinatario) {
  const p = new Promise((resolve, reject) => {
    perfilApi.enviarNotificacao({ body: { expoId: parseInt(expoId), autorId: destinatario.id } }, (err, data, res) => {
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

function removerNotificacao(id) {
  const p = new Promise((resolve, reject) => {
    perfilApi.removerNotificacao(id, (err, data, res) => {
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

export async function loader({ params }) {
  const p = new Promise((resolve, reject) => {
    api.carregarExposicaoPorId(params.idExposicao, (err, data, res) => {
      if (err) {
        console.log('error: %o', err);
        reject(err);
      }
      else {
        console.log('data: %o', data);
        resolve(data);
      }
    })
  });

  const exposicao = await p;
  exposicao.id = params.idExposicao;
  return { exposicao };
}

export const EditarExposicao = () => {
  const { exposicao } = useLoaderData();

  const [paineis, setPaineis] = React.useState(exposicao.paineis);

  const [editandoTitulo, setEditandoTitulo] = React.useState(false);
  const [novoTitulo, setNovoTitulo] = React.useState(exposicao.nome);

  const [editandoDescricao, setEditandoDescricao] = React.useState(false);
  const [novaDescricao, setNovaDescricao] = React.useState(exposicao.descricao);

  const [message, setMessage] = React.useState('Operação realizada com sucesso!');
  const [alertOpen, setAlertOpen] = React.useState(false);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [painelARemover, setPainelARemover] = React.useState();

  const [usuarioNovoConvite, setUsuarioNovoConvite] = React.useState('');
  const [sugestoesConvites, setSugestoesConvites] = React.useState([]);
  const [usuarioAConvidar, setUsuarioAConvidar] = React.useState();
  const [statusBuscaUsuarios, setStatusBuscaUsuarios] = React.useState('');
  const [convitesPendentes] = React.useState(exposicao.convites.map(c => ({ nome: c.artista, id: c.id })));
  const [conviteARemover, setConviteARemover] = React.useState();

  React.useEffect(() => {
    let retorno;
    if (usuarioNovoConvite.length > 2) {
      setStatusBuscaUsuarios('Digitando..');
      const timeout = setTimeout(() => {
        setStatusBuscaUsuarios('Buscando..');
        buscarUsuarios(usuarioNovoConvite)
          .then(response => {
            if (response.length) {
              setStatusBuscaUsuarios('');
            } else {
              setStatusBuscaUsuarios('Não foi possivel encontrar usuários com os termos de busca atuais..');
            }
            setSugestoesConvites(response);
          }).catch(reason => {
            console.log(reason);
            setStatusBuscaUsuarios('Não foi possivel buscar usuários. Por favor, tente novamente mais tarde.');
          })
      }, 1000);
      retorno = () => clearTimeout(timeout);
    } else {
      setSugestoesConvites([]);
    }
    return retorno;
  }, [usuarioNovoConvite]);

  useEffect(() => {
    if (novoTitulo.length > 500) {
      setNovoTitulo(novoTitulo.slice(0, 500));
    }
  }, [novoTitulo]);

  useEffect(() => {
    if (novaDescricao.length > 1000) {
      setNovaDescricao(novaDescricao.slice(0, 1000));
    }
  }, [novaDescricao]);

  const editarTitulo = () => {
    setEditandoTitulo(!editandoTitulo);
  };

  const salvarTitulo = () => {
    atualizarExposicao(exposicao.id, novoTitulo, undefined, [])
      .then(response => {
        exposicao.nome = novoTitulo;
        setEditandoTitulo(!editandoTitulo);
        setAlertOpen(true);
        setMessage('Título salvo com sucesso!');
        setTimeout(() => setAlertOpen(false), 2500);
      });
  };

  const cancelarEditarTitulo = () => {
    setNovoTitulo(exposicao.nome);
    setEditandoTitulo(!editandoTitulo);
  };

  const editarDescricao = () => {
    setEditandoDescricao(!editandoDescricao);
  };

  const salvarDescricao = () => {
    atualizarExposicao(exposicao.id, undefined, novaDescricao, [])
      .then(response => {
        exposicao.descricao = novaDescricao;
        setEditandoDescricao(!editandoDescricao);
        setMessage('Descrição salva com sucesso!');
        setAlertOpen(true);
        setTimeout(() => setAlertOpen(false), 2500);
      });
  };

  const cancelarEditarDescricao = () => {
    setNovaDescricao(exposicao.descricao);
    setEditandoDescricao(!editandoDescricao);
  };

  const confirmarRemocaoPainel = (painel) => {
    setPainelARemover(painel);
    setDialogOpen(true);
  }

  const cancelarRemocaoPainel = () => {
    setPainelARemover(undefined);
    setDialogOpen(false);
  }

  const removerPainel = () => {
    excluirPainel(exposicao.id, painelARemover.id)
      .then(response => {
        setDialogOpen(false);
        setPaineis(paineis.filter((p) => p != painelARemover));
        setPainelARemover(undefined);
        setMessage('Painel removido com sucesso!');
        setAlertOpen(true);
        setTimeout(() => setAlertOpen(false), 2500);
      });
  }

  const atualizarUsuarioNovoConvite = (value) => {
    setUsuarioNovoConvite(value);
  }

  const confirmarEnvioConvite = (sugestao) => {
    setUsuarioAConvidar(sugestao);
    setDialogOpen(true);
  }

  const cancelarConviteUsuario = () => {
    setDialogOpen(false);
    setUsuarioAConvidar(undefined);
  }

  const convidarUsuario = () => {
    enviarConvite(exposicao.id, usuarioAConvidar)
      .then(response => {
        convitesPendentes.push({ id: response.id, nome: usuarioAConvidar.nome });
        setDialogOpen(false);
        setUsuarioAConvidar(undefined);
        setUsuarioNovoConvite('');
      });
  }

  const confirmarRemoverConvite = (convite) => {
    setConviteARemover(convite);
    setDialogOpen(true);
  }

  const cancelarRemocaoConvite = () => {
    setDialogOpen(false);
    setConviteARemover(undefined);
  }

  const removerConvite = () => {
    removerNotificacao(conviteARemover.id)
      .then(response => {
        convitesPendentes.splice(convitesPendentes.indexOf(conviteARemover), 1);
        setDialogOpen(false);
        setConviteARemover(undefined);
      });
  }

  return (
    <Box component="form" action="#">
      <Collapse in={alertOpen} sx={{position: 'fixed', top: 0, zIndex: 9999}}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>

      {painelARemover ?
        <DialogoConfirmacao
          id="confirmar-excluir-painel"
          onClose={cancelarRemocaoPainel}
          open={dialogOpen}
          titulo="Confirmar remoção"
          mensagem={`Tem certeza de que quer remover o painel "${painelARemover.nome}"? Essa ação não pode ser desfeita, e @${painelARemover.autor} perderá todo o trabalho que foi feito no painel!`}
          botoes={[<Button onClick={() => removerPainel(painelARemover.id)} className="confirmar-critico">Excluir</Button>, <Button variant="contained" onClick={cancelarRemocaoPainel} className="cancelar-principal" autoFocus>Cancelar</Button>]}
        />
        : usuarioAConvidar ?
          <DialogoConfirmacao
            id="confirmar-convidar-usuario"
            onClose={cancelarConviteUsuario}
            open={dialogOpen}
            titulo="Confirmar convite"
            mensagem={`Convidar @${usuarioAConvidar.nome}?`}
            botoes={[<Button onClick={cancelarConviteUsuario} className="cancelar">Cancelar</Button>, <Button variant="contained" onClick={convidarUsuario} className="confirmar" autoFocus>Confirmar</Button>]}
          />
          : conviteARemover ?
            <DialogoConfirmacao
              id="confirmar-remover-convite"
              onClose={cancelarRemocaoConvite}
              open={dialogOpen}
              titulo="Cancelar convite"
              mensagem={`Cancelar convite para @${conviteARemover.nome}?`}
              botoes={[<Button onClick={removerConvite} className="confirmar-critico">Cancelar</Button>, <Button variant="contained" onClick={cancelarRemocaoConvite} className="cancelar-principal" autoFocus>Manter</Button>]}
            />
            : ''}

      <Grid container alignContent="stretch" alignItems="stretch" alignSelf="stretch" sx={{ position: 'relative', pt: '16px' }}>
        <Grid container item direction="column" xs={1}>
          {editandoTitulo
            ? <Grid item>
              <Button onClick={cancelarEditarTitulo}><Cancel fontSize="large" /></Button>
              <Button onClick={salvarTitulo}><Check fontSize="large" /></Button>
            </Grid>
            : <Grid item>
              <Button onClick={editarTitulo}><Edit fontSize="large" /></Button>
            </Grid>
          }
        </Grid>
        <Grid item alignContent="stretch" alignItems="stretch" alignSelf="stretch" xs={11}>
          {editandoTitulo
            ? <TextField id="editar-titulo" variant="outlined" fullWidth label="Título" name="nome" value={novoTitulo} onChange={(ev) => setNovoTitulo(ev.target.value)} align="center" sx={{ pr: '4px' }} />
            : <Typography gutterBottom variant="h2" color="text" align="center">{exposicao.nome}</Typography>
          }
        </Grid>
        <TagAutor nome={exposicao.organizador} organizador sx={{ pt: '100%' }} />
      </Grid>
      {editandoDescricao
        ? <Container sx={{ display: 'inline', float: 'right' }}>
          <Button onClick={cancelarEditarDescricao}><Cancel fontSize="large" /></Button>
          <Button onClick={salvarDescricao}><Check fontSize="large" /></Button>
        </Container>
        : <Container sx={{ display: 'inline', float: 'right' }}>
          <Button onClick={editarDescricao}><Edit fontSize="large" /></Button>
        </Container>
      }
      {editandoDescricao
        ? <TextField multiline id="editar-descricao" variant="outlined" fullWidth label="Descrição" name="descricao" value={novaDescricao} onChange={(ev) => setNovaDescricao(ev.target.value)} align="center" sx={{ pr: '4px', pl: '4px' }} />
        : <Typography marginLeft="16px" marginRight="16px" gutterBottom variant="h4" color="text">{exposicao.descricao}</Typography>
      }
      <Stack>
        {paineis.map(painel => (
          <Container key={painel.id} className="painel">
            <Button
              variant="text"
              sx={{ backgroundImage: `url(${painel.urlMiniatura})` }}
              className={'painel'}
              disableRipple
            >
              <Typography variant="h3" className="painel titulo">{painel.nome}</Typography>
              <TagAutor nome={painel.autor} />
              <Button className="remover-painel" onClick={() => confirmarRemocaoPainel(painel)}><RemoveIcon fontSize='large' /></Button>
            </Button>
          </Container>
        ))}
        <Container>
          <Typography variant="h3" align="center" className="painel titulo">NOVO PAINEL</Typography>
          <TextField
            id="novo-painel"
            variant="outlined"
            fullWidth
            placeholder="Começe a digitar aqui para buscar usuários para convidar a participar da exposição!"
            name="autor"
            value={usuarioNovoConvite}
            onChange={(ev) => atualizarUsuarioNovoConvite(ev.target.value)}
          />
          <Container sx={{marginTop: 2}}>
          {statusBuscaUsuarios ? <Typography gutterBottom >{statusBuscaUsuarios}</Typography> : ''}
          {sugestoesConvites ? <ButtonGroup>
            {sugestoesConvites.map(sugestao => (
              <Button className="sugestao-convite" key={sugestoesConvites.indexOf(sugestao)} onClick={() => confirmarEnvioConvite(sugestao)} autoFocus={sugestoesConvites.indexOf(sugestao) === 0}><AddIcon />@{sugestao.nome}</Button>
            ))}
          </ButtonGroup> : ''}
          </Container>
        </Container>
      </Stack>
      <Container>
        <Typography variant="h4">Convites Pendentes</Typography>
        {convitesPendentes.length ?
          <Stack>
            {convitesPendentes.map(convite => (
              <Stack key={convite.id} direction="row"><Typography>{convite.nome}</Typography><Button onClick={() => confirmarRemoverConvite(convite)}>Cancelar Convite</Button></Stack>
            ))}
          </Stack>
          : <Typography color="text.secondary">Nenhum convite pendente.</Typography>}
      </Container>
    </Box>
  )
}
