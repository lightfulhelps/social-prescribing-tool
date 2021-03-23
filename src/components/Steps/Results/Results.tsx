import {
	faArrowDown,
	faChevronDown,
	faExternalLinkAlt,
	faPlus,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
	Card,
	CardColumns,
	Col,
	Figure,
	Form,
	Row,
	Spinner,
} from 'react-bootstrap'
import base from '../../../api/base'
import { AppContext, Choices } from '../../../App'
import { CardLink, StyledButton } from '../../Styles'
import DropdownWrapper from '../../common/DropdownWrapper'
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
	return data
		.filter((item: any) => item.fields[type] && item.fields[type].length !== 0)
		.filter((item: any) =>
			choices?.gender ? item.fields['Gender'].includes(choices?.gender) : item
		)
		.filter((item: any) =>
			choices?.age ? item.fields['Age Range'].includes(choices?.age) : item
		)
	// .filter((item) => item['Issues'].includes(persona.issues))
}

const Results: React.FunctionComponent<ResultsProps> = () => {
	const { choices } = React.useContext(AppContext)
	// const choices = {
	// 	gender: 'Male',
	// 	age: '18-25',
	// }
	const [resultsArray, setResultsArray] = React.useState([])
	const [loading, setLoading] = React.useState(false)

	// React.useEffect(() => {
	// 	setLoading(true)
	// 	base('Gender')
	// 		.select({
	// 			// Selecting the first 3 records in Grid view:
	// 			maxRecords: 12,
	// 			view: 'Grid view',
	// 		})
	// 		.eachPage(
	// 			function page(records, fetchNextPage) {
	// 				// This function (`page`) will get called for each page of records.
	// 				records.forEach(function (record) {
	// 					console.log('Retrieved', record.get('Name'))
	// 				})

	// 				// To fetch the next page of records, call `fetchNextPage`.
	// 				// If there are more records, `page` will get called again.
	// 				// If there are no more records, `done` will get called.
	// 				fetchNextPage()
	// 			},
	// 			function done(err) {
	// 				if (err) {
	// 					console.error(err)
	// 					return
	// 				}
	// 			}
	// 		)
	// }, [])

	if (loading)
		return (
			<Spinner animation='border' role='status'>
				<span className='sr-only'>Loading...</span>
			</Spinner>
		)

	const data = {
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
