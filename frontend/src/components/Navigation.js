import {Navbar} from 'react-bootstrap'
import logo from "../static/logo.svg"
import "../Navigation.css";



import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBSidebarFooter,
  } from 'cdbreact';

import {NavLink} from 'react-router-dom';


const Navigation = () => {

    return (

    <div>

    <Navbar id ='NavbarParent' bg="dark" variant="dark" expand="lg">
        
        <Navbar.Brand className="logo" href="/" >
            <img
              src={logo}
              width="75"
              height="75"
              className="d-inline-block align-center"
              alt="Rolex Price Tracker Logo"
            />
            Rolex Price Tracker
        </Navbar.Brand>
    </Navbar>

    </div>

    )
};


export default Navigation