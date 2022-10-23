import React from 'react';
import { createRoot } from 'react-dom/client';
/* import { Provider } from 'react-redux';
import { store } from './app/store'; */
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Search from './Search';
import Details, { detailsLoader } from './Details';
import Favourites from './Favourites';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: "details/:id",
    loader: detailsLoader,
    element: <Details />,
  },
  {
    path: "favourites",
    element: <Favourites />,
  },
])


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <RouterProvider router={router} />
    {/* </Provider> */}
  </React.StrictMode>
);
