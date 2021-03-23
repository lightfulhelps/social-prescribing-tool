import React from 'react'
import { Dropdown } from 'react-bootstrap'

export interface DropdownWrapperProps {
	title: string
	options: Array<string>
	hasMargin?: boolean
	className?: string
	choices: any
	handleChoice: any
	type: string
}

const DropdownWrapper: React.FunctionComponent<DropdownWrapperProps> = ({
	title,
	options,
	hasMargin,
	choices,
	handleChoice,
	type,
	...props
}) => {
	const [active, setActive] = React.useState<string>()
	const handleSelect = (e: any) => {
		setActive(e)
		handleChoice({
			...choices,
			[type]: e,
		})
	}

	console.log(choices)
	return (
		<Dropdown className={`w-100 ${hasMargin ? 'mr-3' : ''}`}>
			<Dropdown.Toggle
				id='dropdown-basic'
				variant='white'
				className={`dropdown-toggle font-weight-bold text-info border-info w-100 ${props.className}`}
				style={{ width: 270 }}>
				{choices[type] ? choices[type] : active === undefined ? title : active}
			</Dropdown.Toggle>
			<Dropdown.Menu className='w-100'>
				{options.map((option, i) => (
					<Dropdown.Item
						eventKey={option}
						key={`${option}${i}`}
						onSelect={(e: any) => handleSelect(e)}
						active={active === option}>
						{option}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default DropdownWrapper
