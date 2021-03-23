import React from 'react'
import { Button, Col } from 'react-bootstrap'
import { Circle, Divider } from '../Styles'

export interface ProgressProps {
	steps: string[]
	currentStep: number
}

const Progress: React.SFC<ProgressProps> = ({ steps, currentStep }) => {
	return (
		<Col sm={3} className='flex-column'>
			<ul className='pl-0'>
				{steps.map((step, i) => (
					<div key={i}>
						<li className='list-unstyled d-flex align-items-center'>
							<Circle active={currentStep === i + 1} />
							<Button
								variant='link'
								className={`text-left text-dark font-weight-bold ${
									currentStep === i + 1 ? '' : 'text-muted'
								}`}>
								{step.toUpperCase()}
							</Button>
						</li>
						{i !== 3 && <Divider active={currentStep === i + 1} />}
					</div>
				))}
			</ul>
		</Col>
	)
}

export default Progress
