import { useState } from 'react';
import Swal from 'sweetalert2';

const Products = ({ producto }) => {
  const [count, setCount] = useState(0);
  const [statusBtn, setStatusBtn] = useState(false);

  const aumentar = () => {
    if (count < 10) setCount(count + 1);
  };

  const disminuir = () => {
    if (count > 0) setCount(count - 1);
  };

  const agregarAlCarrito = () => {
    if (count > 0) {
      setStatusBtn(true);
      Swal.fire('Producto agregado', `${count} unidad(es) de "${producto.title}"`, 'success');
      setCount(0);
      setStatusBtn(false);
    } else {
      Swal.fire('Oops', 'Debes seleccionar al menos una unidad.', 'error');
    }
  };

  return (
    <div className="painting-card">
      <h2>{producto.title}</h2>
      <img className="pintura" src={producto.image} alt={producto.title} />
      <p><strong>Precio:</strong> ${producto.price}</p>
      <p>{producto.description.slice(0, 80)}...</p>

      <div className="contador">
        <p><strong>Cantidad:</strong> {count}</p>
        <button onClick={disminuir} disabled={count <= 0}>–</button>
        <button onClick={aumentar} disabled={count >= 10}>+</button>
        <button onClick={agregarAlCarrito} disabled={statusBtn}>Agregar</button>
      </div>
    </div>
  );
};

export default Products;
