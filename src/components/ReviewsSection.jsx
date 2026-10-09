import { useEffect, useState } from "react";

import { supabase } from "../services/supabase.js";
import { useAuth } from "../context/AuthContext.jsx";

function ReviewsSection({ gameId }) {
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("5");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function getReviews() {
    setLoading(true);

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("game_id", gameId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setReviews(data || []);
    setLoading(false);
  }

  useEffect(() => {
    getReviews();
  }, [gameId]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user) {
      alert("Devi effettuare il login");
      return;
    }

    if (!content.trim()) {
      alert("Scrivi una recensione");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase
      .from("reviews")
      .insert({
        user_id: user.id,
        game_id: gameId,
        username:
          user.user_metadata?.username ||
          user.email,
        content: content.trim(),
        rating: Number(rating),
      });

    if (error) {
      alert(error.message);
      setSubmitting(false);
      return;
    }

    setContent("");
    setRating("5");

    await getReviews();

    setSubmitting(false);
    alert("Recensione pubblicata");
  }

  async function handleDelete(reviewId) {
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId);

    if (error) {
      alert(error.message);
      return;
    }

    await getReviews();
    alert("Recensione eliminata");
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-3xl font-bold">
        Recensioni
      </h2>

      {user ? (
        <form
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-4 rounded-box bg-base-200 p-5"
        >
          <textarea
            className="textarea textarea-bordered min-h-28"
            placeholder="Scrivi la tua recensione..."
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
          />

          <select
            className="select select-bordered w-fit"
            value={rating}
            onChange={(event) =>
              setRating(event.target.value)
            }
          >
            <option value="5">5 stelle</option>
            <option value="4">4 stelle</option>
            <option value="3">3 stelle</option>
            <option value="2">2 stelle</option>
            <option value="1">1 stella</option>
          </select>

          <button
            type="submit"
            className="btn btn-primary w-fit"
            disabled={submitting}
          >
            {submitting
              ? "Pubblicazione..."
              : "Pubblica recensione"}
          </button>
        </form>
      ) : (
        <p className="mb-6">
          Effettua il login per lasciare una recensione.
        </p>
      )}

      {loading ? (
        <p>Caricamento recensioni...</p>
      ) : reviews.length === 0 ? (
        <p>Non ci sono ancora recensioni.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-box bg-base-200 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold">
                    {review.username}
                  </h3>

                  <p>
                    Valutazione: {review.rating}/5
                  </p>
                </div>

                {user?.id === review.user_id && (
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() =>
                      handleDelete(review.id)
                    }
                  >
                    Elimina
                  </button>
                )}
              </div>

              <p className="mt-3">
                {review.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ReviewsSection;