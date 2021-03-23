import React from 'react'
import { Col, Figure, Row, Spinner } from 'react-bootstrap'
import img1 from '../../../assets/old_img1.png'
import img2 from '../../../assets/old_img2.png'
import img3 from '../../../assets/old_img3.png'
import { AppContext } from '../../../App'
import base from '../../../api/base'
import PersonaDetail from './PersonaDetail'

export interface PersonaDetailsProps {}

const PersonaDetails: React.FunctionComponent<PersonaDetailsProps> = () => {
	const { choices } = React.useContext(AppContext)
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
				<PersonaDetail
					data={genderArray}
					type='gender'
					title='Gender Identification'
				/>
				<PersonaDetail data={ageArray} type='age' title='Age Range' />
				<PersonaDetail
					data={issuesArray}
					type='issues'
					title='Issues'
					multiple
				/>
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
						<PersonaDetail
							data={demographicsArray}
							type='demographics'
							title='Other Characteristics'
							multiple
						/>
					</Col>
				</Row>
			</Col>
		</Row>
	)
}

export default PersonaDetails
