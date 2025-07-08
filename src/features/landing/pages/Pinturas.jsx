import React from 'react';
import PaintingCard from '../../../assets/components/PaintingCard';
import paintings from '../../../data/paintings';

function Pinturas() {
  return (
    <div className="app-content" style={{ color: 'white' }}>
      <h1 className="titulo-principal">ARTE A TRAVÉS DE LA HISTORIA</h1>
      <div className="gallery">
        {paintings.map((painting) => (
          <PaintingCard
            key={painting.id}
            id={painting.id}
            title={painting.title}
            image={painting.image}
            author={painting.author}
            year={painting.year}
          />
        ))}
      </div>
    </div>
  );
}

export default Pinturas;
