import { createBrowserRouter } from "react-router-dom";

import { LayoutDefault } from "./Layout";

import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:cripto",
        element: <Details />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ]
  },
]);
