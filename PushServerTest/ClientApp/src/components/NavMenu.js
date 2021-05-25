import React from 'react';
import { Container, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu = () => {

  const location = useLocation();

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand>{location.pathname}</NavbarBrand>

          {/* <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/api-clients">API-Clients</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/user-data">User-Data</NavLink>
            </NavItem>
          </ul> */}

        </Container>
      </Navbar>
    </header>
  );
}
