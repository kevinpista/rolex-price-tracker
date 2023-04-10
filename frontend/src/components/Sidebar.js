import "../css/Sidebar.css";

import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBSidebarFooter,
  } from 'cdbreact';

import {NavLink} from 'react-router-dom';


const Sidebar = ({ watches, handleSelectWatch, selectedWatch }) => {

    return (
    <div className='sidebar'>
    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">

        <CDBSidebarHeader prefix={<i className="fa fa-bars" />} className='header'>
          Watch List
        </CDBSidebarHeader>

        <CDBSidebarContent>
            <CDBSidebarMenu>

                <NavLink 
                    onClick={() => handleSelectWatch(watches.watch126334)} 
                    className={selectedWatch === watches.watch126334 ? 'activeSelection' : ''}
                > 
                    <CDBSidebarMenuItem icon='minus' >Datejust Fluted 41</CDBSidebarMenuItem>
                </NavLink>

                <NavLink 
                    onClick={() => handleSelectWatch(watches.watch126300)}
                    className={selectedWatch === watches.watch126300 ? 'activeSelection' : ''}
                >
                    <CDBSidebarMenuItem icon='minus'>Datejust Smooth 41</CDBSidebarMenuItem>
                </NavLink>

                <NavLink 
                onClick={() => handleSelectWatch(watches.watch126234)} 
                className={selectedWatch === watches.watch126234 ? 'activeSelection' : ''}
                >
                    <CDBSidebarMenuItem icon='minus'>Datejust Fluted 36</CDBSidebarMenuItem>
                </NavLink>

                <NavLink 
                    onClick={() => handleSelectWatch(watches.watch126200)}
                    className={selectedWatch === watches.watch126200 ? 'activeSelection' : ''}
                >
                    <CDBSidebarMenuItem icon='minus'>Datejust Smooth 36</CDBSidebarMenuItem>
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
    )
};


export default Sidebar