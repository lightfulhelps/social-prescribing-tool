import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { AppContext, Choices } from '../../App'

export interface DropdownWrapperProps {
	title: string
	options: Array<string>
	hasMargin?: boolean
}

const DropdownWrapper: React.FunctionComponent<DropdownWrapperProps> = ({
	title,
	options,
	hasMargin,
}) => {
	const { choices, setChoices } = React.useContext(AppContext)
	const [active, setActive] = React.useState<string>()
	return (
		<Dropdown className={hasMargin ? 'mr-3' : ''}>
			<Dropdown.Toggle
				id='dropdown-basic'
				variant='white'
				className='dropdown-toggle font-weight-bold text-info border-info'
				style={{ width: 270 }}>
				{active === undefined ? title : active}
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{options.map((option, i) => (
					<Dropdown.Item
						eventKey={option}
						key={`${option}${i}`}
						onSelect={(e: any) => setActive(e)}
						active={active === option}>
						{option}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default DropdownWrapper
