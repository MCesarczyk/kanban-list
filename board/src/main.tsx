import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './app/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
