import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout.jsx";
import Homepage from "../views/Homepage.jsx";
import SearchPage from "../views/SearchPage.jsx";
import DetailPage from "../views/DetailPage.jsx";
import GenrePage from "../views/GenrePage.jsx";
import RegisterPage from "../views/RegisterPage.jsx";
import LoginPage from "../views/LoginPage.jsx";
import ProfilePage from "../views/ProfilePage.jsx";
import FavoritesPage from "../views/FavoritesPage.jsx";

import {
  getGames,
  getSearchedGames,
  getGameDetail,
  getGenres,
  getGamesByGenre,
} from "./loaders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: getGenres,
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
      {
        path: "genre/:genre",
        element: <GenrePage />,
        loader: getGamesByGenre,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
    ],
  },
]);

export default router;