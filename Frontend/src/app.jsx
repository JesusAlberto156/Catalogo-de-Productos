import { RouterProvider } from "react-router-dom";
import  CdPRouter from "./navigation/NaviRoutesCdP";
import Footer from "./components/footer/footer";

export default function app() {
    return (
        <>
            <div id='div-app'>
                <RouterProvider router={CdPRouter}/>
                <div id='div-footer'>
                    <Footer />
                </div>
            </div>
        </>
    );
}