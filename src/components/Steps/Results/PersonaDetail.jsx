import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { useAppContext } from '../../../App';
import DropdownWrapper from '../../DropdownWrapper';

type Props = {
  filterKey: string,
  data: any,
  title: string,
};

const PersonaDetail: React.FC<Props> = ({ type, data, title }) => {
  const { filters, handleFilter } = useAppContext();

  if (type === 'issues' || type === 'demographics')
    return (
      <Row className="mb-5">
        <Col>
          <Form.Label className="font-weight-bold">{title}</Form.Label>
          {choices[type].map((item) => (
            <div key={item} className="d-flex align-items-center mb-2">
              <DropdownWrapper
                title={item || 'Please select...'}
                options={data.map((item: any) => item.fields.Name)}
                className="d-flex justify-content-between align-items-center"
                type={type}
                choices={choices}
                handleChoice={setChoices}
              />
              <FaTrashAlt className="ml-2 text-info" onClick={() => handleClear({ type, item })} />
            </div>
          ))}
          {choices[type] && (
            <div
              className="d-flex align-items-center text-info font-weight-bold mt-2 text-underline"
              onClick={() => handleAdd(type)}
            >
              <FaPlusCircle className="mr-2" /> <u>Add</u>
            </div>
          )}
        </Col>
      </Row>
    );

  return (
    <Row className="mb-5">
      <Col>
        <Form.Label className="font-weight-bold">{title}</Form.Label>
        {choices[type] ? (
          <>
            <div className="d-flex align-items-center">
              <DropdownWrapper
                title={choices[type] || 'Please select...'}
                options={data.map((item: any) => item.fields.Name)}
                className="d-flex justify-content-between align-items-center"
                type={type}
                choices={choices}
                handleChoice={setChoices}
              />
              <FaTrashAlt className="ml-2 text-info" onClick={() => handleClear({ type })} />
            </div>
          </>
        ) : (
          <>
            <div className="d-flex align-items-center">
              <DropdownWrapper
                title="Please select..."
                options={data.map((item: any) => item.fields.Name)}
                className="d-flex justify-content-between align-items-center"
                type={type}
                choices={choices}
                handleChoice={setChoices}
              />
              <FaTrashAlt className="ml-2 text-info" onClick={() => handleClear({ type })} />
            </div>
          </>
        )}
      </Col>
    </Row>
  );
};

export default PersonaDetail;
