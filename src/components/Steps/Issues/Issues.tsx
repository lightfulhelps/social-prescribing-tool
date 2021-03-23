import React from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import CardWrapper from '../../common/CardWrapper'
import placeholderImg from '../../../assets/image1.png'
import { AppContext } from '../../../App'
import base from '../../../api/base'

export type Issue = {
	id: 'string'
	fields: {
		Name: string
		'Case Studies': Array<string>
		'Challenges and Obstacles': Array<string>
		'Case ': Array<string>
		Resources: Array<string>
		'Service Recommendations': Array<string>
	}
}

export interface IssuesProps {}

const Issues: React.FunctionComponent<IssuesProps> = () => {
	const { choices, setChoices } = React.useContext(AppContext)
	const [issuesArray, setIssuesArray] = React.useState<any>([])
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		setLoading(true)
		base('Issues')
			.select({ view: 'Grid view' })
			.eachPage((records, processNextPage) => {
				setIssuesArray(records)
				processNextPage()
				setLoading(false)
			})
	}, [])

	if (loading)
		return (
			<Spinner animation='border' role='status'>
				<span className='sr-only'>Loading...</span>
			</Spinner>
		)

	return (
		<>
			<p>
				Please select <strong>up to 3 issue areas</strong> that are most
				relevant for the person in need
			</p>
			<Row>
				{issuesArray.map((issue: any) => (
					<Col lg={4} className='mb-4' key={issue.fields.Name}>
						<CardWrapper
							imageUrl={placeholderImg}
							item={issue}
							choices={choices?.issues}
							setChoices={setChoices}
							type='issues'
						/>
					</Col>
				))}
			</Row>
		</>
	)
}

export default Issues
