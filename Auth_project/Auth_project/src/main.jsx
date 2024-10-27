import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import router from './Routerr.jsx'
import { ContextProvider } from './Contexts/ContextProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <RouterProvider router={router}/>
    </ContextProvider>
    

  </StrictMode>,
)
