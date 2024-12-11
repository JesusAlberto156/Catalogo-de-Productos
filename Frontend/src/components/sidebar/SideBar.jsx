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

export default function Sidebar({ onSwitchView }) {
  
  const [isVisible, setIsVisible] = useState(() => {
    const storedState = localStorage.getItem("sidebarVisible");
    return storedState === "true";
  });

  const [profileImage, setProfileImage] = useState("https://i.pinimg.com/736x/48/17/0f/48170f2365dda8b63acc5d5d36c7a9ff.jpg");

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
          <li><a onClick={() => onSwitchView('Inicio')}>Inicio
              <span style={{ marginLeft: "145px" }}><FaHome/></span>
            </a>
          </li>
          <li><a onClick={() => onSwitchView('Productos')}>Productos
              <span style={{ marginLeft: "110px" }} className="icon-style-product"><MdProductionQuantityLimits/></span>
            </a>
          </li>
          <li><a onClick={() => onSwitchView('Inventario')}>Inventario
              <span style={{ marginLeft: "110px" }} className="icon-style-inventory"><MdOutlineInventory/></span>
            </a>
          </li>
          <li><a onClick={() => onSwitchView('Ventas')}>Ventas
              <span style={{ marginLeft: "130px" }}><FcSalesPerformance/></span>
            </a>
          </li>
          <li>
            <a onClick={() => onSwitchView('Cuenta')}>Cuenta
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