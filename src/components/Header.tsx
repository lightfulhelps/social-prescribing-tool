import React from 'react';
import { Col, Row, Nav } from 'react-bootstrap';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Row className="bg-warning align-items-center">
      <Col>
        <Nav activeKey="/home">
          <Nav.Item>
            <h1 className="h4">Welcome to the Social Prescribing Support Tool</h1>
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  );
};

export default Header;
