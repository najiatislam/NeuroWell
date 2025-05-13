import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

<I18nextProvider i18n={i18n}>
  <App />
</I18nextProvider>

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <App/>     
    </AppContextProvider> 
  </BrowserRouter>,
 
)
