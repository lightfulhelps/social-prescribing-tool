import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CardWrapper from '../CardWrapper';
import { useAllRecords } from '../../lib/base';
import Loader from '../Loader';

const Issues: React.FC = () => {
  const [{ records: issuesArray, loading }] = useAllRecords<Issue>('Issues');

  if (loading) return <Loader />;

  return (
    <>
      <p className="mb-3">
        Please select <strong>up to 3 issue areas</strong> that are most relevant for the person in
        need.
      </p>
      <Row>
        {issuesArray.map((issue) => (
          <Col lg={4} className="mb-4" key={issue.fields.Name}>
            <CardWrapper filterKey="Issues" item={issue} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Issues;
