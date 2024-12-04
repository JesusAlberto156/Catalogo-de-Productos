// src/components/Footer.jsx
import React from "react";
import "./footer.css"; // Si necesitas estilos personalizados

export default function Footer(){
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Catalogo de productos. Todos los derechos reservados.</p>
      <div className="footer-links">
        <a href="/Productos">Acerca de</a>
        <a href="/Inventarios">Contacto</a>
        <a href="/Ventas">Privacidad</a>
      </div>
    </footer>
  );
}
