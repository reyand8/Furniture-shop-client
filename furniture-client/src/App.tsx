import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import theme from './assets/theme';
import AppRoutes from './routes';


function App() {
  return (
      <div className="app">
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </ThemeProvider>
      </div>
  );
}

export default App;