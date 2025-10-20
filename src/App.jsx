import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // CARRITO FUNCIONES
  function addToCart(product) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }

  function removeOneFromCart(id) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeProduct(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  // RENDER
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <i className="fa-solid fa-store me-2"></i>Mi Tienda
          </Link>
          <div>
            <Link className="btn btn-outline-primary me-2" to="/">
              Home
            </Link>
            <Link className="btn btn-outline-secondary me-2" to="/about">
              About
            </Link>
            {isLoggedIn ? (
              <button
                className="btn btn-danger"
                onClick={() => setIsLoggedIn(false)}
              >
                Cerrar sesión
              </button>
            ) : null}
          </div>
        </div>
      </nav>

      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : error ? (
        <p className="text-center text-danger">Error al cargar productos.</p>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                cart={cart}
                addToCart={addToCart}
                removeOneFromCart={removeOneFromCart}
                removeProduct={removeProduct}
                clearCart={clearCart}
              />
            }
          />
          <Route
            path="/about"
            element={
              isLoggedIn ? (
                <About />
              ) : (
                <div className="container mt-4 text-center">
                  <h3>Acceso restringido 🚫</h3>
                  <p>Debes iniciar sesión para ver esta página.</p>
                  <button
                    className="btn btn-success"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Iniciar sesión
                  </button>
                </div>
              )
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail products={products} addToCart={addToCart} />}
          />
        </Routes>
      )}

      <footer className="text-center mt-4 py-3 border-top">
        <small className="text-muted">
          Proyecto React - Pre-Entrega Completa (Rutas, API, Carrito, Protección)
        </small>
      </footer>
    </Router>
  );
}
