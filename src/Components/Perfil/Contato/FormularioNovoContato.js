import { Button, Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import LoadingIcon from '@mui/icons-material/HourglassTop';
import React from 'react';

export const FormularioNovoContato = ({contato, aoAdicionarContato}) => {
  const [validando, setValidando] = React.useState(false);
  const [enviando, setEnviando] = React.useState(false);

  const validarNovoContato = () => {
    return contato.canal.get && contato.nome.get && contato.link.get;
  }

  const aoEnviarFormulario = (ev) => {
    ev.preventDefault();
    setValidando(true);
    console.log(ev);
    if (validarNovoContato()) {
      setEnviando(true);
      aoAdicionarContato(ev)
        .then(() => {
          setValidando(false);
          contato.id.set(0);
          contato.canal.set('');
          contato.nome.set('');
          contato.link.set('');
        }).finally(setEnviando(false));
    } else {
      setTimeout(setValidando, 2000);
    }
  }

  return (
    <Grid container component="form" onSubmit={aoEnviarFormulario}>
      <Grid item md={3} sm={12}>
        <TextField
          fullWidth
          label="Canal"
          placeholder="Instagram"
          error={validando && !contato.canal.get}
          value={contato.canal.get}
          onChange={ev => contato.canal.set(ev.target.value)}
        />
      </Grid>
      <Grid item md={3} sm={12}>
        <TextField
          fullWidth
          label="Nome"
          placeholder="@meu.instagram"
          error={validando && !contato.nome.get}
          value={contato.nome.get}
          onChange={ev => contato.nome.set(ev.target.value)}
        />
      </Grid>
      <Grid item md={5} sm={12}>
        <TextField
          fullWidth
          label="Link"
          placeholder="https://www.instagram.com/meu.instagram"
          error={validando && !contato.link.get}
          value={contato.link.get}
          onChange={ev => contato.link.set(ev.target.value)}
        />
      </Grid>
      <Grid item sm={12} md={1}>
        <Button type="submit" variant='contained' sx={{ height: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
          {enviando ? <LoadingIcon fontSize="large" /> : contato.id.get ? <SaveIcon fontSize="large" /> : <AddIcon fontSize="large" />}
        </Button>
      </Grid>
    </Grid>
  );
};
