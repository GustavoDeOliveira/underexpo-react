import { Box, Button, Container, Divider, Input, Stack, styled, TextField, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import YoutubeEmbed from './YoutubeEmbed';
import AudioPlayer from 'material-ui-audio-player';
import RemoveIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/CloudUpload';
import UpwardIcon from '@mui/icons-material/ArrowUpward';
import DownwardIcon from '@mui/icons-material/ArrowDownward';
import MenuNovoElemento from './Painel/MenuNovoElemento';
import { DialogoObras } from './DialogoObras';
import { PerfilApi } from '../Services';
import RootRef from "@material-ui/core/RootRef";

const api = new PerfilApi();

function pauseOthers(event) {
  const audio_elements = document.getElementsByTagName("audio")
  for (let i = 0; i < audio_elements.length; i++) {
    const audio_element = audio_elements[i];
    if (audio_element !== event.target) {
      audio_element.pause();
    }
  }
}

export const Painel = ({ painel, ativo, editavel, aoSalvarAlteracoes }) => {
  if (ativo) {
    if (painel.elementos) {
      const [elementos, setElementos] = React.useState(painel.elementos.map((e, i) => ({...e, indice: i})));
      if (editavel) {
        const [alteracoes, setAlteracoes] = React.useState(false);

        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);

        const [elementoAEditar, setElementoAEditar] = React.useState(null);
        const [obras, setObras] = React.useState([]);

        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = (selected) => {
          setAnchorEl(null);
          console.log(selected);
          if (selected) {
            adicionarElemento({ tipo: selected.id });
          }
        };

        const removerElemento = (elemento) => {
          console.log(elemento);
          setAlteracoes(true);

          setElementos(elementos.map(e => {
            if (e.id === elemento.id) {
              return { ...e, removido: true };
            }
            return e;
          }));
        };

        const devolverElemento = (elemento) => {
          console.log(elemento);
          setElementos(elementos.map(e => {
            if (e.id === elemento.id) {
              return { ...e, removido: false }
            }
            return e;
          }));
        };

        const adicionarElemento = (elemento) => {
          elemento.id = (elementos.length + 1) * -1;
          setElementos([...elementos, elemento]);
          setAlteracoes(true);
        };

        const alterarElemento = (id, titulo, conteudo, obraId) => {
          setAlteracoes(true);
          setElementos(elementos.map(e => {
            if (e.id === id) {
              return { ...e, titulo: titulo, conteudo: conteudo, obraId: obraId };
            }
            return e;
          }));
        }

        const reordenarElemento = (elemento, acima) => {
          setAlteracoes(true);
          const index = elementos.indexOf(elemento);
          const newIndex = index + acima;
          let novo = [...elementos];
          novo.splice(index, 1);
          novo.splice(newIndex, 0, elemento);

          setElementos(novo);
        }

        const reverterAlteracoes = ev => {
          setElementos(painel.elementos.map(e => ({...e})));
          setAlteracoes(false);
        };

        const salvarAlteracoes = (ev) => {
          console.log('ORIGINAL: %o', painel.elementos);
          elementos.forEach((e, i) => e.indice = i);
          console.log('ELEMENTOS: %o', elementos);
          const adicionados = elementos.filter(e => e.id < 0 && !e.removido)
            .map(elemento => {
              let novo = {titulo: elemento.titulo, conteudo: elemento.conteudo, tipo: elemento.tipo, obraId: elemento.obraId, indice: elemento.indice};
              return novo;
            });
          console.log('ADICIONADOS: %o', adicionados);
          const modificados = elementos
            .filter(elemento => elemento.id > 0 && !elemento.removido)
            .map(elemento => {
              const original = painel.elementos.find(e => e.id === elemento.id);
              if (original) {
                let novo = { id: original.id };
                if (elemento.titulo !== original.titulo) {
                  novo.titulo = elemento.titulo;
                }
                if (elemento.conteudo !== original.conteudo) {
                  novo.conteudo = elemento.conteudo;
                }
                if (elemento.tipo !== original.tipo) {
                  novo.tipo = elemento.tipo;
                }
                if (elemento.indice !== original.indice) {
                  novo.indice = elemento.indice;
                }
                if (elemento.obraId !== original.obraId) {
                  novo.obraId = elemento.obraId;
                }
                return Object.keys(novo).length > 1 ? novo : undefined;
              }
            }).filter(e => e !== undefined);
          console.log('MODIFICADOS: %o', modificados);
          const removidos = elementos
            .filter(elemento => elemento.id > 0 && elemento.removido)
            .map(elemento => ({ id: elemento.id, removendo: true }));
          console.log('REMOVIDOS: %o', removidos);

          const alteracoes = [...adicionados, ...modificados, ...removidos].sort((e1, e2) => e1.indice - e2.indice);
          console.log('TODOS: %o', alteracoes);

          aoSalvarAlteracoes(alteracoes)
          .then(result => {
            setAlteracoes(false);

            const elementos = () => result.elementos.map((e,i) => ({...e, indice: i}));
            setElementos(elementos());
            painel.elementos = elementos();
          });
        }

        const popupEscolherImagem = (ev, elemento) => {
          api.carregarObras(1, 50, { tipo: 'imagem', ordenacao: 'recentes' }, (err, data, res) => {
            setObras(data);
            setElementoAEditar(elemento);
          });
        }

        const popupEscolherAudio = (ev, elemento) => {
          api.carregarObras(1, 50, { tipo: 'audio', ordenacao: 'recentes' }, (err, data, res) => {
            setObras(data);
            setElementoAEditar(elemento);
          });
        }

        const fecharDialogoObras = (elemento, obra) => {
          console.log('OBRA: %o', obra);
          console.log('ELEMENTO: %o', elemento);
          alterarElemento(elemento.id, elemento.titulo, obra.url, obra.id);
          setElementoAEditar(null);
          setObras([]);
        }
        const ref = React.createRef();
        return (
          <Container sx={{ backgroundColor: 'primary.light' }}>
            {elementoAEditar ? <DialogoObras id={'editar-painel'} element={elementoAEditar} onClose={fecharDialogoObras} open={Boolean(elementoAEditar)} works={obras} /> : undefined}
            <Box>
              <Stack>
                {elementos.map(elemento => (
                  <Fragment>
                    <Divider variant='middle' sx={{ pb: '4px' }} />
                    <Container key={elemento.id} className={'elemento'} >
                      <Button className="reordenar-elemento acima" disabled={elemento.removido} onClick={() => !elemento.removido ? reordenarElemento(elemento, -1) : undefined}><UpwardIcon fontSize='large' /></Button>
                      <Button className="reordenar-elemento abaixo" disabled={elemento.removido} onClick={() => !elemento.removido ? reordenarElemento(elemento, 1) : undefined}><DownwardIcon fontSize='large' /></Button>
                      <Container sx={elemento.removido ? { backgroundColor: 'darkgrey', pointerEvents: 'none' } : {}}>
                        <TextField variant="filled" label="Título" name="titulo" value={elemento.titulo} fullWidth onChange={(ev) => alterarElemento(elemento.id, ev.target.value, elemento.conteudo, elemento.obraId)} align="center" sx={{ pr: '4px' }} />
                        {{
                          'T': <TextField variant="filled" fullWidth label="Conteúdo" name="conteudo" value={elemento.conteudo} required onChange={(ev) => alterarElemento(elemento.id, elemento.titulo, ev.target.value, elemento.obraId)} align="center" sx={{ pr: '4px' }} />,
                          'I': <Fragment>
                            <Button variant='contained' disabled={elemento.removido} fullWidth onClick={ev => popupEscolherImagem(ev, elemento)}>Escolher Imagem</Button>
                            <img src={elemento.conteudo} />
                          </Fragment>,
                          'V': <Fragment>
                            <TextField label="ID de incorporação do YouTube" name="conteudo" fullWidth placeholder="Conjunto de letras no final da url do vídeo. ex: eiHVXuMjJDL" value={elemento.conteudo} onChange={(ev) => alterarElemento(elemento.id, elemento.titulo, ev.target.value, elemento.obraId)} align="center" sx={{ pr: '4px' }} />
                            {elemento.conteudo ? <YoutubeEmbed embedId={elemento.conteudo} /> : undefined}
                          </Fragment>,
                          'A':
                            <Fragment>
                              <Button variant='contained' disabled={elemento.removido} fullWidth onClick={ev => popupEscolherAudio(ev, elemento)}>Escolher Áudio</Button>
                              {(elemento.conteudo
                              ? <Container sx={{ pb: '32px', pt: '32px' }}>
                                  <AudioPlayer onPlayed={pauseOthers} rounded width="100%" variation="primary" spacing={0} src={elemento.conteudo} />
                                </Container>
                              : <Typography>Não foi possível carregar o arquivo de áudio.</Typography>)}
                            </Fragment>
                        }[elemento.tipo]}
                      </Container>
                      {elemento.removido
                        ? <Button className="remover-elemento" onClick={() => devolverElemento(elemento)}><UndoIcon fontSize='large' /></Button>
                        : <Button className="remover-elemento" onClick={() => removerElemento(elemento)}><RemoveIcon fontSize='large' /></Button>}
                    </Container>
                  </Fragment>
                ))}
                <Button variant='contained' onClick={e => handleClick(e)}><Stack><Typography>Adicionar Elemento</Typography><AddIcon /></Stack></Button>
              </Stack>
            </Box>
            {alteracoes ? <Container sx={{ position: 'fixed', right: '0', bottom: '0' }}>
              <Button variant='contained' onClick={reverterAlteracoes}>Reverter Alteracoes</Button>
              <Button variant='contained' onClick={salvarAlteracoes}>Salvar Alteracoes</Button>
            </Container> : undefined}
            <MenuNovoElemento anchorEl={anchorEl} handleClose={handleClose} open={open} />
          </Container>
        );
      }

      return (
        <Container sx={{ backgroundColor: 'primary.light' }}>
          <Box>
            <Stack>
              {elementos.map(elemento => (
                <Fragment>
                  <Container key={elemento.id} className={'elemento'} sx={elemento.removido ? { backgroundColor: 'darkgrey' } : {}}>
                    {elemento.titulo ? <Typography gutterBottom variant="h3" color="text.primary">{elemento.titulo}</Typography> : ''}
                    {{
                      'T': <Typography color="text.secondary">{elemento.conteudo}</Typography>,
                      'I': <img src={elemento.conteudo} />,
                      'V': <YoutubeEmbed embedId={elemento.conteudo} />,
                      'A':
                        (elemento.conteudo
                          ? <Container sx={{ pb: '32px' }}><AudioPlayer onPlayed={pauseOthers} rounded width="100%" variation="primary" spacing={0} src={elemento.conteudo} /></Container>
                          : <Typography>Não foi possível carregar o arquivo de áudio.</Typography>)
                    }[elemento.tipo]}
                  </Container>
                </Fragment>
              ))}
            </Stack>
          </Box>
        </Container>
      );
    } else {
      return (<Container><Typography variant="h3">Carregando...</Typography></Container>);
    }
  }
}
