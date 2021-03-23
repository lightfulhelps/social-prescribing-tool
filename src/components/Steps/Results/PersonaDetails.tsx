import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Figure, Form, Row } from 'react-bootstrap'
import DropdownWrapper from '../../common/DropdownWrapper'
import img1 from '../../../assets/old_img1.png'
import img2 from '../../../assets/old_img2.png'
import img3 from '../../../assets/old_img3.png'

export interface PersonaDetailsProps {}

const PersonaDetails: React.FunctionComponent<PersonaDetailsProps> = () => {
	return (
		<Row className='mb-4'>
			<Col>
				<Row className='my-2'>
					<Col>
						<Form.Label className='font-weight-bold'>GENDER: </Form.Label>{' '}
						<div className='d-flex align-items-center'>
							<DropdownWrapper title='Female' options={['1', '2']} hasMargin />
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
						<div className='d-flex align-items-center w-100'>
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
	)
}

export default PersonaDetails
