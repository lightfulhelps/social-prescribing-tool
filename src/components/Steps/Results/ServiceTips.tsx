import React from 'react'
import { Card, CardColumns, Col, Row } from 'react-bootstrap'
import {
	faChevronDown,
	faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from '../../../App'
import base from '../../../api/base'
import { CardLink, StyledButton } from '../../Styles'
import { getResults } from './Results'

export interface ServiceTipsProps {}

const ServiceTips: React.FunctionComponent<ServiceTipsProps> = () => {
	const { choices } = React.useContext(AppContext)

	const [serviceArray, setServiceArray] = React.useState<any>([])
	const [loading, setLoading] = React.useState(false)

	const handleMore = () => console.log('Loading more...')

	React.useEffect(() => {
		base('Service Recommendations')
			.select({ view: 'Grid view' })
			.eachPage((records, fetchNextPage) => {
				setServiceArray(records)
				fetchNextPage()
				setLoading(false)
			})
	}, [])

	if (!choices) return <p>Error, no choices found.</p>

	return (
		<>
			<Row>
				<Col>
					<p className='font-weight-bold'>SERVICE TIPS</p>
					<CardColumns>
						{getResults({ data: serviceArray, type: 'Description', choices })
							.slice(0, 6)
							.map(
								(item: any) =>
									item.fields['Link'] && (
										<Card style={{ height: '220px' }}>
											<Card.Body>
												<Card.Title>{item.fields['Select']}</Card.Title>
												<Card.Text>{item.fields['Description']}</Card.Text>
												<CardLink href={item.fields['Link']} target='_blank'>
													READ MORE <FontAwesomeIcon icon={faExternalLinkAlt} />
												</CardLink>
											</Card.Body>
										</Card>
									)
							)}
					</CardColumns>
				</Col>
			</Row>
			<Row className='justify-content-center mb-4'>
				<StyledButton variant='info' onClick={() => handleMore()}>
					VIEW MORE <FontAwesomeIcon icon={faChevronDown} />
				</StyledButton>
			</Row>
		</>
	)
}

export default ServiceTips
