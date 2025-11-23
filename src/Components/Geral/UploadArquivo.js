import { Button, Container, Dialog, DialogContent, DialogTitle, Divider, Stack, Typography } from '@mui/material'
import UploadIcon from '@mui/icons-material/CloudUpload'
import React from 'react'
import { DialogoConfirmacao } from '../DialogoConfirmacao'
import styled from '@emotion/styled'
import { PreviaArquivo } from './PreviaArquivo'
import AudioPlayer from 'material-ui-audio-player'

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

export const UploadArquivo = ({ aoEnviarArquivo, id, tipo }) => {
  const [dialogOpen, setDialogOpen] = React.useState(Boolean(id));
  const [fileType, setFileType] = React.useState(tipo);
  const [arquivo, setArquivo] = React.useState(null);
  const [tamanhoArquivo, setTamanhoArquivo] = React.useState('');
  const [validando, setValidando] = React.useState(false);
  const [arquivoVisualizacao, setArquivoVisualizacao] = React.useState(null);

  React.useEffect(() => {
    setDialogOpen(Boolean(id));
  }, [id]);

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

  const dialogOnClose = () => {
    setFileType('*');
    setDialogOpen(false);
    setValidando(false);
    setArquivo(null);
    setTamanhoArquivo('');
    setArquivoVisualizacao(null);
  };

  const validarFormulario = () => {
    setValidando(true);
    return arquivo && arquivo.size <= tamanhoMaximoArquivo;
  };

  const enviarArquivo = (ev) => {
    ev.preventDefault();
    if (validarFormulario()) {
      aoEnviarArquivo(ev, { arquivo: arquivo })
        .finally(() => {
          console.log(arquivo);
          dialogOnClose();
        });
    }
  };

  const conteudoFormulario = <Stack>
    <Button component="label" variant="contained" sx={(theme) => validando && !arquivo ? { color: theme.palette.error.main } : {}} startIcon={<UploadIcon />}>
      Enviar arquivo
      <InputOculto type="file" accept={fileType} onChange={aoAlterarArquivo} />
    </Button>
    <Typography sx={(theme) => tamanhoArquivo && !arquivo ? { color: theme.palette.error.main } : {}}>Tamanho máximo: {returnFileSize(tamanhoMaximoArquivo)}</Typography>
    {arquivo ? <PreviaArquivo arquivo={arquivo} /> : ''}
    {tamanhoArquivo && arquivo ? <Typography>Tamanho do arquivo: {tamanhoArquivo}</Typography> : ''}
    <Divider sx={{ mt: '12px', mb: '12px' }} />
  </Stack>;

  const botoesFormulario = [<Button key={0} onClick={dialogOnClose} className="cancelar">Cancelar</Button>, <Button key={1} variant="contained" onClick={enviarArquivo} className="confirmar" autoFocus>Confirmar</Button>];

  return (<React.Fragment>
    {arquivoVisualizacao
      ? <Dialog fullWidth open={arquivoVisualizacao != null} onClose={dialogOnClose}>
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
    <DialogoConfirmacao component="form" open={dialogOpen} onClose={dialogOnClose} id="dialogo-enviar-arquivo" titulo="Enviar Arquivo" mensagem={conteudoFormulario} botoes={botoesFormulario} />
  </React.Fragment>
  )
}