import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import Sidebar from './Sidebar';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>

      <NavMenu />

      <Sidebar
        variant={'sidebar'}
        isOpen={true}
        onClose={() => {}}
      />

        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
