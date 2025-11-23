import { Box, Container, Typography } from '@mui/material';
import React from 'react'
import { AudioPlayer } from './AudioPlayer';

export const PreviaArquivo = (params) => {
  if (!params.arquivo) { return; }

  const [previa, setPrevia] = React.useState(null);

  const reader = new FileReader();
  reader.onload = (readerEvent) => {
    setPrevia(readerEvent.target.result);
  };
  reader.readAsDataURL(params.arquivo);

  if (previa) {
    if (params.arquivo.type.includes('image')) {
      return (
        <Box component="img" width="100%" maxHeight={256} src={previa} />
      )
    } else if (params.arquivo.type.includes('audio')) {
      return (
        <Container sx={{minWidth: '320px', pt: '12px', pb: '12px'}}>
          <AudioPlayer src={previa} />
        </Container>
      )
    }
  } else {
    return (<Typography>Carregando Prévia...</Typography>)
  }
}
