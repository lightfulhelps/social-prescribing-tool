import React, { useState } from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { getFilteredRecords, getSortedRecords } from '../../../lib/filtering';
import { useAppContext } from '../../../App';
import { getRecords, TABLES } from '../../../lib/airtable';
import Loader from '../../Loader';

const Challenges: React.FC = () => {
  const { filters } = useAppContext();
  const { isLoading, data: challenges } = useQuery<ChallengeAndObstacle[]>(
    TABLES.CHALLENGES_OBSTACLES,
    () => getRecords(TABLES.CHALLENGES_OBSTACLES)
  );
  const perPage = 3;
  const [displayCount, setDisplayCount] = useState(3);
  const filteredRecords: ChallengeAndObstacle[] = getFilteredRecords(challenges, filters);
  const sortedRecords: ChallengeAndObstacle[] = getSortedRecords(filteredRecords, filters);

  if (!isLoading && filteredRecords.length === 0) return null;

  return (
    <div className="py-4" style={{ backgroundColor: '#F9F4F9' }}>
      <Container>
        <Row className="d-none d-lg-flex">
          <Col>
            <h3 className="h4 mb-4 text-uppercase">Potential Challenges</h3>
          </Col>
          <Col>
            <h3 className="h4 mb-4 text-uppercase">So Consider...</h3>
          </Col>
        </Row>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {sortedRecords.slice(0, displayCount).map((record, i) => (
              <Row className="mb-3 mb-lg-4" key={record.id}>
                <Col xs={12} md={6}>
                  <div
                    className={`challenge-obstacle-left d-md-flex align-items-center border-0 text-white mr-md-n2 h-100 ${
                      i % 2 === 0 ? 'bg-secondary' : 'bg-success'
                    }`}
                  >
                    <h4 className="d-md-none h6">Potential Challenges</h4>
                    {record.fields['Challenge']}
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div
                    className={`challenge-obstacle-right d-md-flex align-items-center border-0 text-white ml-md-n2 h-100 ${
                      i % 2 === 0 ? 'bg-secondary' : 'bg-success'
                    }`}
                  >
                    <h4 className="d-md-none h6">So Consider...</h4>
                    {record.fields['Suggestion']}
                  </div>
                </Col>
              </Row>
            ))}
            {filteredRecords.length > displayCount && (
              <div className="d-flex justify-content-center">
                <Button
                  className="d-flex btn-block justify-content-center w-lg-auto align-items-center text-uppercase"
                  variant="info"
                  size="lg"
                  onClick={() => {
                    setDisplayCount(displayCount + perPage);
                  }}
                >
                  View more <FaChevronDown className="ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Challenges;
