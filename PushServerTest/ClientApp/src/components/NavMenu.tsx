import React from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Tooltip
} from "@chakra-ui/react";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAll,
  selectStatus
} from '../reduxStuff/pushMessagesSlice';

import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavMenu = () => {

  const location = useLocation();
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  return (
    <header>
      <Navbar className="navbar-expand-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand>{location.pathname}</NavbarBrand>
          <Tooltip label="re-fetch data">
            <Button colorScheme="blue" onClick={() => dispatch(fetchAll())} leftIcon={<FontAwesomeIcon icon={faSync}/>}>({status})</Button>                                  
          </Tooltip>
        </Container>
      </Navbar>
    </header>
  );
}
