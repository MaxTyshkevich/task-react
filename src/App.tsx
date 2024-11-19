import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import { router } from './providers/routes/routes';

import MuiProvider from './providers/mui/MuiProvider';
import { store } from './store/store';

function App() {
  return (
    <MuiProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MuiProvider>
  );
}

export default App;
