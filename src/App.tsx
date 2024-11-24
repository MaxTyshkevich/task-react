import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import { router } from './providers/routes/routes';

import MuiProvider from './providers/mui/MuiProvider';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <MuiProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </MuiProvider>
  );
}

export default App;
