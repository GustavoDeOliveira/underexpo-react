import * as React from 'react';
import SystemThemeIcon from '@mui/icons-material/BrightnessAuto';
import DarkThemeIcon from '@mui/icons-material/ModeNight';
import LightThemeIcon from '@mui/icons-material/BrightnessHigh';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useColorScheme } from '@mui/material/styles';

const modes = {'system': SystemThemeIcon, 'dark': DarkThemeIcon, 'light': LightThemeIcon}
const modeSwitch = Object.keys(modes);

export default function BotaoTema({sx}) {
  const {mode, setMode} = useColorScheme();
  if (!mode) {
    return null;
  }
  const Icon = modes[mode];

  return (
    <React.Fragment>
      <Tooltip title="Escolher Tema" enterDelay={500}>
        <IconButton
          onClick={()=>setMode(modeSwitch[(modeSwitch.indexOf(mode)+1)%modeSwitch.length])}
          size="small"
          sx={style => ({ml: 2, color: style.palette.secondary.light, ...sx })}
        >
          <Icon {...{sx: {width: 32, height: 32 }}} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
