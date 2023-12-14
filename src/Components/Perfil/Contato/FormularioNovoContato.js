import { Button, Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

export const FormularioNovoContato = (params) => {
  const [canalNovoContato, setCanalNovoContato] = React.useState('');
  const [nomeNovoContato, setNomeNovoContato] = React.useState('');
  const [linkNovoContato, setLinkNovoContato] = React.useState('');
  const [validando, setValidando] = React.useState(false);
  const [enviando, setEnviando] = React.useState(false);

  const validarNovoContato = () => {
    return canalNovoContato && nomeNovoContato && linkNovoContato;
  }

  const aoEnviarFormulario = (ev) => {
    ev.preventDefault();
    setValidando(true);
    console.log(ev);
    if (validarNovoContato()) {
      setEnviando(true);
      params.aoAdicionarContato({canal: canalNovoContato, nome: nomeNovoContato, link: linkNovoContato})
        .then(response => {
          setValidando(false);
          setCanalNovoContato('');
          setNomeNovoContato('');
          setLinkNovoContato('');
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
          error={validando && !canalNovoContato} value={canalNovoContato}
          onChange={ev => setCanalNovoContato(ev.target.value)}
          />
    </Grid>
    <Grid item xs={3}>
        <TextField
          fullWidth
          label="Nome"
          placeholder="@meu.instagram"
          error={validando && !nomeNovoContato}
          value={nomeNovoContato}
          onChange={ev => setNomeNovoContato(ev.target.value)}
          />
    </Grid>
    <Grid item xs={5}>
        <TextField
          fullWidth
          label="Link"
          placeholder="https://www.instagram.com/meu.instagram"
          error={validando && !linkNovoContato} value={linkNovoContato}
          onChange={ev => setLinkNovoContato(ev.target.value)}
          />
    </Grid>
    <Grid item xs={1}><Button type="submit"><AddIcon fontSize="large" /></Button></Grid>
    </Grid>
  );
};
