import { Button, Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LoadingIcon from '@mui/icons-material/HourglassTop';
import React from 'react';

export const FormularioNovoContato = (params) => {
  //const [canalNovoContato, setCanalNovoContato] = React.useState(params.contatoFormulario.canal);
  //const [nomeNovoContato, setNomeNovoContato] = React.useState(params.contatoFormulario.nome);
  //const [linkNovoContato, setLinkNovoContato] = React.useState(params.contatoFormulario.link);
  const [validando, setValidando] = React.useState(false);
  const [enviando, setEnviando] = React.useState(false);

  const validarNovoContato = () => {
    return params.contato.canal.get && params.contato.nome.get && params.contato.link.get;// canalNovoContato && nomeNovoContato && linkNovoContato;
  }

  const aoEnviarFormulario = (ev) => {
    ev.preventDefault();
    setValidando(true);
    console.log(ev);
    if (validarNovoContato()) {
      setEnviando(true);
      params.aoAdicionarContato(ev)
        .then(() => {
          setValidando(false);
          params.contato.id.set(0);
          params.contato.canal.set('');
          params.contato.nome.set('');
          params.contato.link.set('');
        }).finally(setEnviando(false));
    } else {
      setTimeout(setValidando, 2000);
    }
}

  return (
    <Grid container component="form" onSubmit={aoEnviarFormulario}>
    <Grid item xs={3}>
        <TextField
          fullWidth
          label="Canal"
          placeholder="Instagram"
          error={validando && !params.contato.canal.get}
          value={params.contato.canal.get}
          onChange={ev => params.contato.canal.set(ev.target.value)}
          />
    </Grid>
    <Grid item xs={3}>
        <TextField
          fullWidth
          label="Nome"
          placeholder="@meu.instagram"
          error={validando && !params.contato.nome.get}
          value={params.contato.nome.get}
          onChange={ev => params.contato.nome.set(ev.target.value)}
          />
    </Grid>
    <Grid item xs={5}>
        <TextField
          fullWidth
          label="Link"
          placeholder="https://www.instagram.com/meu.instagram"
          error={validando && !params.contato.link.get}
          value={params.contato.link.get}
          onChange={ev => params.contato.link.set(ev.target.value)}
          />
    </Grid>
    <Grid item xs={1}><Button type="submit">{enviando ? <LoadingIcon fontSize="large" /> : <AddIcon fontSize="large" />}</Button></Grid>
    </Grid>
  );
};
