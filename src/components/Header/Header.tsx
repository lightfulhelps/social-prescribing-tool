import React from 'react'
import { Col, Container, Row, Nav } from 'react-bootstrap'
import styled from 'styled-components'

const StyledNav = styled(Nav)`
	height: 113px;
`

export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
	return (
		<StyledNav
			className='bg-warning align-items-center'
			activeKey='/home'
			onSelect={(selectedKey: number) => alert(`selected ${selectedKey}`)}>
			<Container>
				<Row>
					<Col>
						<Nav.Item>
							<h1 className='h4'>
								Welcome to the Social Prescribing Support Tool
							</h1>
						</Nav.Item>
					</Col>
				</Row>
			</Container>
		</StyledNav>
	)
}

export default Header
