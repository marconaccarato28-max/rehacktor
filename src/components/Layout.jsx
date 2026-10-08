import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import GenreSelect from "./GenreSelect.jsx";

function Layout() {
  const genres = useLoaderData();

  return (
    <>
      <Navbar />

      <div className="bg-base-200 px-6 py-4">
        <GenreSelect genres={genres} />
      </div>

      <Outlet />
    </>
  );
}

export default Layout;