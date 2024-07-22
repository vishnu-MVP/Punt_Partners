import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';
import SST from './Pages/SST';
import TTS from './Pages/TTS';
import Translate from './Pages/Translate';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          
                  <Route path="/" element={<App />} />
             
                  
                  <Route path="speech-to-text" element={<SST />} />
                  <Route path="text-to-speech" element={<TTS />} />
                  <Route path="translate" element={<Translate />} />
                  
                </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
