import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// ? 2) REDUX. Импортируем provider, хранилище
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

  <BrowserRouter>

    {/* 3) REDUX. Оборачиваем приложение в провайдер */}
    <Provider store={store}>
      <App />
    </Provider>

  </BrowserRouter>

  // </React.StrictMode>
); 