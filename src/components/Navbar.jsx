import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../services/supabase.js";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    navigate(`/search/${query.trim()}`);
    setQuery("");
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    alert("Logout effettuato");
    navigate("/login");
  }

  return (
    <nav className="navbar gap-4 bg-base-100 px-6 shadow-md">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold">
          Rehacktor
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Cerca un gioco..."
          className="input input-bordered"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
        />

        <button
          type="submit"
          className="btn btn-primary"
        >
          Cerca
        </button>
      </form>

      {!loading && !user && (
        <>
          <Link
            to="/register"
            className="btn btn-ghost"
          >
            Registrati
          </Link>

          <Link
            to="/login"
            className="btn btn-ghost"
          >
            Login
          </Link>
        </>
      )}

      {!loading && user && (
        <>
          <Link
            to="/profile"
            className="btn btn-ghost"
          >
            Profilo
          </Link>

          <Link
            to="/favorites"
            className="btn btn-ghost"
          >
            Preferiti
          </Link>

          <span className="hidden lg:inline">
            {user.user_metadata?.username ||
              user.email}
          </span>

          <button
            type="button"
            className="btn btn-error"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;