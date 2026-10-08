import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase.js";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    alert("Logout effettuato");
    navigate("/login");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    navigate(`/search/${query.trim()}`);
    setQuery("");
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
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="submit" className="btn btn-primary">
          Cerca
        </button>
      </form>

      <Link to="/register" className="btn btn-ghost">
        Registrati
      </Link>

      <Link to="/login" className="btn btn-ghost">
        Login
      </Link>

      <button
        type="button"
        className="btn btn-error"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;