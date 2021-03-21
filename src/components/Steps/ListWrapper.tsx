import React from 'react'
import { ListGroup } from 'react-bootstrap'

export interface ListWrapperProps {
	data: any
	type: string
}

const ListWrapper: React.FunctionComponent<ListWrapperProps> = ({
	data,
	type,
}) => {
	console.log(data)
	return (
		<ListGroup>
			{data.map((item: any) => (
				<ListGroup.Item
					className='border-primary my-3 rounded-sm border-top'
					style={{ height: 100 }}
					key={item.id}>
					{item.fields[type]}
				</ListGroup.Item>
			))}
		</ListGroup>
	)
}

export default ListWrapper
