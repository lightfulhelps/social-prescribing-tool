import React from 'react'
import { Choices } from '../../../App'
import Challenges from './Challenges'
import ServiceRecs from './ServiceTips'
import OnlineResources from './OnlineResources'
import CaseStudies from './CaseStudies'
import PersonaDetails from './PersonaDetails'

export interface ResultsProps {}

export const getResults = ({
	data,
	type,
	choices,
}: {
	data: any
	type: string
	choices: Choices
}) => {
	console.log(data)
	return data
		.filter((item: any) => item.fields[type] && item.fields[type].length !== 0)
		.filter((item: any) =>
			choices.gender ? item.fields['Gender'].includes(choices.gender) : item
		)
		.filter((item: any) =>
			choices.age ? item.fields['Age Range'].includes(choices.age) : item
		)
	// .filter((item) => item['Issues'].includes(persona.issues))
}

const Results: React.FunctionComponent<ResultsProps> = () => {
	const genderData = {
		recnGP1GF49pCQvwJ: 'Female',
		reclmJZ5VtKCKZYhx: 'Male',
		reclb6Xvp5W2z73i0: 'Transgender',
		recRstark10tnr6wL: 'Intersex',
		reckjwoZ84qzhzkN9: 'Non-binary',
		rec6P9Xfy1Qg1NVGi: 'Any / All',
	}

	return (
		<>
			<PersonaDetails />
			<Challenges />
			<ServiceRecs />
			<OnlineResources />
			<CaseStudies />
		</>
	)
}

export default Results
