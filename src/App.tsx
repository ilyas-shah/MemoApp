import {CssBaseline, ThemeProvider} from '@mui/material';
import React from 'react';
import './App.css';
import {DashboardView} from 'features/Dashboard';
import {theme} from 'config/themeConfig';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <DashboardView />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
