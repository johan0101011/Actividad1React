import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (product) {
      setTitle(product.title || '');
      setPrice(product.price || '');
      setDescription(product.description || '');
      setImage(product.image || '');
    } else {
      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price) {
      alert('El título y el precio son obligatorios.');
      return;
    }
    onSave({
      id: product ? product.id : undefined,
      title,
      price: parseFloat(price),
      description,
      image,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h2>{product ? 'Editar Producto' : 'Crear Producto'}</h2>
      <div>
        <label>Título:</label><br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      <div>
        <label>Precio:</label><br />
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      <div>
        <label>Descripción:</label><br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      <div>
        <label>URL de Imagen:</label><br />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button type="submit" style={{ marginRight: '10px' }}>
          Guardar
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
