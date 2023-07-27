import {Navbar} from 'react-bootstrap'
import logo from "../static/logo2.svg"
import "../css/Header.css";


const Header = () => {
    return (
    <div>
    <Navbar id ='NavbarParent' bg="dark" variant="dark" expand="lg">
        <Navbar.Brand className="logo" href="/" >
            <img
              src={logo2}
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

export default Header