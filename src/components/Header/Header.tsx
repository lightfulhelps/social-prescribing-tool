import React from 'react';
import { Col, Row, Nav } from 'react-bootstrap';
import styled from 'styled-components';

const StyledNav = styled(Nav)`
  height: 113px;
`;

export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <Row className="bg-warning align-items-center">
      <Col>
        <StyledNav
          activeKey="/home"
          onSelect={(selectedKey: number) => alert(`selected ${selectedKey}`)}
        >
          <Nav.Item>
            <h1 className="h4">Welcome to the Social Prescribing Support Tool</h1>
          </Nav.Item>
        </StyledNav>
      </Col>
    </Row>
  );
};

export default Header;
