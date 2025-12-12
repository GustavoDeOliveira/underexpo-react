import { Box } from '@mui/material'
import LogoImage from '../assets/images/logo.png'

export const LogoIcon = ({sx}) => (
    <Box component="img" sx={{...sx, mr: 1, maxWidth: 196, flexGrow: 1}} src={LogoImage} />
)
