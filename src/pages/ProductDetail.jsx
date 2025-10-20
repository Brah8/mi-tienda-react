import React from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container text-center">
        <h2>Producto no encontrado</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{product.title}</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ objectFit: "contain", height: 300 }}
          />
        </div>
        <div className="col-md-6">
          <p>{product.description}</p>
          <h4>Precio: ${product.price}</h4>
          <button
            className="btn btn-success"
            onClick={() => addToCart(product)}
          >
            <i className="fa-solid fa-cart-plus me-2"></i>Agregar al carrito
          </button>
          <Link to="/" className="btn btn-link d-block mt-3">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
