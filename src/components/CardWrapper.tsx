import React from 'react';
import Card from 'react-bootstrap/Card';
import { FaCheck } from 'react-icons/fa';
import { useAppContext } from '../App';

type Props = {
  filterKey: string;
  item: Issue | Other;
};

const CardWrapper: React.FC<Props> = ({ filterKey, item }) => {
  const { filters, handleFilter } = useAppContext();
  const active = filters?.some((f) => f.value === item.id) || false;

  return (
    <Card
      className="border-0 h-100"
      bg={active ? 'warning' : 'secondary'}
      onClick={() => {
        if (handleFilter) {
          handleFilter(filterKey, item.id);
        }
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center position-relative p-3 rounded-top"
        style={{ backgroundColor: '#F9F4F9' }}
      >
        {active && (
          <div className="position-absolute d-flex justify-content-center align-items-center w-100 h-100 rounded">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                zIndex: 999,
                height: '60px',
                width: '60px',
                backgroundColor: '#ffc200',
              }}
            >
              <FaCheck size={30} />
            </div>
          </div>
        )}
        {Array.isArray(item.fields.Image) && (
          <img src={item.fields.Image[0].url} style={{ height: '100px' }} alt="" />
        )}
      </div>
      <Card.Body className={`px-1 py-2 text-center font-weight-bold ${active ? '' : 'text-white'}`}>
        {item.fields.Name}
      </Card.Body>
    </Card>
  );
};

export default CardWrapper;
