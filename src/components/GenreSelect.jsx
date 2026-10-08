function GenreSelect({ genres }) {
  return (
    <select className="select select-bordered">
      <option>Seleziona genere</option>

      {genres.map((genre) => (
        <option key={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}

export default GenreSelect;