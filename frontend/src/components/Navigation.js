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


    {/* react's side bar */}
    {/* using cdbreact library for the side bar navigation */}
    <div className='sidebar'>
    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">

        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          Watch List
        </CDBSidebarHeader>

        <CDBSidebarContent>
            <CDBSidebarMenu>

                <NavLink exact to="datejust/126334" activeclassname="activeClicked"> 
                    <CDBSidebarMenuItem icon='minus' >Datejust Fluted 41</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/" activeclassname="activeClicked">
                    <CDBSidebarMenuItem icon="minus">Datejust Fluted 36</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/" activeclassname="activeClicked">
                    <CDBSidebarMenuItem icon="minus">Datejust Smooth 41</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/" activeclassname="activeClicked">
                    <CDBSidebarMenuItem icon="minus">Datejust Smooth 36</CDBSidebarMenuItem>
                </NavLink>

            </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{padding: '20px 5px'}}
          >
            Rolex Price Tracker
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>

    </div>

    </div>

    )


};


export default Navigation