import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import YoutubeEmbed from './YoutubeEmbed';
import AudioPlayer from 'material-ui-audio-player';
import RemoveIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import AddIcon from '@mui/icons-material/Add';
import MenuNovoElemento from './Painel/MenuNovoElemento';

function pauseOthers(event) {
  const audio_elements = document.getElementsByTagName("audio")
  for(let i=0; i < audio_elements.length; i++) {
    const audio_element = audio_elements[i];
    if (audio_element !== event.target) {
      audio_element.pause();
    }
  }
}

export const Painel = ({ painel, ativo, editavel }) => {
  if (ativo) {
    if (painel.elementos) {
      
      const [elementos, setElementos] = React.useState(painel.elementos);

      const [alteracoes, setAlteracoes] = React.useState([]);

      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = (selected) => {
        setAnchorEl(null);
      };
    
      const removerElemento = (elemento) => {
        console.log(elemento);
        setAlteracoes([...alteracoes, { id: elemento.id, remover: true }]);
        setElementos(elementos.map(e => {
          if (e.id === elemento.id) {
            e.removido = true;
          }
          return e;
        }));
      };
    
      const devolverElemento = (elemento) => {
        console.log(elemento);
        setAlteracoes(alteracoes.filter(e => e.id !== elemento.id));
        setElementos(elementos.map(e => {
          if (e.id === elemento.id) {
            e.removido = false;
          }
          return e;
        }));
      };

      const adicionarElemento = () => [
        
      ];
    
      return (
        <Container sx={{backgroundColor: 'primary.light'}}>
          <Box>
            <Stack>
              {elementos.map(elemento => (
                <Fragment>
                  <Container key={elemento.id} className={'elemento'} sx={elemento.removido ? {backgroundColor: 'darkgrey'}:{}}>
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
                    {editavel
                      ? elemento.removido
                        ? <Button className="remover-elemento" onClick={() => devolverElemento(elemento)}><UndoIcon fontSize='large' /></Button>
                        : <Button className="remover-elemento" onClick={() => removerElemento(elemento)}><RemoveIcon fontSize='large' /></Button>
                      : undefined}
                  </Container>
                </Fragment>
              ))}
              {editavel ? <Button onClick={e => handleClick(e)}><Stack><Typography>Adicionar Elemento</Typography><AddIcon /></Stack></Button>:undefined}
            </Stack>
          </Box>
          {alteracoes ? <Button sx={{position: 'fixed', right: '0', bottom: '0'}}>Salvar Alteracoes</Button>:undefined}
          <MenuNovoElemento anchorEl={anchorEl} handleClose={handleClose} open={open} />
        </Container>
      )
    } else {
      return (<Container><Typography variant="h3">Carregando...</Typography></Container>)
    }
  }
}
