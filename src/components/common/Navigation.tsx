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
			<Row className='my-4 justify-content-end'>
				<StyledButton variant='info' onClick={() => handleNext()}>
					Begin →
				</StyledButton>
			</Row>
		)

	return (
		<Row className='my-4'>
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
						onClick={() => handleNext()}
						disabled={
							currentStep === 2
								? choices?.issues.length === 0
								: currentStep === 3
								? choices?.issues.length === 0
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
