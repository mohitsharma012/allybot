import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter,Navigate } from 'react-router-dom'

import Index from './Pages/index'
import DashboardPage from './Pages/Dashboard'

const router = createBrowserRouter([
  { path: '/', element: <Index/> },
  { path : '/dashboard', element: <DashboardPage /> }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />    
  </StrictMode>,
)