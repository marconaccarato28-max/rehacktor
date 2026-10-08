import { createElement } from "react";
import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`}>
      <div className="card h-full bg-base-100 shadow-xl transition hover:scale-[1.02]">
        <figure>
          {createElement("img", {
            src: game.background_image,
            alt: game.name,
            className: "h-60 w-full object-cover",
          })}
        </figure>

        <div className="card-body">
          <h2 className="card-title">{game.name}</h2>
          <p>Rating: {game.rating}</p>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;