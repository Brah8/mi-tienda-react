import React from "react";
import { Link } from "react-router-dom";

export default function Home({
  products,
  cart,
  addToCart,
  removeOneFromCart,
  removeProduct,
  clearCart,
}) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h2 className="mb-4">Productos disponibles</h2>
      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={p.image}
                alt={p.title}
                className="card-img-top"
                style={{ objectFit: "contain", height: 200 }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Link
                    to={`/product/${p.id}`}
                    className="text-decoration-none text-dark"
                  >
                    {p.title}
                  </Link>
                </h5>
                <p className="card-text">Precio: ${p.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(p)}
                >
                  <i className="fa-solid fa-cart-plus me-2"></i>Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />
      <h3>Carrito</h3>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.title}</strong>
                  <br />
                  Cantidad: {item.quantity}
                  <br />
                  Precio unitario: ${item.price}
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-success me-1"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => removeOneFromCart(item.id)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeProduct(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h5>Total: ${total.toFixed(2)}</h5>
          <button className="btn btn-outline-danger mt-2" onClick={clearCart}>
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}

