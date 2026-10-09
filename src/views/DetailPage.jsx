import { createElement, useEffect, useState } from "react";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";

import { supabase } from "../services/supabase.js";
import { useAuth } from "../context/AuthContext.jsx";
import ReviewsSection from "../components/ReviewsSection.jsx";

function DetailPage() {
  const game = useLoaderData();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] =
    useState(false);

  useEffect(() => {
    async function checkFavorite() {
      if (!user) {
        setIsFavorite(false);
        return;
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("game_id", game.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        return;
      }

      setIsFavorite(Boolean(data));
    }

    checkFavorite();
  }, [user, game.id]);

  async function handleFavorite() {
    if (!user) {
      alert("Devi effettuare il login");
      navigate("/login");
      return;
    }

    setLoadingFavorite(true);

    if (isFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("game_id", game.id);

      if (error) {
        alert(error.message);
        setLoadingFavorite(false);
        return;
      }

      setIsFavorite(false);
      alert("Gioco rimosso dai preferiti");
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert({
          user_id: user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        });

      if (error) {
        alert(error.message);
        setLoadingFavorite(false);
        return;
      }

      setIsFavorite(true);
      alert("Gioco aggiunto ai preferiti");
    }

    setLoadingFavorite(false);
  }

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="card bg-base-100 shadow-xl">
          <figure>
            {createElement("img", {
              src: game.background_image,
              alt: game.name,
              className: "h-96 w-full object-cover",
            })}
          </figure>

          <div className="card-body">
            <h1 className="text-4xl font-bold">
              {game.name}
            </h1>

            <p className="text-lg">
              Rating: {game.rating}
            </p>

            <p>
              Data di uscita:{" "}
              {game.released || "Non disponibile"}
            </p>

            <button
              type="button"
              className={
                isFavorite
                  ? "btn btn-error w-fit"
                  : "btn btn-primary w-fit"
              }
              onClick={handleFavorite}
              disabled={loadingFavorite}
            >
              {loadingFavorite
                ? "Caricamento..."
                : isFavorite
                  ? "Rimuovi dai preferiti"
                  : "Aggiungi ai preferiti"}
            </button>

            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  game.description ||
                  "Descrizione non disponibile",
              }}
            />

            <ReviewsSection gameId={game.id} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailPage;