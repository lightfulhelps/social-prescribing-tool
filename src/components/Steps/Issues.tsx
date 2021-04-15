import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CardWrapper from '../CardWrapper';
import { useAllRecords } from '../../lib/base';
import Loader from '../Loader';

export type Issue = {
  id: 'string';
  fields: {
    Name: string;
    'Case Studies': Array<string>;
    'Challenges and Obstacles': Array<string>;
    'Case ': Array<string>;
    Resources: Array<string>;
    'Service Recommendations': Array<string>;
    Image: {
      url: string;
    }[];
  };
};

const Issues: React.FC = () => {
  const [{ records: issuesArray, loading }] = useAllRecords('Issues');

  if (loading) return <Loader />;

  return (
    <>
      <p>
        Please select <strong>up to 3 issue areas</strong> that are most relevant for the person in
        need.
      </p>
      <Row>
        {issuesArray.map((issue: any) => (
          <Col lg={4} className="mb-4" key={issue.fields.Name}>
            <CardWrapper filterKey="Issues" item={issue} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Issues;
