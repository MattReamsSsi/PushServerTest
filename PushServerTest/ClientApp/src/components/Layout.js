import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import Sidebar from './Sidebar';

export const Layout = (props) => { 
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
