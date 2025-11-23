import './menuContatos.css'
import { Link, Menu, MenuItem, Typography } from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import React from 'react'

export const MenuContatos = ({ contatos, anchorEl, onClose }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={anchorEl != null}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      className="menu-contatos"
    >
      {contatos.map(c => <MenuItem className="contato" ><Link href={c.link} target='_blank'><Typography className="canal">{c.canal}: </Typography><Typography className="nome">{c.nome} </Typography><LinkIcon color='info.main' /></Link></MenuItem>)}
    </Menu>
  )
}
