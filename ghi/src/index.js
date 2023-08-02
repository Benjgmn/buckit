import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import Home from "./Components/Accounts/Home";
import LoginForm from "./Components/Accounts/login";

import { store } from "./app/store";

import reportWebVitals from "./reportWebVitals";
import SignupForm from "./Components/Accounts/signup";
import BucketList from "./Components/Buckets/Buckets";
import BucketFilms from "./Components/Buckets/BucketFilms";
import CreateBucketPage from "./Components/Buckets/CreateBucket";
import FilmDetail from "./Components/Films/FilmDetail";

const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
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
        element: <CreateBucketPage />,
      },
      {
        path: "/films/:id",
        element: <FilmDetail />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={basename}>
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
