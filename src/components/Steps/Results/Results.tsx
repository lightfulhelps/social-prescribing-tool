import React from 'react'
import { Choices } from '../../../App'
import Challenges from './Challenges'
import ServiceRecs from './ServiceTips'
import OnlineResources from './OnlineResources'
import CaseStudies from './CaseStudies'
import PersonaDetails from './PersonaDetails'

export interface ResultsProps {}

const ageData = {
	recAFiLBiZN7XAk3A: '18-25',
	recYvwpgjVMhhTOfC: '26-40',
	recobFtgdZzYjsqSf: '41-65',
	recY6kmB8cOasbuT4: '66-80',
	recIY3Lzaz1Kfs9XB: '81+',
}

const genderData = {
	recnGP1GF49pCQvwJ: 'Female',
	reclmJZ5VtKCKZYhx: 'Male',
	reclb6Xvp5W2z73i0: 'Transgender',
	recRstark10tnr6wL: 'Intersex',
	reckjwoZ84qzhzkN9: 'Non-binary',
	rec6P9Xfy1Qg1NVGi: 'Any / All',
}

const getKeyByValue = (obj: { [key: string]: string }, val: string) =>
	Object.keys(obj).find((key) => obj[key] === val)

export const getResults = ({
	data,
	type,
	choices,
}: {
	data: any
	type: string
	choices: Choices
}) => {
	if (!data) return
	const results = data
		.filter((item: any) => item.fields[type] && item.fields[type].length !== 0)
		.filter((item: any) =>
			choices.gender
				? item.fields['Gender'] !== undefined
					? item.fields['Gender'].indexOf(
							getKeyByValue(genderData, choices.gender)
					  )
					: item
				: item
		)
		.filter((item: any) =>
			choices.age
				? item.fields['Gender'] !== undefined
					? item.fields['Age Range'].indexOf(
							getKeyByValue(ageData, choices.age)
					  )
					: item
				: item
		)
	return results
}

const Results: React.FunctionComponent<ResultsProps> = () => {
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
