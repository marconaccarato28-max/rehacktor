import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Homepage from "../views/Homepage.jsx";
import SearchPage from "../views/SearchPage.jsx";
import DetailPage from "../views/DetailPage.jsx";

import {
  getGames,
  getSearchedGames,
  getGameDetail,
} from "./loaders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
        loader: getGames,
      },
      {
        path: "search/:query",
        element: <SearchPage />,
        loader: getSearchedGames,
      },
      {
        path: "game/:id",
        element: <DetailPage />,
        loader: getGameDetail,
      },
    ],
  },
]);

export default router;