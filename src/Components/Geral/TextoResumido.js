import { Tooltip, Typography } from '@mui/material';
import { useRef, useState, useEffect } from 'react';

export const TextoResumido = ({ texto, props }) => {
  const textoRef = useRef(null);
  const [textoMuitoLongo, setTextoMuitoLongo] = useState(false);
  useEffect(() => {
    if (textoRef.current) {
      setTextoMuitoLongo(textoRef.current.scrollWidth > textoRef.current.clientWidth);
    }
  }, [texto]);
  return (
    <Tooltip title={textoMuitoLongo ? texto : ''} enterDelay={500}>
      <Typography ref={textoRef} {...props}>
        {texto}
      </Typography>
    </Tooltip>
  );
}
