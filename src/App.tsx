import { BrowserRouter } from 'react-router-dom';
import Routing from './routes/Routing';
import React from 'react';

const App = () => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};

export default App;
