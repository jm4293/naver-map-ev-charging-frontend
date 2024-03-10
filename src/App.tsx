import React from 'react';
import logo from './logo.svg';
import './styles/common.css';
import { BrowserRouter } from 'react-router-dom';
import { RootRouters } from './routers/rootRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RootRouters />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
