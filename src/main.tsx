import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import store from "./store/store.ts";
import { Provider } from 'react-redux';
import Loader from './components/Loader/Loader.tsx';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import "./localization/setup.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
)
