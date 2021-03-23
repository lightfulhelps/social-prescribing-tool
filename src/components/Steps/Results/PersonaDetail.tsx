import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { AppContext } from '../../../App'
import DropdownWrapper from '../../common/DropdownWrapper'

export interface PersonaDetailProps {
	type: 'gender' | 'age' | 'issues' | 'demographics'
	data: any
	multiple?: boolean | false
	title: string
}

const PersonaDetail: React.FunctionComponent<PersonaDetailProps> = ({
	type,
	data,
	title,
	...props
}) => {
	const { choices, setChoices } = React.useContext(AppContext)
	const [showDropdown, setShowDropdown] = React.useState<boolean>(false)

	if (!choices) return <p>Error, no choices found.</p>

	return (
		<Row className='mb-5'>
			<Col>
				<Form.Label className='font-weight-bold'>{title}</Form.Label>
				{choices[type] && (
					<>
						<div className='d-flex align-items-center'>
							<DropdownWrapper
								title='Please select...'
								options={data.map((item: any) => item.fields.Name)}
								className='d-flex justify-content-between align-items-center'
								type={type}
								choices={choices}
								handleChoice={setChoices}
							/>
							<FontAwesomeIcon icon={faTrashAlt} />
						</div>
						<div>
							{props.multiple && (
								<div
									className='d-flex align-items-center'
									onClick={() => setShowDropdown(true)}>
									<FontAwesomeIcon icon={faPlusCircle} /> Add
								</div>
							)}
						</div>
					</>
				)}

				{choices[type].length === 0 && !showDropdown && (
					<div
						className='d-flex align-items-center'
						onClick={() => setShowDropdown(true)}>
						<FontAwesomeIcon icon={faPlusCircle} /> Add
					</div>
				)}

				{showDropdown && (
					<div className='d-flex align-items-center'>
						<DropdownWrapper
							title='Please select...'
							options={data.map((item: any) => item.fields.Name)}
							className='d-flex justify-content-between align-items-center'
							type={type}
							choices={choices}
							handleChoice={setChoices}
						/>
						<FontAwesomeIcon
							icon={faTrashAlt}
							onClick={() => setShowDropdown(false)}
						/>
					</div>
				)}
			</Col>
		</Row>
	)
}

export default PersonaDetail
