import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import store from "./redux";
import React from 'react';
import App from './App';
import './styles/index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>

        <App />

      </PersistGate>
    </Provider>

  </React.StrictMode>
);