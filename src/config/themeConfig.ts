import { createTheme, Theme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
      success: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
      success: React.CSSProperties['color'];
    };
  }
}

export const theme: Theme = createTheme({
  palette: {
    background: {
      default: '#FFFFFF',
    },
    primary: {
      main: '#1976d2',
      light: '#4A90E2',
    },
    secondary: {
      main: '#FFF',
      light: '#FF8776',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#FFFFFF',
    },
    neutral: {
     main: '#43a047',
    }
  },
  status: {
    danger: 'red',
    success: '#43a047'
  }
});
