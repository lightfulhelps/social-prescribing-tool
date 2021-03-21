import {
	faArrowDown,
	faExternalLinkAlt,
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
	ListGroup,
	Row,
	Spinner,
} from 'react-bootstrap'
import base from '../../api/base'
import { AppContext } from '../../App'
import { StyledButton } from '../Styles'
import DropdownWrapper from './DropdownWrapper'
import ListWrapper from './ListWrapper'

export interface ResultsProps {}

const Results: React.FunctionComponent<ResultsProps> = () => {
	const { choices } = React.useContext(AppContext)
	// const choices = {
	// 	gender: 'Male',
	// 	age: '18-25',
	// }
	const [resultsArray, setResultsArray] = React.useState([])
	const [challengesArray, setChallengesArray] = React.useState<any>([])
	const [serviceArray, setServiceArray] = React.useState<any>([])
	const [resourcesArray, setResourcesArray] = React.useState<any>([])
	const [caseStudiesArray, setCaseStudiesArray] = React.useState<any>([])
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		setLoading(true)
		base('Challenges and Obstacles')
			.select({ view: 'Grid view' })
			.eachPage((records, fetchNextPage) => {
				setChallengesArray(records)
				fetchNextPage()
				setLoading(false)
			})
		base('Service Recommendations')
			.select({ view: 'Grid view' })
			.eachPage((records, fetchNextPage) => {
				setServiceArray(records)
				fetchNextPage()
				setLoading(false)
			})
		base('Online Resources')
			.select({ view: 'Grid view' })
			.eachPage((records, fetchNextPage) => {
				setResourcesArray(records)
				fetchNextPage()
				setLoading(false)
			})
		base('Case Studies')
			.select({ view: 'Grid view' })
			.eachPage((records, fetchNextPage) => {
				setCaseStudiesArray(records)
				fetchNextPage()
				setLoading(false)
			})
		base('Gender')
			.select({
				// Selecting the first 3 records in Grid view:
				maxRecords: 12,
				view: 'Grid view',
			})
			.eachPage(
				function page(records, fetchNextPage) {
					// This function (`page`) will get called for each page of records.
					console.log(records)
					records.forEach(function (record) {
						console.log('Retrieved', record.get('Name'))
					})

					// To fetch the next page of records, call `fetchNextPage`.
					// If there are more records, `page` will get called again.
					// If there are no more records, `done` will get called.
					fetchNextPage()
				},
				function done(err) {
					if (err) {
						console.error(err)
						return
					}
				}
			)
	}, [])

	const getResults = (data: any, type: string) => {
		return data
			.filter(
				(item: any) => item.fields[type] && item.fields[type].length !== 0
			)
			.filter((item: any) =>
				choices?.gender ? item.fields['Gender'].includes(choices?.gender) : item
			)
			.filter((item: any) =>
				choices?.age ? item.fields['Age Range'].includes(choices?.age) : item
			)
		// .filter((item) => item['Issues'].includes(persona.issues))
	}

	const handleMore = () => {
		console.log('Loading more...')
	}

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

	// const challenges = challengesArray.filter((challenge: any) =>
	// 	challenge.Gender.includes(choices?.gender)
	// )
	console.log(challengesArray)
	return (
		<>
			<Row>
				<Col>
					<Row className='my-2'>
						<Col>
							<Form.Label className='font-weight-bold'>GENDER: </Form.Label>{' '}
							<div className='d-flex align-items-center'>
								<DropdownWrapper
									title='Female'
									options={['1', '2']}
									hasMargin
								/>
								<FontAwesomeIcon icon={faTrashAlt} />
							</div>
						</Col>
					</Row>
					<Row className='my-2'>
						<Col>
							<Form.Label className='font-weight-bold'>AGE RANGE: </Form.Label>{' '}
							<div className='d-flex align-items-center'>
								<DropdownWrapper
									title='66-80 Years'
									options={['1', '2']}
									hasMargin
								/>
								<FontAwesomeIcon icon={faTrashAlt} />
							</div>
						</Col>
					</Row>
					<Row className='my-2'>
						<Col>
							<Form.Label className='font-weight-bold'>ISSUES: </Form.Label>{' '}
							<div className='d-flex align-items-center'>
								<DropdownWrapper
									title='66-80 Years'
									options={['1', '2']}
									hasMargin
								/>
								<FontAwesomeIcon icon={faTrashAlt} />
							</div>
						</Col>
					</Row>
				</Col>
				<Col>
					<Figure.Image
						width={860}
						height={186}
						alt='171x180'
						src='https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
					/>
					<Row className='my-2'>
						<Col>
							<Form.Label className='font-weight-bold'>
								OTHER CHARACTERISTICS:{' '}
							</Form.Label>
							<div className='d-flex align-items-center'>
								<DropdownWrapper
									title='66-80 Years'
									options={['1', '2']}
									hasMargin
								/>
								<FontAwesomeIcon icon={faTrashAlt} />
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col>
					<p className='font-weight-bold'>
						POTENTIAL CHALLENGES &amp; OBSTACLES
					</p>
					<ListWrapper
						data={getResults(challengesArray, 'Challenge')}
						type='Challenge'
					/>
				</Col>
				<Col>
					<p className='font-weight-bold'>SO CONSIDER...</p>
					<ListWrapper
						data={getResults(challengesArray, 'Suggestion')}
						type='Suggestion'
					/>
				</Col>
				<Col md={{ span: 6, offset: 3 }}>
					<StyledButton variant='info' onClick={() => handleMore()}>
						VIEW MORE <FontAwesomeIcon icon={faArrowDown} />
					</StyledButton>
				</Col>
			</Row>
			<Row>
				<Col>
					<p className='font-weight-bold'>SERVICE TIPS</p>
					<CardColumns>
						{getResults(serviceArray, 'Description').map(
							(item: any) =>
								item.fields['Link'] && (
									<Card style={{ width: '18rem' }}>
										<Card.Body>
											<Card.Title>{item.fields['Select']}</Card.Title>
											<Card.Text>{item.fields['Description']}</Card.Text>
											<Card.Link href={item.fields['Link']}>
												READ MORE
											</Card.Link>
										</Card.Body>
									</Card>
								)
						)}
					</CardColumns>
				</Col>
				<Col md={{ span: 6, offset: 3 }}>
					<StyledButton variant='info' onClick={() => handleMore()}>
						VIEW MORE <FontAwesomeIcon icon={faArrowDown} />
					</StyledButton>
				</Col>
			</Row>
			<Row>
				<Col>
					<p className='font-weight-bold'>SERVICE TIPS</p>
					<CardColumns>
						{getResults(resourcesArray, 'Name').map((item: any) => (
							<Card style={{ width: '18rem' }}>
								<Card.Body>
									<Card.Title>{item.fields['Name']}</Card.Title>
									<Card.Text>{item.fields['Description']}</Card.Text>
									<Card.Link href={item.fields['Link']}>
										OPEN LINK <FontAwesomeIcon icon={faExternalLinkAlt} />
									</Card.Link>
								</Card.Body>
							</Card>
						))}
					</CardColumns>
				</Col>
				<Col md={{ span: 6, offset: 3 }}>
					<StyledButton variant='info' onClick={() => handleMore()}>
						VIEW MORE <FontAwesomeIcon icon={faArrowDown} />
					</StyledButton>
				</Col>
			</Row>
			<Row>
				<Col>
					<p className='font-weight-bold'>SUGGESTED ONLINE RESOURCES</p>
					<CardColumns>
						{getResults(resourcesArray, 'Name').map((item: any) => (
							<Card style={{ width: '18rem' }}>
								<Card.Body>
									<Card.Title>{item.fields['Name']}</Card.Title>
									<Card.Text>{item.fields['Description']}</Card.Text>
									<Card.Link href={item.fields['Link']}>
										OPEN LINK <FontAwesomeIcon icon={faExternalLinkAlt} />
									</Card.Link>
								</Card.Body>
							</Card>
						))}
					</CardColumns>
				</Col>
				<Col md={{ span: 6, offset: 3 }}>
					<StyledButton variant='info' onClick={() => handleMore()}>
						VIEW MORE <FontAwesomeIcon icon={faArrowDown} />
					</StyledButton>
				</Col>
			</Row>
			<Row>
				<p className='font-weight-bold'>CASE STUDIES</p>
				<p>
					These case studies are what’s worked or hasn’t worked for people
					matching this profile.
				</p>
				{getResults(caseStudiesArray, 'Name').map((item: any) => (
					<Card>
						<Card.Header as='h5'>{item.fields['Name']}</Card.Header>
						<Card.Body>
							<Row>
								<Col>
									<Card>
										<Card.Header as='h5'>Beneficiary Profile</Card.Header>
										<Card.Body>
											<Card.Text>
												{item.fields['Beneficiary profile']}
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
								<Col>
									<Card>
										<Card.Header as='h5'>Agreed Action Plan</Card.Header>
										<Card.Body>
											<Card.Text>{item.fields['Agreed action plan']}</Card.Text>
										</Card.Body>
									</Card>
								</Col>
							</Row>
							<Row>
								<Col>
									<Card>
										<Card.Header as='h5'>What's Helped Them</Card.Header>
										<Card.Body>
											<Card.Text>{item.fields[`What's helped`]}</Card.Text>
										</Card.Body>
									</Card>
								</Col>
								<Col>
									<Card>
										<Card.Header as='h5'>What Didn't Help Them</Card.Header>
										<Card.Body>
											<Card.Text>{item.fields[`What didn't help`]}</Card.Text>
										</Card.Body>
									</Card>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				))}
				<Col md={{ span: 6, offset: 3 }}>
					<StyledButton variant='info' onClick={() => handleMore()}>
						VIEW MORE <FontAwesomeIcon icon={faArrowDown} />
					</StyledButton>
				</Col>
			</Row>
		</>
	)
}

export default Results
