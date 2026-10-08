import { useNavigate } from "react-router-dom";

function GenreSelect({ genres }) {
  const navigate = useNavigate();

  function handleChange(event) {
    const genre = event.target.value;

    if (!genre) {
      return;
    }

    navigate(`/genre/${genre}`);
  }

  return (
    <select
      className="select select-bordered"
      defaultValue=""
      onChange={handleChange}
    >
      <option value="" disabled>
        Seleziona genere
      </option>

      {genres.map((genre) => (
        <option key={genre.id} value={genre.slug}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}

export default GenreSelect;
``