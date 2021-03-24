import React from 'react'
import { Choices } from '../../../App'
import Challenges from './Challenges'
import ServiceRecs from './ServiceTips'
import OnlineResources from './OnlineResources'
import CaseStudies from './CaseStudies'
import PersonaDetails from './PersonaDetails'

export interface ResultsProps {}

const genderData = {
	recnGP1GF49pCQvwJ: 'Female',
	reclmJZ5VtKCKZYhx: 'Male',
	reclb6Xvp5W2z73i0: 'Transgender',
	recRstark10tnr6wL: 'Intersex',
	reckjwoZ84qzhzkN9: 'Non-binary',
	rec6P9Xfy1Qg1NVGi: 'Any / All',
}

const ageData = {
	recAFiLBiZN7XAk3A: '18-25',
	recYvwpgjVMhhTOfC: '26-40',
	recobFtgdZzYjsqSf: '41-65',
	recY6kmB8cOasbuT4: '66-80',
	recIY3Lzaz1Kfs9XB: '81+',
}

const issueData = {
	recRhYzlcW1bjJOj5: 'Low motivation / purpose',
	reclnD05bTSvL0DRL: 'Domestic abuse',
	recC05E3vlAt1MT7m: 'Isolation and loneliness',
	rec4ZLhGz9LCpOPBw: 'Emotional trauma',
	rec5wULU383kD4xBX: 'General mental health',
	rec9ExhjFYmUaH6Wq: 'Challenges with family',
	recXcfDe462eIoSi1: 'Housing',
	recU3ouTyDzDouQrX: 'Unemployed or underemployed',
	recBNKR3jVWFoCHXz: 'Money issues',
	recHlqgykQZokmCJS: 'Legal issues',
	recjenK8BgEm48liI: 'Difficulty in applying for benefits',
	recaQ65Q4PfWtVpbN: 'Transportation / mobility',
	rec4Gk0Ql3ch1Fv9O: 'Immigration',
	rec7klIkHJFUhHuo0: 'English language skills',
	rec4W1FqDcn00dSBH: 'Computer skills',
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

	const filterByAge = (data: any) =>
		data.filter((item: any) => {
			if (!choices.age) return item
			if (item.fields[type] === undefined || item.fields[type].length === 0) {
				return null
			}
			if (
				item.fields['Age Range'].includes('rec6P9Xfy1Qg1NVGi') ||
				item.fields['Age Range'].includes(getKeyByValue(ageData, choices.age))
			) {
				return item
			}
			return null
		})

	const filterByGender = (data: any) =>
		data.filter((item: any) => {
			if (!choices.gender) return item
			if (item.fields[type] === undefined || item.fields[type].length === 0) {
				return null
			}
			if (
				item.fields['Gender'].includes('rec6P9Xfy1Qg1NVGi') ||
				item.fields['Gender'].includes(
					getKeyByValue(genderData, choices.gender)
				)
			) {
				return item
			}
			return null
		})

	let results = data
		.filter((item: any) => {
			if (item.fields[type] === undefined) {
				return null
			}
			if (
				item.fields['Age Range'].includes('rec6P9Xfy1Qg1NVGi') ||
				item.fields['Age Range'].includes(getKeyByValue(ageData, choices.age))
			) {
				return item
			}
			return null
		})
		.filter((item: any) => {
			if (!choices.gender) return item
			if (
				item.fields['Gender'].includes('rec6P9Xfy1Qg1NVGi') ||
				item.fields['Gender'].includes(
					getKeyByValue(genderData, choices.gender)
				)
			) {
				return item
			}
			return null
		})
		.filter((item: any) => {
			if (
				choices.issues.some((each) =>
					item.fields['Issues'].includes(getKeyByValue(issueData, each))
				)
			) {
				return item
			}
			return null
		})

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
