import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchAll
} from '../reduxStuff/pushMessagesSlice';

import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import Sidebar from './Sidebar';

export const Layout = (props) => { 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <div>

    <NavMenu />

    <Sidebar
      variant={'sidebar'}
      isOpen={true}
      onClose={() => {}}
    />

      <Container>
        {props.children}
      </Container>
    </div>
  );
}
