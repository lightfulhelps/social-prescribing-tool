import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

export const StyledButton = styled(Button)`
	height: 48px;
	width: 170px;
	font-weight: bold;
	text-transform: uppercase;
`

export const Circle = styled.span<{ active: boolean }>`
	height: 25px;
	width: 25px;
	background-color: ${(props) => (props.active ? '#ffc200' : '#ffc300')};
	border-radius: 50%;
	display: inline-block;
`

export const Divider = styled.span`
	content: '';
	z-index: -1;
	left: 12px;
	height: inherit;
	border-left: 2px dotted #ffc200;
	position: relative;
	width: 50px;
`
