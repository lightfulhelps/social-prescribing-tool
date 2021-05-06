import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import CardWrapper from '../components/CardWrapper';
import { getRecords, TABLES } from '../lib/airtable';
import Loader from '../components/Loader';

const Issues: React.FC = () => {
  const { isLoading, data: issues } = useQuery<Issue[]>(TABLES.ISSUES, () =>
    getRecords(TABLES.ISSUES)
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <p className="mb-4">
        Please select <strong>up to 3 issue areas</strong> that are most relevant for the person in
        need.
      </p>
      <Row>
        {issues?.map((issue) => (
          <Col xs={6} md={4} className="mb-4" key={issue.fields.Name}>
            <CardWrapper filterKey="Issues" item={issue} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Issues;
