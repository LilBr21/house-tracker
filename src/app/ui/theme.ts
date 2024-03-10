'use client'
import { createTheme } from '@mui/material/styles';

export const customTheme = {
    colors: {
        backgroundPrimary: '#000000',
        textPrimary: '#ffffff',
        accentPrimary: '#F8F32B',
        textSecondary: '#8D99AE',
        backgroundSecondary: '#2B2D42'
    },
    fontSizes: {
        large: '24px',
        medium: '16px',
        small: '14px'
    },
    fontWeights: {
        bold: 600,
        normal: 400,
        light: 300
    }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#8D99AE',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
  },
});