import { useLoaderData } from "react-router-dom";

function Homepage() {
  const games = useLoaderData();

  console.log(games);

  return <h1>Rehacktor</h1>;
}

export default Homepage;