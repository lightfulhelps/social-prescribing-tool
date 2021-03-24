import React from 'react'
import { Card, CardColumns, Col, Row, Spinner } from 'react-bootstrap'
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
	const [showMore, setShowMore] = React.useState(false)

	React.useEffect(() => {
		base('Service Recommendations')
			.select({ view: 'Grid view' })
			.eachPage((records, fetchNextPage) => {
				setServiceArray(records)
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
		<div className='mb-4'>
			<Row>
				<Col>
					<p className='font-weight-bold'>SERVICE TIPS</p>
					<CardColumns>
						{getResults({ data: serviceArray, type: 'Description', choices })
							.slice(0, 6)
							.map(
								(item: any) =>
									item.fields['Link'] && (
										<Card key={item.id} style={{ height: '220px' }}>
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
						{showMore &&
							getResults({ data: serviceArray, type: 'Description', choices })
								.slice(6)
								.map(
									(item: any) =>
										item.fields['Link'] && (
											<Card style={{ height: '220px' }}>
												<Card.Body>
													<Card.Title>{item.fields['Select']}</Card.Title>
													<Card.Text>{item.fields['Description']}</Card.Text>
													<CardLink href={item.fields['Link']} target='_blank'>
														READ MORE{' '}
														<FontAwesomeIcon icon={faExternalLinkAlt} />
													</CardLink>
												</Card.Body>
											</Card>
										)
								)}
					</CardColumns>
				</Col>
			</Row>
			{getResults({ data: serviceArray, type: 'Description', choices }).length >
				3 && (
				<Row className='justify-content-center'>
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
			)}
		</div>
	)
}

export default ServiceTips
