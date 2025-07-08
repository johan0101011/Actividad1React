import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

function FormularioRegistro({ onBack }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'nombre':
      case 'apellidos':
        if (!value) {
          error = `El campo ${name} es obligatorio.`;
        } else if (value.length < 5) {
          error = 'Mínimo 5 caracteres.';
        } else if (value.length > 30) {
          error = 'Máximo 30 caracteres.';
        }
        break;
      case 'telefono':
        if (!value) {
          error = 'El teléfono es obligatorio.';
        } else if (!/^[0-9]+$/.test(value)) {
          error = 'Solo se permiten números.';
        } else if (value.length < 7 || value.length > 10) {
          error = 'Debe tener entre 7 y 10 dígitos.';
        }
        break;
      case 'email':
        if (!value) {
          error = 'El email es obligatorio.';
        }
        // SOLUCIÓN: Cambiado \\s a \s
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Formato de email inválido.';
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  useEffect(() => {
    // Verificar si todos los campos tienen un valor (no están vacíos)
    const allFieldsFilled = Object.values(formData).every((v) => v.trim() !== '');
    // Verificar si no hay ningún mensaje de error
    const noValidationErrors = Object.values(errors).every((e) => e === '');

    // El formulario es válido si todos los campos están llenos Y no hay errores de validación
    setIsFormValid(allFieldsFilled && noValidationErrors);
  }, [formData, errors]); // Se ejecuta cuando formData o errors cambian

  const handleSubmit = (e) => {
    e.preventDefault();

    // Re-validar todos los campos al enviar para asegurar que no se envíen con errores residuales
    const isValidOnSubmit = Object.entries(formData).every(([key, value]) =>
      validateField(key, value) // Esto también actualizará los estados de error
    );

    if (isValidOnSubmit) { // Usa isValidOnSubmit aquí, ya que es el resultado de la validación final
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tus datos han sido guardados correctamente.',
        confirmButtonText: 'Aceptar',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      }).then(() => {
        if (onBack) {
          onBack();
        } else {
          navigate('/login');
        }
      });

      // Limpiar formulario y errores después del éxito
      setFormData({
        nombre: '',
        apellidos: '',
        telefono: '',
        email: '',
      });
      setErrors({
        nombre: '',
        apellidos: '',
        telefono: '',
        email: '',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Corrige los errores antes de enviar.',
      });
    }
  };

  return (
    <div className="formulario-container" style={{backgroundColor: '#222', padding: '20px', borderRadius: '10px', maxWidth: '350px', margin: '40px auto', color: '#eee' }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="formulario">
        {['nombre', 'apellidos', 'telefono', 'email'].map((field) => (
          <div key={field} className="form-group" style={{marginBottom: '15px'}}>
            <label htmlFor={field} style={{display: 'block', marginBottom: '6px'}}>
              {field.charAt(0).toUpperCase() + field.slice(1)} *
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              className={errors[field] ? 'input-error' : ''}
              style={{width: '100%', padding: '8px', borderRadius: '5px', border: errors[field] ? '1px solid #ff4d4f' : '1px solid #ccc'}}
            />
            {errors[field] && (
              <p className="error-message" style={{color: '#ff4d4f', marginTop: '4px'}}>{errors[field]}</p>
            )}
          </div>
        ))}
        <button type="submit" disabled={!isFormValid} className="btn-guardar" style={{backgroundColor: '#444', color: '#eee', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
          Guardar
        </button>
      </form>
      {onBack && (
        <button onClick={onBack} style={{marginTop: '20px', backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer'}}>
          Iniciar Sesión
        </button>
      )}
    </div>
  );
}

export default FormularioRegistro;
