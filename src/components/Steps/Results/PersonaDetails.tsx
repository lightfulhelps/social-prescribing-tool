import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Figure, Form, Row, Spinner } from 'react-bootstrap'
import DropdownWrapper from '../../common/DropdownWrapper'
import img1 from '../../../assets/old_img1.png'
import img2 from '../../../assets/old_img2.png'
import img3 from '../../../assets/old_img3.png'
import { AppContext } from '../../../App'
import { StyledButton } from '../../Styles'
import base from '../../../api/base'

export interface PersonaDetailsProps {}

const PersonaDetails: React.FunctionComponent<PersonaDetailsProps> = () => {
	const { choices, setChoices } = React.useContext(AppContext)
	const [genderArray, setGenderArray] = React.useState<any>([])
	const [ageArray, setAgeArray] = React.useState<any>([])
	const [demographicsArray, setDemographicsArray] = React.useState<any>([])
	const [issuesArray, setIssuesArray] = React.useState<any>([])
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		setLoading(true)
		base('Gender')
			.select({ view: 'Grid view' })
			.eachPage((records, fetchNextPage) => {
				setGenderArray(records)
				fetchNextPage()
			})
		base('Age Range')
			.select({ view: 'Grid view' })
			.eachPage((records, fetchNextPage) => {
				setAgeArray(records)
				fetchNextPage()
			})
		base('Issues')
			.select({ view: 'Grid view' })
			.eachPage((records, fetchNextPage) => {
				setIssuesArray(records)
				fetchNextPage()
			})
		base('Other')
			.select({ view: 'Grid view' })
			.eachPage((records, fetchNextPage) => {
				setDemographicsArray(records)
				fetchNextPage()
			})
		setLoading(false)
	}, [])

	if (loading)
		return (
			<Spinner animation='border' role='status'>
				<span className='sr-only'>Loading...</span>
			</Spinner>
		)

	if (!choices) return <p>Error, no choices found.</p>

	return (
		<Row className='mb-4'>
			<Col>
				<Row className='my-2'>
					<Col>
						<Form.Label className='font-weight-bold'>GENDER: </Form.Label>{' '}
						{choices.gender ? (
							<StyledButton variant='info'>{choices.gender}</StyledButton>
						) : (
							<div className='d-flex align-items-center'>
								<DropdownWrapper
									title='Please select...'
									options={genderArray.map((item: any) => item.fields.Name)}
									hasMargin
									type='gender'
									choices={choices}
									handleChoice={setChoices}
								/>
								<FontAwesomeIcon icon={faTrashAlt} />
							</div>
						)}
					</Col>
				</Row>
				<Row className='my-2'>
					<Col>
						<Form.Label className='font-weight-bold'>AGE RANGE: </Form.Label>{' '}
						{choices.gender ? (
							<StyledButton variant='info'>{choices.age}</StyledButton>
						) : (
							<div className='d-flex align-items-center'>
								<DropdownWrapper
									title='Please select...'
									options={ageArray.map((item: any) => item.fields.Name)}
									hasMargin
									type='age'
									choices={choices}
									handleChoice={setChoices}
								/>
								<FontAwesomeIcon icon={faTrashAlt} />
							</div>
						)}
					</Col>
				</Row>
				<Row className='my-2'>
					<Col>
						<Form.Label className='font-weight-bold'>ISSUES: </Form.Label>
						{choices.gender ? (
							<StyledButton variant='info'>{choices.age}</StyledButton>
						) : (
							<div className='d-flex align-items-center w-100'>
								<DropdownWrapper
									title='Please select...'
									options={issuesArray.map((item: any) => item.fields.Name)}
									hasMargin
									type='issues'
									choices={choices}
									handleChoice={setChoices}
								/>
								<FontAwesomeIcon icon={faTrashAlt} />
							</div>
						)}
					</Col>
				</Row>
			</Col>
			<Col>
				<Row>
					<Col>
						<Figure.Image width={188} height={186} alt='171x180' src={img1} />
						<Figure.Image width={188} height={186} alt='171x180' src={img2} />
						<Figure.Image width={188} height={186} alt='171x180' src={img3} />
					</Col>
				</Row>
				<Row className='my-2'>
					<Col>
						<Form.Label className='font-weight-bold'>
							OTHER CHARACTERISTICS:
						</Form.Label>
						{choices.demographics && choices.demographics.length > 0 ? (
							choices.demographics.map((item) => (
								<div className='d-flex align-items-center'>
									<StyledButton
										variant='white'
										className='text-info border-info'>
										{item}
									</StyledButton>
									<FontAwesomeIcon icon={faTrashAlt} />
								</div>
							))
						) : (
							<div className='d-flex align-items-center'>
								<DropdownWrapper
									title='Please select...'
									options={demographicsArray.map(
										(item: any) => item.fields.Name
									)}
									hasMargin
									type='demographics'
									choices={choices}
									handleChoice={setChoices}
								/>
								<FontAwesomeIcon icon={faTrashAlt} />
							</div>
						)}
					</Col>
				</Row>
			</Col>
		</Row>
	)
}

export default PersonaDetails
