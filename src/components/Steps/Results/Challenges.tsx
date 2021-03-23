import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StyledButton } from '../../Styles'
import ListWrapper from './ListWrapper'
import { getResults } from './Results'
import { AppContext } from '../../../App'
import base from '../../../api/base'

export interface ChallengesProps {}

const Challenges: React.FunctionComponent<ChallengesProps> = () => {
	const { choices } = React.useContext(AppContext)

	const [challengesArray, setChallengesArray] = React.useState<any>([])
	const [loading, setLoading] = React.useState(false)
	const [showMore, setShowMore] = React.useState(false)

	React.useEffect(() => {
		base('Challenges and Obstacles')
			.select({ view: 'Grid view' })
			.eachPage((records, fetchNextPage) => {
				setChallengesArray(records)
				fetchNextPage()
				setLoading(false)
			})
	}, [])

	const handleMore = () => setShowMore(!showMore)

	if (!choices) return <p>Error, no choices found.</p>
	return (
		<>
			<Row>
				<Col>
					<p className='font-weight-bold'>
						POTENTIAL CHALLENGES &amp; OBSTACLES
					</p>
					<ListWrapper
						data={getResults({
							data: challengesArray,
							type: 'Challenge',
							choices,
						}).slice(0, 3)}
						type='Challenge'
					/>
					{showMore && (
						<ListWrapper
							data={getResults({
								data: challengesArray,
								type: 'Challenge',
								choices,
							}).slice(3)}
							type='Challenge'
						/>
					)}
				</Col>
				<Col>
					<p className='font-weight-bold'>SO CONSIDER...</p>
					<ListWrapper
						data={getResults({
							data: challengesArray,
							type: 'Suggestion',
							choices: choices && choices,
						}).slice(0, 3)}
						type='Suggestion'
					/>
					{showMore && (
						<ListWrapper
							data={getResults({
								data: challengesArray,
								type: 'Suggestion',
								choices: choices && choices,
							}).slice(3)}
							type='Suggestion'
						/>
					)}
				</Col>
			</Row>
			<Row className='justify-content-center mb-4'>
				{!showMore ? (
					<StyledButton variant='info' onClick={() => handleMore()}>
						VIEW MORE <FontAwesomeIcon icon={faChevronDown} />
					</StyledButton>
				) : (
					<StyledButton variant='info' onClick={() => handleMore()}>
						VIEW LESS <FontAwesomeIcon icon={faChevronDown} />
					</StyledButton>
				)}
			</Row>
		</>
	)
}

export default Challenges
