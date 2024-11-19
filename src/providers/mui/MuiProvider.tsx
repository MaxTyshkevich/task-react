import { ThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';
import { Theme } from './config';
import { CssBaseline } from '@mui/material';

interface MuiProviderProps {
  children: ReactNode;
}

const MuiProvider = ({ children }: MuiProviderProps) => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiProvider;
