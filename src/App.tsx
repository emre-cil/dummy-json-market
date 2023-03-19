import { BrowserRouter } from 'react-router-dom';
import Routing from './routes/Routing';
import React from 'react';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <BrowserRouter>
      <Routing />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
        }}
      />
    </BrowserRouter>
  );
};

export default App;
