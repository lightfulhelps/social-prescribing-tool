import React from 'react';
import Card from 'react-bootstrap/Card';
import { Issue } from './Steps/Issues';
import { Demographic } from './Steps/Demographics';
import { FaCheck } from 'react-icons/fa';

export interface CardWrapperProps {
  imageUrl: string;
  item: Issue | Demographic;
  choices: any;
  setChoices: any;
  type: string;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ imageUrl, item, choices, setChoices, type }) => {
  const [active, setActive] = React.useState<boolean>(false);

  const handleClick = () => {
    if (type === 'issues' && choices.issues.length === 3) {
      return;
    }
    if (!active) {
      setChoices({
        ...choices,
        [type]: [...choices[type], item.fields.Name],
      });
      setActive(!active);
      return;
    }

    setChoices({
      ...choices,
      [type]: choices[type].filter((each: any) => each !== item.fields.Name),
    });
    setActive(!active);
  };

  return (
    <Card onClick={() => handleClick()}>
      {active ? (
        <div className="bg-dark d-flex justify-content-around align-items-center">
          <div
            className="position-absolute d-flex align-items-center justify-content-around rounded-circle"
            style={{
              zIndex: 999,
              height: '60px',
              width: '60px',
              backgroundColor: '#ffc200',
            }}
          >
            <FaCheck size={30} />
          </div>
          <Card.Img variant="top" src={imageUrl} style={{ opacity: active ? 0.5 : 1 }} />
        </div>
      ) : (
        <Card.Img variant="top" src={imageUrl} style={{ opacity: active ? 0.5 : 1 }} />
      )}
      <Card bg={active ? 'warning' : 'primary'} className="border-0 rounded-0">
        <Card.Header className={`text-center font-weight-bold ${active ? '' : 'text-white'}`}>
          {item.fields.Name}
        </Card.Header>
      </Card>
    </Card>
  );
};

export default CardWrapper;
