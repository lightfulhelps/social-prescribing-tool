import React, { ReactNode } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { HeroContainer } from './Hero.styles'

export interface HeroProps {
	currentStep: number
}

const textOptions: { [key: number]: ReactNode } = {
	1: (
		<div>
			<p className='font-weight-bold'>
				Are you a link worker or service provider?
			</p>
			<p className='font-weight-bold'>
				Or are you someone who is looking for community support, but you aren’t
				sure where to start?
			</p>
		</div>
	),
	2: (
		<>
			<Col>
				<p className='font-weight-bold'>
					Are you a link worker or service provider?
				</p>
			</Col>
			<Col>
				<p>
					Our social prescribing support tool may be useful in helping you to
					understand the needs, goals, and service suggestions of people in
					need. It also provides resources and case studies that may be of use
					to you.
				</p>
				<p>
					Just enter the characteristics of the person you are trying to help
					below.
				</p>
			</Col>
		</>
	),
	3: (
		<>
			<Col>
				<p className='font-weight-bold'>
					Are you a link worker or service provider?
				</p>
			</Col>
			<Col>
				<p>
					Our social prescribing support tool may be useful in helping you to
					understand the needs, goals, and service suggestions of people in
					need. It also provides resources and case studies that may be of use
					to you.
				</p>
				<p>
					Just enter the characteristics of the person you are trying to help
					below.
				</p>
			</Col>
		</>
	),
	4: (
		<>
			<Col>
				<p className='font-weight-bold'>
					Below is a representation of someone who may be similar to the person
					in need.
				</p>
			</Col>
			<Col>
				<p>
					Use this profile information to help you explore what challenges
					someone may have, as well as what services may be useful for them.
					Relevant online resources and case studies of people with similar
					profiles are also included.
				</p>
			</Col>
		</>
	),
}

const Hero: React.FunctionComponent<HeroProps> = ({ currentStep }) => {
	return (
		<Row>
			<HeroContainer>
				<Container>
					<Row>
						<Col>{textOptions[currentStep]}</Col>
					</Row>
				</Container>
			</HeroContainer>
		</Row>
	)
}

export default Hero
