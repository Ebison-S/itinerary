import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import store from './app/store';
import App from './App';
import ErrorBoundary from './components/common/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#201C1D',
                color: '#FBF6EF',
                borderRadius: '999px',
                padding: '12px 20px',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 16px 40px -20px rgba(32,28,29,0.5)',
              },
              success: { iconTheme: { primary: '#FF6B4A', secondary: '#FBF6EF' } },
              error: { iconTheme: { primary: '#E14F30', secondary: '#FBF6EF' } },
            }}
          />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);