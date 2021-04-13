import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
  height: 48px;
  width: ${(props) => (props.width ? `${props.width}px` : '170px')};
  font-weight: bold;
  text-transform: uppercase;
`;

export const Circle = styled.span<{
  active?: boolean;
  card?: boolean;
  children?: React.ReactNode;
}>`
  height: ${(props) => (props.card ? '60px' : '25px')};
  width: ${(props) => (props.card ? '60px' : '25px')};
  background-color: ${(props) => (props.active ? '#ffc200' : '#8E2082')};
  opacity: ${(props) => (props.active ? '1' : '0.5')};
  border-radius: 50%;
  display: inline-block;
`;

export const Divider = styled.span<{ active: boolean }>`
  content: '';
  z-index: -1;
  left: 12px;
  height: inherit;
  border-left: 4px dotted ${(props) => (props.active ? '#ffc200' : '#8E2082')};
  opacity: ${(props) => (props.active ? '1' : '0.5')};
  position: relative;
  width: 50px;
`;
export const CardLink = styled(Card.Link)`
  position: absolute;
  bottom: 20px;
`;
