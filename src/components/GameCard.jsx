import { createElement } from "react";

function GameCard({ game }) {

return (

<div className="card bg-base-100 shadow-xl">

<figure>

{createElement("img", {

src: game.background_image,

alt: game.name,

className: "w-full h-48 object-cover",

})}

</figure>

<div className="card-body">

<h2 className="card-title">{game.name}</h2>

<p>Rating: {game.rating}</p>

</div>

</div>

);

}

export default GameCard;