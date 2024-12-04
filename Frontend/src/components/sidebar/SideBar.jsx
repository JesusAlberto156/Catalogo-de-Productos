import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { MdAccountCircle } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";

import './Sidebar.css';

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(() => {
    const storedState = localStorage.getItem("sidebarVisible");
    return storedState === "true";
  });
  const [loadingHome, setLoadingHome] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingInventory, setLoadingInventory] = useState(false);
  const [loadingSales, setLoadingSales] = useState(false);
  const [profileImage, setProfileImage] = useState("https://cdn-icons-png.flaticon.com/256/9505/9505872.png");
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profile-input").click();
  };

  const toggleSidebar = () => {
    const newState = !isVisible;
    setIsVisible(newState);
    localStorage.setItem("sidebarVisible", newState);
    document
        .getElementById('content')
        .className = isVisible ? 'no-sidebar' : 'with-sidebar';
  };

  useEffect(() => {
    const content = document.getElementById("content");
    if (content) {
      content.className = isVisible ? "with-sidebar" : "no-sidebar";
    }
  }, [isVisible]);
  
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const Home = async () => {
    setLoadingHome(true);
    document.title = "Cargando...";
    await delay(1000);
    navigate("/Inicio",{replace: true});
    document.title = "CdP - Inicio";
    setLoadingHome(false);
  };

  const Products = async () => {
    setLoadingProducts(true);
    document.title = "Cargando...";
    await delay(1000);
    navigate("/Productos",{replace: true});
    document.title = "CdP - Productos";
    setLoadingProducts(false);
  };

  const Inventory = async () => {
    setLoadingInventory(true);
    document.title = "Cargando...";
    await delay(1000);
    navigate("/Inventario",{replace: true});
    document.title = "CdP - Inventario";
    setLoadingInventory(false);
  };

  const Sales = async () => {
    setLoadingSales(true);
    document.title = "Cargando...";
    await delay(1000);
    navigate("/Ventas",{replace: true});
    document.title = "CdP - Ventas";
    setLoadingSales(false);
  };

  return (
    <>
      <button className="toggle-button" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="profile-container">
          <img 
            src={profileImage} 
            alt="Perfil" 
            className="profile-icon"
            onClick={triggerFileInput}
          />
          <input
            id="profile-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>
        <ul>
          <li><a onClick={Home}>Inicio
              <span style={{ marginLeft: "145px" }}><FaHome/></span>
            </a>
          </li>
          <li><a onClick={Products}>Productos
              <span style={{ marginLeft: "110px" }} className="icon-style-product"><MdProductionQuantityLimits/></span>
            </a>
          </li>
          <li><a onClick={Inventory}>Inventario
              <span style={{ marginLeft: "110px" }} className="icon-style-inventory"><MdOutlineInventory/></span>
            </a>
          </li>
          <li><a onClick={Sales}>Ventas
              <span style={{ marginLeft: "130px" }}><FcSalesPerformance/></span>
            </a>
          </li>
          <li>
            <a>Cuenta
              <span style={{ marginLeft: "130px" }} className="icon-style-account"><MdAccountCircle/></span>
            </a>
          </li>
          <li>
            <a>Salir
              <span style={{ marginLeft: "150px" }} className="icon-style-out"><FaSignOutAlt/></span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}