import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { FormularioNovoContato } from '../../Components/Perfil/Contato/FormularioNovoContato';
import * as PerfilService from '../../Services/PerfilService'
import { useLoaderData } from 'react-router-dom';
import { ListaContatos } from '../../Components/Perfil/Contato/ListaContatos';

export async function loader() {
  const contatos = await PerfilService.buscarContatosDoUsuarioAtual();
  return { contatos };
}

export const Contato = () => {
  const [contatos, setContatos] = React.useState(useLoaderData().contatos);
  const [contatoId, setContatoId] = React.useState(0);
  const [contatoCanal, setContatoCanal] = React.useState('');
  const [contatoNome, setContatoNome] = React.useState('');
  const [contatoLink, setContatoLink] = React.useState('');
  const contato = {id: {get: contatoId, set: setContatoId}, canal: {get: contatoCanal, set: setContatoCanal}, nome: { get: contatoNome, set: setContatoNome}, link: {get: contatoLink, set: setContatoLink}};

  const editarContato = (ev, contato) => {
    setContatoId(contato.id);
    setContatoCanal(contato.canal);
    setContatoNome(contato.nome);
    setContatoLink(contato.link);
  };

  const removerContato = (ev, contato) => {
    if (contato.id === contatoId) {
      editarContato(ev, {id: 0, canal: '', nome: '', link: ''});
    } else {
      PerfilService.removerContato(contato.id)
        .then(response => {
          setContatos(contatos.filter(c=> c.id !== contato.id));
        });
    }
  };

  const salvarContato = (ev) => {
    return new Promise((resolve, reject) => {
      if (!contatoId) {
        PerfilService.adicionarContato(contatoCanal, contatoNome, contatoLink)
          .then(response => {
            setContatoId(response.id);
            setContatos([...contatos, {id: response.id, canal: contatoCanal, nome: contatoNome, link: contatoLink}]);
            resolve();
          }).catch(reason => reject(reason));
      } else {
        PerfilService.atualizarContato(contatoId, contatoCanal, contatoNome, contatoLink)
          .then(response => {
            setContatos(contatos.map((c, i) => {
              if (c.id === contatoId) {
                return {id: contatoId, canal: contatoCanal, nome: contatoNome, link: contatoLink};
              } else {
                return c;
              }
            }));
            //contatos.splice(contatos.findIndex(c => c.id === contato.id.get), 1, {id: contatoId, canal: contatoCanal, nome: contatoNome, link: contatoLink});
            resolve();
          }).catch(reason => reject(reason));
      }
    });
  };

  return (
    <Container>
      <Typography variant="h2">Contato</Typography>
      <ListaContatos contatos={contatos} aoEditarContato={editarContato} aoRemoverContato={removerContato} />
      <FormularioNovoContato aoAdicionarContato={salvarContato} contato={contato} />
    </Container>
  );
};
