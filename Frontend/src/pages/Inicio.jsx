import App from "../app";
import React, { useState } from 'react';
import NavBar from "../components/navbar/NavBar";
import Productos from '../components/card/Productos';
import Ventas from '../components/card/Ventas';
export default function Inicio() {
    
    const [activeView, setActiveView] = useState('productos');
    const switchView = (view) => setActiveView(view);

    return (
        <App>
            <NavBar onSwitchView={switchView}/>
            {activeView === 'productos' ? (
                <Productos/>
            ):(
                <Ventas/>
            )}
        </App>
    );
}