import React, { useState } from 'react';

import NavBar from "../components/navbar/NavBar";
import Productos from '../components/card/Productos';
import Ventas from '../components/card/Ventas';

export default function Inicio({ productos,ventas }) {
    
    document.title = "CdP - Inicio";

    const [activeView, setActiveView] = useState('productos');
    const switchView = (view) => setActiveView(view);

    return (
        <>
            <NavBar onSwitchView={switchView}/>
            {activeView === 'productos' ? (
                <Productos/>
            ):(
                <Ventas/>
            )}
        </>
    );
}