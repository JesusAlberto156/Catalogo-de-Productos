import Footer from './components/footer/Footer';
import Sidebar from './components/sidebar/SideBar';

export default function App({children}) {
  return(
    <div>
        <div id="app-container">
            <Sidebar/>
            <div id="content">
                <div id="main-content">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    </div>
  );
};