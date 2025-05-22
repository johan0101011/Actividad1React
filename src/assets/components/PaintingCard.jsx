function PaintingCard({ id, title, image, author, year }) {
  return (
    <div className="painting-card">
      <h2>{id} - {title}</h2>
      <img className="pintura" src={image} alt={title} />
      <p><strong>Autor:</strong> {author}</p>
      <p><strong>Año:</strong> {year}</p>
    </div>
  );
}

export default PaintingCard;
