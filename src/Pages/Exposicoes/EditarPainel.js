import React from 'react'
import { ExposicaoApi } from '../../Services';
import { useLoaderData } from 'react-router-dom';
import { Alert, Box, Button, Collapse, Container, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Cancel from '@mui/icons-material/CancelOutlined';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { TagAutor } from '../../Components/TagAutor';
import { Painel } from '../../Components/Painel';
import './editarPainel.css';

const api = new ExposicaoApi();

function atualizarPainel(id, expoId, titulo, elementos) {
  const p = new Promise((resolve, reject) => {
    console.log('request: %o', { id, expoId, titulo, elementos });
    api.atualizarPainel({ nome: titulo, elementos: elementos, expoId: expoId, id: id }, titulo, elementos, expoId, id, (err, data, res) => {
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
    api.carregarPainelPorId(params.idExposicao, params.idPainel, (err, data, res) => {
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

  const painel = await p;
  painel.elementos = painel.elementos.map((e, i) => ({...e, indice: i}));
  painel.id = params.idPainel;
  painel.expoId = params.idExposicao;
  return { painel };
}

export function EditarPainel() {
  const { painel } = useLoaderData();

  const [editandoTitulo, setEditandoTitulo] = React.useState(false);
  const [novoTitulo, setNovoTitulo] = React.useState(painel.nome);

  const [message, setMessage] = React.useState('Operação realizada com sucesso!');
  const [alertOpen, setAlertOpen] = React.useState(false);

  const editarTitulo = () => {
    setEditandoTitulo(!editandoTitulo);
  };

  const salvarTitulo = () => {
    atualizarPainel(painel.id, painel.expoId, novoTitulo, [])
      .then(response => {
        painel.nome = novoTitulo;
        setEditandoTitulo(!editandoTitulo);
        setAlertOpen(true);
        setMessage('Título salvo com sucesso!');
        setTimeout(() => setAlertOpen(false), 2500);
      });
  };

  const cancelarEditarTitulo = () => {
    setNovoTitulo(painel.nome);
    setEditandoTitulo(!editandoTitulo);
  };

  const salvarElementos = (elementos) => {
    return new Promise((resolve, reject) =>
    atualizarPainel(painel.id, painel.expoId, painel.nome, elementos)
      .then(response => {
        setAlertOpen(true);
        setMessage('Painel salvo com sucesso!');
        setTimeout(() => setAlertOpen(false), 2500);
        painel.elementos = response.elementos
        resolve(response);
      }).catch(reject)
    );
  };

  return (
    <Box component="form" action="#">
      <Collapse in={alertOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
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

      <Grid container alignContent="stretch" alignItems="stretch" alignSelf="stretch" sx={{ position: 'relative', height: '128px', pt: '16px' }}>
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
            : <Typography gutterBottom variant="h2" color="text.primary" align="center">{painel.nome}</Typography>
          }
        </Grid>
        <TagAutor nome={painel.autor} sx={{ pt: '100%' }} />
      </Grid>
      <Painel painel={painel} ativo editavel aoSalvarAlteracoes={salvarElementos} />
    </Box>
  )
}
