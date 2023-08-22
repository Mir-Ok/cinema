// ГОТОВО

import "./App.css";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Root, rootLoader } from "./pages/root/root";
import { CreateContent, createContentLoader } from "./components/content/content";
import { Film, filmLoader } from "./pages/film/film";
import { ErrorPage } from "./pages/error-page/error-page";
import { RouterProvider } from "react-router-dom";

const PATHES = {
   root: "/",
   allFilms: "films/:page/:sortby/:search?",
   film: "films/:page/:sortby/:search/:film_uid",
};

const router = createBrowserRouter([
   {
      path: PATHES.root,
      element: <Root />,
      errorElement: <ErrorPage />,
		loader: rootLoader,
      children: [
         {
            path: PATHES.allFilms,
            element: <CreateContent />,
				errorElement: <ErrorPage />,
            loader: createContentLoader,
         },
         {
            path: PATHES.film,
            element: <Film />,
				errorElement: <ErrorPage />,
            loader: filmLoader,
         },
      ],
   },
]);

function App() {
   return (
      <RouterProvider router={router} />
   );
}

export { App, PATHES };
