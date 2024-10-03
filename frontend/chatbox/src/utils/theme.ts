import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Enable dark mode
    background: {
      default: '#1a1a2e', // Dark background
      paper: '#16213e', // Secondary background
    },
    primary: {
      main: '#007aff', // Blue accent color
    },
    text: {
      primary: '#eaeaea', // Text color for dark mode
    },
    divider: '#2e2e4f', // Divider color
  },
});

export default darkTheme;
