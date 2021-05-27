import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchAll
} from '../reduxStuff/pushMessagesSlice';

import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export const Layout = (props) => { 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <div>
      <NavMenu />
      <Container>
        {props.children}
      </Container>
    </div>
  );
}
