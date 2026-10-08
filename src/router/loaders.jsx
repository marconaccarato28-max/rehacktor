export async function getGames() {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}`
  );

  const data = await response.json();

  return data.results;
}