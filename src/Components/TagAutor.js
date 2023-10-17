import { Box, Typography } from '@mui/material'
import React from 'react'

export const TagAutor = (params) => {
  const prefixo = params.organizador ? 'organizada por @' : 'por @';
  return (
    <Box bgcolor="primary.light" sx={{
      padding: '0 4px 0 16px',
      borderRadius: '16px 0 0 0',
      position: 'absolute',
      bottom: 0,
      right: 0,
      textTransform: 'none'
    }}>
      <Typography variant="body1" color="text.primary" textAlign="right">
        {prefixo}{params.nome}
      </Typography>
    </Box>
  )
}
