import { useLoaderData } from "react-router-dom";
import { createElement } from "react";

function DetailPage() {
  const game = useLoaderData();

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
            <h1 className="text-4xl font-bold">{game.name}</h1>

            <p className="text-lg">
              Rating: {game.rating}
            </p>

            <p>
              Data di uscita: {game.released || "Non disponibile"}
            </p>

            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  game.description ||
                  "Descrizione non disponibile",
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailPage;