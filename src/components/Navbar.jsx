import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/search/${query}`);
  };

  return (
    <nav className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">
          Rehacktor
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cerca un gioco..."
          className="input input-bordered"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="btn btn-primary ml-2">
          Cerca
        </button>
      </form>
    </nav>
  );
}

export default Navbar;