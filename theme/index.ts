import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: '#fff864',
      main: '#fec52d',
      dark: '#c69500',
    },
    secondary: {
      light: '#2c2c2c',
      main: '#212121',
      dark: '#000000'
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Times New Roman',
  }
});

export default theme;
