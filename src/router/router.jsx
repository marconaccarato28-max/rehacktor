import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Homepage from "../views/Homepage";
import { getGames } from "./loaders";

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
    ],
  },
]);

export default router;