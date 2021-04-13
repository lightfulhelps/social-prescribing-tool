import React from 'react';
import { ListGroup } from 'react-bootstrap';

export interface ListWrapperProps {
  data: any;
  type: string;
}

const ListWrapper: React.FunctionComponent<ListWrapperProps> = ({ data, type }) => {
  return (
    <ListGroup>
      {data.map((item: any) => (
        <ListGroup.Item
          className="my-2 rounded-sm font-weight-bold d-flex align-items-center border-0"
          style={{ height: 100, backgroundColor: '#8E2082', color: 'white' }}
          key={item.id}
        >
          {item.fields[type]}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ListWrapper;
