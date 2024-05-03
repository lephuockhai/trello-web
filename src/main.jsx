import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.js'

//cấu hình react-toátify hiển thị thông báo trang
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // nhảy vào đường dẫn này bên trong node-modules

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <App />
      <ToastContainer />
    </CssVarsProvider>
  </React.StrictMode>
)
