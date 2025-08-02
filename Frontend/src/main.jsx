import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import {routeTree} from './routing/routeTree.js'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {store} from './store/store.js';

const queryClient = new QueryClient();

const router = createRouter({
    routeTree,
    context:{
        queryClient,
        store
    },
    defaultPreload: 'intent',
    defaultErrorComponent:({
        error
    })=>(
        <div>Something went wrong:{error.message}</div>
    )
});

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
 <QueryClientProvider client={queryClient}>
  <RouterProvider router={router}/>
 </QueryClientProvider>
 </Provider>
)
