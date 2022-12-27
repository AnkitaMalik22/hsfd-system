import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { Provider } from "react-redux";
import store from "./store.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
           <SnackbarProvider maxSnack={3}>

           <App />
           </SnackbarProvider>
    
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


