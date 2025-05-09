import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from './assets/theme';
import AppRoutes from './routes';
import { store } from './features/store';


function App() {
  return (
      <div className="app">
          <Provider store={store}>
              <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <BrowserRouter>
                      <AppRoutes />
                  </BrowserRouter>
              </ThemeProvider>
          </Provider>
      </div>
  );
}

export default App;