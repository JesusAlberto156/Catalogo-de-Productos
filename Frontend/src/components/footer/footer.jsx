// src/components/Footer.jsx
import React from "react";
import "./footer.css"; // Si necesitas estilos personalizados

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Catalogo de productos. Todos los derechos reservados.</p>
      <div className="footer-links">
        <a href="/about">Acerca de</a>
        <a href="/contact">Contacto</a>
        <a href="/privacy">Privacidad</a>
      </div>
    </footer>
  );
};

export default Footer;
