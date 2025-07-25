import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import {routeTree} from './routing/routeTree.js'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
   
const router = createRouter({routeTree})
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
 <QueryClientProvider client={queryClient}>
 <RouterProvider router={router}/>
 </QueryClientProvider>
)
