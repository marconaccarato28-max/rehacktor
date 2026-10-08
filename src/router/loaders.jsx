export async function getGames() {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Errore nel caricamento dei giochi");
  }

  const data = await response.json();

  return data.results;
}

export async function getSearchedGames({ params }) {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&search=${params.query}`
  );

  if (!response.ok) {
    throw new Error("Errore durante la ricerca dei giochi");
  }

  const data = await response.json();

  return data.results;
}

export async function getGameDetail({ params }) {
  const response = await fetch(
    `https://api.rawg.io/api/games/${params.id}?key=${import.meta.env.VITE_RAWG_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Errore nel caricamento del gioco");
  }

  return response.json();
}
