import React from 'react'
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'
import { Issue } from '../Steps/Issues/Issues'
import { Demographic } from '../Steps/Demographics/Demographics'

export interface CardWrapperProps {
	imageUrl: string
	item: Issue | Demographic
	choices: any
	setChoices: any
	type: string
}

const StyledCard = styled(Card)`
	width: 270px;
`

const CardWrapper: React.FunctionComponent<CardWrapperProps> = ({
	imageUrl,
	item,
	choices,
	setChoices,
	type,
}) => {
	const [active, setActive] = React.useState<boolean>(false)

	const handleClick = () => {
		if (type === 'issues' && choices.issues.length === 3) {
			return
		}
		if (!active) {
			setChoices({
				...choices,
				[type]: [...choices[type], item.fields.Name],
			})
			setActive(!active)
			return
		}

		setChoices({
			...choices,
			[type]: choices[type].filter((each: any) => each !== item.fields.Name),
		})
		setActive(!active)
	}

	return (
		<StyledCard value={item.fields.Name} onClick={() => handleClick()}>
			<Card.Img variant='top' src={imageUrl} />
			<Card bg={active ? 'warning' : 'primary'} className='border-0 rounded-0'>
				<Card.Header
					className={`text-center font-weight-bold ${
						active ? '' : 'text-white'
					}`}>
					{item.fields.Name}
				</Card.Header>
			</Card>
		</StyledCard>
	)
}

export default CardWrapper
