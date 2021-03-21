import React from 'react'
import { Col, Container, Button, Row } from 'react-bootstrap'
import Navigation from './components/common/Navigation'
import Header from './components/Header'
import Hero from './components/Hero'
import Demographics from './components/Steps/Demographics'
import Intro from './components/Steps/Intro'
import Issues from './components/Steps/Issues'
import Results from './components/Steps/Results'
import { Circle, Divider } from './components/Styles'

const steps = ['Introduction', 'Issues', 'Demographics', 'Results']

// Test persona
const persona = {
	gender: 'Female',
	age: '26-40',
	issues: ['Low motivation/purpose'],
}

export type Choices = {
	issues: string[]
	demographics: string[]
	gender: string
	age: string
}

type ContextProps = {
	choices: Choices
	setChoices: (values: Choices) => void
}

export const AppContext = React.createContext<Partial<ContextProps>>({})

const App: React.FunctionComponent = () => {
	const [currentStep, setCurrentStep] = React.useState<number>(1)
	const [choices, setChoices] = React.useState<Choices>({
		issues: ['test'],
		demographics: [],
		gender: '',
		age: '',
	})

	const handleNext = () => {
		if (currentStep === 4) return
		setCurrentStep(currentStep + 1)
	}

	const handleBack = () => {
		if (currentStep === 0) return
		setCurrentStep(currentStep - 1)
	}

	const handleReset = () => {
		setCurrentStep(1)
	}

	return (
		<AppContext.Provider
			value={{
				choices,
				setChoices,
			}}>
			<Header />
			<Hero currentStep={currentStep} />
			<Container className='my-4'>
				<Navigation
					currentStep={currentStep}
					handleNext={handleNext}
					handleBack={handleBack}
					handleReset={handleReset}
				/>
				{currentStep !== 4 && (
					<Row>
						<Col sm={3} className='flex-column'>
							<ul className='pl-0'>
								{steps.map((step, i) => (
									<div key={i}>
										<li className='list-unstyled'>
											<Circle active={currentStep === i + 1} />
											<Button
												variant='link'
												className={`text-left ${
													currentStep === i + 1
														? 'font-weight-bold'
														: 'text-muted'
												}`}>
												{step.toUpperCase()}
											</Button>
										</li>
										<Divider />
									</div>
								))}
							</ul>
						</Col>
						<Col>
							{currentStep === 1 && <Intro />}
							{currentStep === 2 && <Issues />}
							{currentStep === 3 && <Demographics />}
						</Col>
					</Row>
				)}
				{currentStep === 4 && <Results />}
			</Container>
		</AppContext.Provider>
	)
}

export default App
