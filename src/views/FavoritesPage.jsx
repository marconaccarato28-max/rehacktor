import { createElement, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { supabase } from "../services/supabase.js";
import { useAuth } from "../context/AuthContext.jsx";

function FavoritesPage() {
  const { user, loading } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] =
    useState(true);

  useEffect(() => {
    async function getFavorites() {
      if (!user) {
        setLoadingFavorites(false);
        return;
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(error);
        setLoadingFavorites(false);
        return;
      }

      setFavorites(data || []);
      setLoadingFavorites(false);
    }

    getFavorites();
  }, [user]);

  if (loading || loadingFavorites) {
    return (
      <main className="min-h-screen bg-base-200 p-6">
        <p className="text-center text-xl">
          Caricamento...
        </p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <h1 className="mb-8 text-center text-4xl font-bold">
        I miei preferiti
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-xl">
          Non hai ancora aggiunto giochi ai preferiti.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite) => (
            <Link
              to={`/game/${favorite.game_id}`}
              key={favorite.id}
            >
              <div className="card h-full bg-base-100 shadow-xl transition hover:scale-[1.02]">
                <figure>
                  {createElement("img", {
                    src: favorite.game_image,
                    alt: favorite.game_name,
                    className:
                      "h-60 w-full object-cover",
                  })}
                </figure>

                <div className="card-body">
                  <h2 className="card-title">
                    {favorite.game_name}
                  </h2>

                  <p>
                    Clicca per vedere i dettagli
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default FavoritesPage;