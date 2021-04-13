import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import CardWrapper from '../CardWrapper';
import placeholderImg from '../../assets/image1.png';
import { AppContext } from '../../App';
import { useAllRecords } from '../../api/base';

export type Issue = {
  id: 'string';
  fields: {
    Name: string;
    'Case Studies': Array<string>;
    'Challenges and Obstacles': Array<string>;
    'Case ': Array<string>;
    Resources: Array<string>;
    'Service Recommendations': Array<string>;
  };
};

export interface IssuesProps {}

const Issues: React.FC<IssuesProps> = () => {
  const { choices, setChoices } = React.useContext(AppContext);
  const [{ records: issuesArray, loading }] = useAllRecords('Issues');

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  if (!choices) return <p>Error, no choices found.</p>;

  return (
    <>
      {choices.issues.length > 3 ? (
        <p className="text-danger">
          Please select <strong>up to 3 issue areas</strong> that are most relevant for the person
          in need
        </p>
      ) : (
        <p>
          Please select <strong>up to 3 issue areas</strong> that are most relevant for the person
          in need
        </p>
      )}
      <Row>
        {issuesArray.map((issue: any) => (
          <Col lg={4} className="mb-4" key={issue.fields.Name}>
            <CardWrapper
              imageUrl={placeholderImg}
              item={issue}
              choices={choices}
              setChoices={setChoices}
              type="issues"
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Issues;
