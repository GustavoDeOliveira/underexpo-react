import { Box, Button, Container, Divider, IconButton, Input, Stack, styled, TextField, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import YoutubeEmbed from './YoutubeEmbed';
import RemoveIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/CloudUpload';
import UpwardIcon from '@mui/icons-material/ArrowUpward';
import DownwardIcon from '@mui/icons-material/ArrowDownward';
import MenuNovoElemento from './Painel/MenuNovoElemento';
import { DialogoObras } from './DialogoObras';
import { PerfilApi } from '../Services';
import { MenuContatos } from './Painel/MenuContatos';
import { AudioPlayer } from './Geral/AudioPlayer';

const api = new PerfilApi();

export const Painel = ({ painel, ativo, editavel, aoSalvarAlteracoes, sx }) => {
  if (ativo) {
    if (painel.elementos) {
      const [contatos, setContatos] = React.useState(painel && painel.contatos ? painel.contatos : []);
      const [anchorEl, setAnchorEl] = React.useState(null);
      const [elementos, setElementos] = React.useState((painel && painel.elementos) ? painel.elementos.map((e, i) => ({ ...e, indice: i })) : []);
      const [alteracoes, setAlteracoes] = React.useState(false);
      const open = Boolean(anchorEl);
      const [elementoAEditar, setElementoAEditar] = React.useState(null);
      const [obras, setObras] = React.useState([]);
      if (editavel) {
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
          setElementos(painel.elementos.map(e => ({ ...e })));
          setAlteracoes(false);
        };

        const salvarAlteracoes = (ev) => {
          console.log('ORIGINAL: %o', painel.elementos);
          elementos.forEach((e, i) => e.indice = i);
          console.log('ELEMENTOS: %o', elementos);
          const adicionados = elementos.filter(e => e.id < 0 && !e.removido)
            .map(elemento => {
              let novo = { titulo: elemento.titulo, conteudo: elemento.conteudo, tipo: elemento.tipo, obraId: elemento.obraId, indice: elemento.indice };
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

              const elementos = () => result.elementos.map((e, i) => ({ ...e, indice: i }));
              setElementos(elementos());
              painel.elementos = elementos();
            }).catch(reason => {
              console.error('REASON %o', reason);
              if (reason.message && reason.message === 'Unauthorized') {
                location.pathname = '/exposicoes/';
              }
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
          <Container>
            {elementoAEditar ? <DialogoObras id={'editar-painel'} element={elementoAEditar} onClose={fecharDialogoObras} open={Boolean(elementoAEditar)} works={obras} /> : undefined}
            <Box>
              <Stack>
                {elementos.map(elemento => (
                  <Fragment key={elemento.id}>
                    <Divider variant='middle' sx={{ pb: '4px' }} />
                    <Container key={elemento.id} className={'elemento'} >
                      <IconButton className="reordenar-elemento acima" disabled={elemento.removido} onClick={() => !elemento.removido ? reordenarElemento(elemento, -1) : undefined}><UpwardIcon fontSize='large' /></IconButton>
                      <IconButton className="reordenar-elemento abaixo" disabled={elemento.removido} onClick={() => !elemento.removido ? reordenarElemento(elemento, 1) : undefined}><DownwardIcon fontSize='large' /></IconButton>
                      <Container sx={style => (elemento.removido ? { backgroundColor: style.palette.action.disabledBackground, pointerEvents: 'none' } : {})}>
                        <TextField variant="filled" label="Título" name="titulo" value={elemento.titulo} fullWidth onChange={(ev) => alterarElemento(elemento.id, ev.target.value, elemento.conteudo, elemento.obraId)} align="center" sx={{ pr: '4px' }} />
                        {{
                          'T': <TextField variant="filled" fullWidth label="Conteúdo" name="conteudo" value={elemento.conteudo} required onChange={(ev) => alterarElemento(elemento.id, elemento.titulo, ev.target.value, elemento.obraId)} align="center" sx={{ pr: '4px' }} />,
                          'I': <Fragment>
                            <Button variant='contained' disabled={elemento.removido} fullWidth onClick={ev => popupEscolherImagem(ev, elemento)}>Escolher Imagem</Button>
                            <img src={elemento.conteudo} width="100%" />
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
                                  <AudioPlayer src={elemento.conteudo} />
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
                <Button variant='contained' onClick={e => handleClick(e)}><AddIcon /><Typography>Adicionar Elemento</Typography></Button>
              </Stack>
            </Box>
            {alteracoes ? <Box sx={{
                alignContent: 'flex-end',
                p: 2,
                display: 'flex',
                position: 'fixed',
                right: 0,
                left: 'auto',
                top: 64,
                zIndex: 99999
              }}>
              <Button variant='contained' onClick={reverterAlteracoes}>Reverter Alterações</Button>
              <Button variant='contained' onClick={salvarAlteracoes}>Salvar Alterações</Button>
            </Box> : undefined}
            <MenuNovoElemento anchorEl={anchorEl} handleClose={handleClose} open={open} />
          </Container>
        );
      }
      return (
        <Container color="primary" sx={style => ({ ...sx, backgroundColor: style.palette.background.paper})}>
          {contatos.length > 0 ? <Fragment>
          <MenuContatos contatos={contatos} anchorEl={anchorEl} onClose={ev => setAnchorEl(null)} />
          <Button color="secondary" sx={{marginLeft: 'auto', display: 'flow'}} variant="contained" onClick={ev => setAnchorEl(ev.currentTarget)}>Entrar em Contato</Button></Fragment> : undefined}
          <Box>
            <Stack>
              {elementos.map(elemento => (
                <Container key={elemento.id} className={'elemento'} sx={{marginBottom: '16px'}}>
                  {elemento.titulo ? <Typography gutterBottom variant="h3" color="text">{elemento.titulo}</Typography> : ''}
                  {{
                    'T': <Typography color="text">{elemento.conteudo}</Typography>,
                    'I': <img src={elemento.conteudo} width="100%" />,
                    'V': <YoutubeEmbed embedId={elemento.conteudo} />,
                    'A':
                      (elemento.conteudo
                        ? <Container sx={{ pb: '32px' }}><AudioPlayer src={elemento.conteudo} /></Container>                        : <Typography>Não foi possível carregar o arquivo de áudio.</Typography>)
                  }[elemento.tipo]}
                </Container>
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
