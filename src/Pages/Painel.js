import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import YoutubeEmbed from '../Components/YoutubeEmbed';

export const Painel = (params) => {
  const { painel } = params;
  if (painel.elementos && painel.expandido) {
    return (
      <Container>
        { painel.carregando
          ? <Typography variant="h3">Carregando...</Typography>
          : <Stack>
              {painel.elementos.map(elemento => (
                <Container key={elemento.id}>
                  {elemento.titulo ? <Typography gutterBottom variant="h3" color="text.primary">{elemento.titulo}</Typography> : ''}
                  {{
                    'texto': <Typography color="text.secondary">{elemento.conteudo}</Typography>,
                    'imagem': <Box sx={{backgroundImage: `url(${elemento.conteudo})`}} />,
                    'video': <YoutubeEmbed embedId={elemento.conteudo} />
                  }[elemento.tipo]}
                </Container>))}
            </Stack>
        }
      </Container>
    )
  }
}
