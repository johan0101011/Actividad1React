import { useState } from 'react';

function PaintingCard({ id, title, image, author, year }) {
  const [count, setCount] = useState(0);

  const aumentar = () => setCount(count + 1);
  const disminuir = () => setCount(count - 1);
  const resetear = () => setCount(0);

  return (
    <div className="painting-card">
      <h2>{id} - {title}</h2>
      <img className="pintura" src={image} alt={title} />
      <p><strong>Autor:</strong> {author}</p>
      <p><strong>Fecha:</strong> {year}</p>

      <div className="contador">
        <p><strong>Likes:</strong> {count}</p>
        <button onClick={aumentar}>❤️</button>
        <button onClick={disminuir}>❌</button>
        <button onClick={resetear}>↻</button>
      </div>
    </div>
  );
}

export default PaintingCard;
