import React from 'react';
import logo from './logo.svg';
// import './App.css';
import './styles/common.css';
import { BrowserRouter } from 'react-router-dom';
import { RootRouters } from './routers/rootRoutes';

function App() {
  return (
    <BrowserRouter>
      <RootRouters />
    </BrowserRouter>
  );
}

export default App;
