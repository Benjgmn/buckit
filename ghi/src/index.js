import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './Home';
import LoginForm from './login';



import { store } from './app/store';

import reportWebVitals from './reportWebVitals';
import SignupForm from './signup';
import BucketList from './Buckets';
import BucketFilms from "./BucketFilms";
import CreateBucketPage from './CreateBucket';
import FilmDetail from './FilmDetail';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/api/films",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/buckets",
        element: <BucketList />,
      },
      {
        path: "/buckets/:bucket_id/films",
        element: <BucketFilms />,
      },
      {
        path: "/buckets/create",
        element: <CreateBucketPage />
      },
      {
        path:"/films/:id",
        element: <FilmDetail />
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
