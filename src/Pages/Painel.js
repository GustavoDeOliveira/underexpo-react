import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import YoutubeEmbed from '../Components/YoutubeEmbed';
import AudioPlayer from 'material-ui-audio-player';

function pauseOthers(event) {
  const audio_elements = document.getElementsByTagName("audio")
  for(let i=0; i < audio_elements.length; i++) {
    const audio_element = audio_elements[i];
    if (audio_element !== event.target) {
      audio_element.pause();
    }
  }
}

export const Painel = (params) => {
  const { painel, ativo } = params;
  if (ativo) {
    if (painel.elementos) {
      return (
        <Container sx={{backgroundColor: 'primary.light'}}>
          <Box>
            <Stack>
              {painel.elementos.map(elemento => (
                <Container key={elemento.id}>
                  {elemento.titulo ? <Typography gutterBottom variant="h3" color="text.primary">{elemento.titulo}</Typography> : ''}
                  {{
                    'texto': <Typography color="text.secondary">{elemento.conteudo}</Typography>,
                    'imagem': <Box sx={{backgroundImage: `url(${elemento.conteudo})`}} />,
                    'video': <YoutubeEmbed embedId={elemento.conteudo} />,
                    'audio':
                      (elemento.conteudo
                      ? <Container sx={{pb: '32px'}}><AudioPlayer onPlayed={pauseOthers} rounded width="100%" variation="primary" spacing={0} src={elemento.conteudo} /></Container>
                      : <Typography>Não foi possível carregar o arquivo de áudio.</Typography>)
                  }[elemento.tipo]}
                </Container>
              ))}
            </Stack>
          </Box>
        </Container>
      )
    } else {
      return (<Container><Typography variant="h3">Carregando...</Typography></Container>)
    }
  }
}
