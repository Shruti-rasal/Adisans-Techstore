import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
  position="top-center"
  toastOptions={{
    duration: 4000,
    style: {
      background: "#F1E2D1",
      color: "#3B7597",
      padding: "18px",
      fontSize: "18px",
      borderRadius: "10px",
      minWidth: "300px",
    },
  }}
/>
  </StrictMode>,
)
