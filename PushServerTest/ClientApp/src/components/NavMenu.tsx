import React from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import {
  Button
} from "@chakra-ui/react";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAll,
  selectStatus
} from '../reduxStuff/pushMessagesSlice';

export const NavMenu = () => {

  const location = useLocation();
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  return (
    <header>
      <Navbar className="navbar-expand-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand>{location.pathname}</NavbarBrand>
          <Button colorScheme="blue" onClick={() => dispatch(fetchAll())}>Refresh Data ({status})</Button>
        </Container>
      </Navbar>
    </header>
  );
}
