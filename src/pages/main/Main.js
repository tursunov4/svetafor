import Layout from '../layout/Layout'
import { Outlet,Link } from 'react-router-dom'
import logo from "../../assets/jpg/logo.png"
import "./main.css"


const Main = () => {
  return (
    <div className='main-vrapper'>
        <div className='main-item'>
            <Link to="/" className='logo'>
                <img src={logo} alt='logo' />
                <h1>Davlat yo’l harakati <br /> xavfsizligi xizmati</h1>
            </Link>
           <Layout />
        </div>
        <div className='main-outlet'>
           <Outlet />
        </div>
    </div>
  )
}

export default Main