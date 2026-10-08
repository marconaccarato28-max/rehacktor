import { useLoaderData, useParams } from "react-router-dom";
import GameCard from "../components/GameCard.jsx";

function GenrePage() {
  const games = useLoaderData();
  const { genre } = useParams();

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Genere: {genre}
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}

export default GenrePage;