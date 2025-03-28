import { Box, Button, ButtonGroup, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import PreviewIcon from '@mui/icons-material/Preview'
import ListenIcon from '@mui/icons-material/AudioFile'
import RemoveIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LoadingIcon from '@mui/icons-material/HourglassTop'
import AddIcon from '@mui/icons-material/Add'
import UploadIcon from '@mui/icons-material/CloudUpload'
import React from 'react'
import { CardObra } from './CardObra'
import { DialogoConfirmacao } from '../../DialogoConfirmacao'
import styled from '@emotion/styled'
import { PreviaArquivo } from './PreviaArquivo'
import AudioPlayer from 'material-ui-audio-player'
import './listaObras.css'
import InfiniteScroll from 'react-infinite-scroller'
import { Carregamento } from '../../Geral/Carregamento'

const audioMimeTypes = 'audio/mp3,audio/wav,audio/flac'
const imageMimeTypes = 'image/png,image/jpeg,image/jpg,image/bmp'

const tamanhoMaximoArquivo = 10485760;

function returnFileSize(number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}

const InputOculto = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const aoClicarEmReproduzirAudio = (ev) => {
  const botao = ev.currentTarget;
  if (botao.tagName.toUpperCase() === 'BUTTON') {
    if (botao.children) {
      for (const child of botao.children) {
        if (child.tagName.toUpperCase() === 'AUDIO') {
          console.log(child);
          if (child.paused) {
            const promise = child.play();
            if (promise) {
              promise.then(() => console.log('play'))
                .catch(reason => console.log(reason));
            }
          } else {
            child.pause();
          }
          return;
        }
      }
    }
  }
};

const aoClicarEmPausarAudio = (ev) => {
  ev.target.currentTime = 0;
}

const CardNovaObra = ({ adicionandoElemento, dialogoAdicionarElemento }) => adicionandoElemento ?
  (<ButtonGroup sx={{ height: '100%', width: '100%' }}>
    <Button disabled sx={theme => ({ height: '100%', width: '100%', backgroundColor: theme.palette.primary.light, color: theme.palette.text.primary })}>
      <Stack alignItems="center">
        <LoadingIcon fontSize="large" />
        <Typography variant="h5">Enviando obra...</Typography>
      </Stack>
    </Button>
  </ButtonGroup>) :
  (<ButtonGroup sx={{ height: '100%' }}>
    <Button onClick={() => dialogoAdicionarElemento(imageMimeTypes)} sx={theme => ({ height: '100%', width: '100%', backgroundColor: theme.palette.primary.light, color: theme.palette.text.primary })}>
      <Stack alignItems="center">
        <AddIcon fontSize="large" />
        <Typography variant="h5">Enviar imagem</Typography>
      </Stack>
    </Button>
    <Button onClick={() => dialogoAdicionarElemento(audioMimeTypes)} sx={theme => ({ height: '100%', width: '100%', backgroundColor: theme.palette.primary.light, color: theme.palette.text.primary })}>
      <Stack alignItems="center">
        <AddIcon fontSize="large" />
        <Typography variant="h5">Enviar áudio</Typography>
      </Stack>
    </Button>
  </ButtonGroup>);
export const ListaObras = ({ aoAdicionarElemento, obras, carregarMais, maisParaCarregar }) => {
  const [adicionandoElemento, setAdicionandoElemento] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [fileType, setFileType] = React.useState('*');
  const [nomeNovaObra, setNomeNovaObra] = React.useState('');
  const [idObraAEditar, setIdObraAEditar] = React.useState(0);
  const [arquivo, setArquivo] = React.useState(null);
  const [tamanhoArquivo, setTamanhoArquivo] = React.useState('');
  const [validando, setValidando] = React.useState(false);
  const [arquivoVisualizacao, setArquivoVisualizacao] = React.useState(null);

  const aoAlterarArquivo = (ev) => {
    if (ev.target.files.length) {
      const selectedFile = ev.target.files.item(0);

      if (selectedFile.size > tamanhoMaximoArquivo) {
        setArquivo(null);
      } else {
        setTamanhoArquivo(returnFileSize(selectedFile.size));
        setArquivo(selectedFile);
      }
    } else {
      setArquivo(null);
      setTamanhoArquivo('');
    }
  }

  const dialogoAdicionarElemento = (fileType) => {
    setFileType(fileType);
    setDialogOpen(true);
  };

  const editarObra = (obra) => {
    setIdObraAEditar(obra.id);
    setNomeNovaObra(obra.nome);
    dialogoAdicionarElemento(obra.tipo === 'A' ? audioMimeTypes : imageMimeTypes);
  };

  const interacoes = (obra) => [
    obra.tipo === 'A'
      ? { nome: 'reproduzir', botao: id => <Button variant="contained" onClick={aoClicarEmReproduzirAudio}><audio src={obra.url} onPause={aoClicarEmPausarAudio} hidden /><ListenIcon fontSize="large" /></Button> }
      : { nome: 'visualizar', botao: id => <Button variant="contained" onClick={() => setArquivoVisualizacao(obra)}><PreviewIcon fontSize="large" /></Button> },
    { nome: 'excluir', botao: id => <Button variant="contained" className="destacado"><RemoveIcon fontSize="large" /></Button> },
    { nome: 'editar', botao: id => <Button variant="contained" onClick={() => editarObra(obra)}><EditIcon fontSize="large" /></Button> },
  ];

  const dialogOnClose = () => {
    setFileType('*');
    setDialogOpen(false);
    setValidando(false);
    setArquivo(null);
    setTamanhoArquivo('');
    setNomeNovaObra('');
  };

  const validarFormulario = () => {
    setValidando(true);
    return nomeNovaObra && ((arquivo && arquivo.size <= tamanhoMaximoArquivo) || (!arquivo && idObraAEditar));
  };

  const adicionarElemento = (ev) => {
    ev.preventDefault();
    if (validarFormulario()) {
      setAdicionandoElemento(true);
      aoAdicionarElemento(ev, { id: idObraAEditar, titulo: nomeNovaObra, arquivo: arquivo })
        .finally(() => {
          console.log(arquivo);
          setAdicionandoElemento(false);
          dialogOnClose();
        });
    }
  };

  const conteudoFormulario = <Stack>
    <Button component="label" variant="contained" sx={(theme) => !idObraAEditar && validando && !arquivo ? { color: theme.palette.error.main } : {}} startIcon={<UploadIcon />}>
      Enviar arquivo
      <InputOculto type="file" accept={fileType} onChange={aoAlterarArquivo} />
    </Button>
    <Typography sx={(theme) => tamanhoArquivo && !arquivo ? { color: theme.palette.error.main } : {}}>Tamanho máximo: {returnFileSize(tamanhoMaximoArquivo)}</Typography>
    {arquivo ? <PreviaArquivo arquivo={arquivo} /> : ''}
    {tamanhoArquivo && arquivo ? <Typography>Tamanho do arquivo: {tamanhoArquivo}</Typography> : ''}
    <Divider sx={{ mt: '12px', mb: '12px' }} />
    <TextField error={validando && !nomeNovaObra} label="Nome da Obra" required value={nomeNovaObra} onChange={ev => setNomeNovaObra(ev.target.value)} />
  </Stack>;

  const botoesFormulario = [<Button key={0} onClick={dialogOnClose} className="cancelar">Cancelar</Button>, <Button key={1} variant="contained" onClick={adicionarElemento} className="confirmar" autoFocus>Confirmar</Button>];

  return (<React.Fragment>
    {arquivoVisualizacao
      ? <Dialog fullWidth open={arquivoVisualizacao != null} onClose={() => setArquivoVisualizacao(null)}>
        <DialogTitle>{arquivoVisualizacao.nome}</DialogTitle>
        <DialogContent>
          {arquivoVisualizacao.tipo === 'I'
            ? <Container class="click-zoom">
              <label>
                <input type="checkbox" />
                <img src={arquivoVisualizacao.url} />
              </label>
            </Container>
            : <AudioPlayer src={arquivoVisualizacao.url} />}
        </DialogContent>
      </Dialog>
      : ''}
    <DialogoConfirmacao component="form" open={dialogOpen} onClose={dialogOnClose} id="dialogo-enviar-arquivo" titulo="Enviar Obra" mensagem={conteudoFormulario} botoes={botoesFormulario} />
    <Container>
      <InfiniteScroll
        pageStart={1}
        loadMore={carregarMais}
        loader={<Carregamento key={-2} />}
        hasMore={maisParaCarregar}
        initialLoad={true}
      >
        <Grid container spacing={4}>
          {obras.map(obra => (
            <Grid item key={obra.id} xs={12} sm={6} md={4}>
              {obra.id !== -1
                ? (<CardObra obra={obra} interacoes={interacoes(obra)} />)
                : (<CardNovaObra adicionandoElemento={adicionandoElemento} dialogoAdicionarElemento={dialogoAdicionarElemento} />)
              }
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  </React.Fragment>
  )
}