import React from 'react'
import {
	faChevronDown,
	faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardColumns, Col, Row, Spinner } from 'react-bootstrap'
import base from '../../../api/base'
import { AppContext } from '../../../App'
import { CardLink, StyledButton } from '../../Styles'
import { getResults } from './Results'

export interface OnlineResourcesProps {}

const OnlineResources: React.FunctionComponent<OnlineResourcesProps> = () => {
	const { choices } = React.useContext(AppContext)

	const [resourcesArray, setResourcesArray] = React.useState<any>([])
	const [loading, setLoading] = React.useState(false)
	const [showMore, setShowMore] = React.useState(false)

	React.useEffect(() => {
		base('Online Resources')
			.select({ view: 'Grid view' })
			.eachPage((records, fetchNextPage) => {
				setResourcesArray(records)
				fetchNextPage()
				setLoading(false)
			})
	}, [])

	const handleMore = () => setShowMore(!showMore)

	if (loading)
		return (
			<Spinner animation='border' role='status'>
				<span className='sr-only'>Loading...</span>
			</Spinner>
		)

	if (!choices) return <p>Error, no choices found.</p>
	return (
		<>
			<Row>
				<Col>
					<p className='font-weight-bold'>SUGGESTED ONLINE RESOURCES</p>
					<CardColumns>
						{getResults({ data: resourcesArray, type: 'Name', choices })
							.slice(0, 6)
							.map((item: any) => (
								<Card key={item.id} style={{ height: '220px' }}>
									<Card.Body>
										<Card.Title>{item.fields['Name']}</Card.Title>
										<Card.Text>{item.fields['Description']}</Card.Text>
										<CardLink href={item.fields['Link']} target='_blank'>
											OPEN LINK <FontAwesomeIcon icon={faExternalLinkAlt} />
										</CardLink>
									</Card.Body>
								</Card>
							))}
					</CardColumns>
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

export default OnlineResources
