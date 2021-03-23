import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { StyledButton } from '../Styles'
import { AppContext } from '../../App'

export interface NavigationProps {
	currentStep: number
	handleNext: Function
	handleBack: Function
	handleReset: Function
}

const Navigation: React.SFC<NavigationProps> = ({
	currentStep,
	handleNext,
	handleBack,
	handleReset,
}) => {
	const { choices } = React.useContext(AppContext)
	if (currentStep === 1)
		return (
			<Row className='fixed-bottom bg-white justify-content-end'>
				<StyledButton variant='info' onClick={() => handleNext()}>
					Begin →
				</StyledButton>
			</Row>
		)

	if (!choices) return <p>Error, no choices found.</p>

	return (
		<Row className='mt-5 fixed-bottom bg-white'>
			<Col
				className={`${
					currentStep === 4
						? 'justify-content-start'
						: 'justify-content-between'
				}`}>
				<StyledButton
					variant='white'
					className='text-info border-info'
					onClick={() => handleBack()}>
					<FontAwesomeIcon icon={faArrowLeft} /> Back
				</StyledButton>
				{currentStep === 4 && (
					<>
						<StyledButton
							variant='white'
							className='text-info border-info ml-4'
							onClick={() => handleReset()}>
							Start Over
						</StyledButton>
					</>
				)}
				{currentStep !== 4 && (
					<StyledButton
						variant='info'
						className='ml-4'
						onClick={() => handleNext()}
						disabled={
							currentStep === 2
								? choices.issues.length === 0 || choices.issues.length > 3
								: false
						}>
						Next <FontAwesomeIcon icon={faArrowRight} />
					</StyledButton>
				)}
			</Col>
		</Row>
	)
}

export default Navigation
