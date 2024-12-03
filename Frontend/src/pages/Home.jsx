import '../css/Home.css'
import Footer from '../components/footer/footer';
import AppBar from '../components/appbar/AppBarCdP';
import {Outlet} from "react-router-dom";

function Home() {

  return (
    <>
      <div id='div-home'>
          <div id="div-appbar">
                <AppBar/>
           </div> 
           <div id="detail">    
              <Outlet />
          </div>
      </div>
    </>
  )
}

export default Home