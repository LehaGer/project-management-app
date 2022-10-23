import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

const appTheme = createTheme({
  palette: {
    primary: {
      main: '#FFB74D',
      contrastText: 'rgba(0,0,0,0.7)',
    },
  },
});

const AppTheme = ({ children }: { children: React.ReactElement }) => {
  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};

export default AppTheme;
