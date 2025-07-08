import React, { useState, useEffect } from 'react';

const PAGE_SIZE = 5;



const ProductList = ({ productos, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const filteredProducts = productos.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDelete = (id) => {
    onDelete(id);
    setShowMessage(true);
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      {showMessage && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
          Producto eliminado correctamente.
        </div>
      )}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Imagen</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Título</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Categoría</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map(product => (
            <tr key={product.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                ) : (
                  <div style={{ width: '50px', height: '50px', backgroundColor: '#ccc', borderRadius: '8px' }} />
                )}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.category || 'N/A'}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${product.price}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button className="btn-edit" onClick={() => onEdit(product)} style={{ marginRight: '5px' }}>Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          {paginatedProducts.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '8px' }}>No se encontraron productos.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ marginTop: '10px' }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
        <span style={{ margin: '0 10px' }}>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
      </div>
    </div>
  );
};

export default ProductList;
