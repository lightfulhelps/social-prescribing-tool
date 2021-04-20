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

  return (
    <div className="py-4" style={{ backgroundColor: '#F9F4F9' }}>
      <Container>
        <Row>
          <Col>
            <h3 className="h4 mb-4 text-uppercase">Potential Challenges &amp; Obstacles</h3>
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
              <Row key={record.id}>
                <Col className="mb-4">
                  <div
                    className={`d-flex align-items-center border-0 text-white rounded p-3 font-weight-bold h-100 ${
                      i % 2 === 0 ? 'bg-secondary' : 'bg-success'
                    }`}
                  >
                    {record.fields['Challenge']}
                  </div>
                </Col>
                <Col className="mb-4">
                  <div
                    className={`d-flex align-items-center border-0 text-white rounded p-3 font-weight-bold h-100 ${
                      i % 2 === 0 ? 'bg-secondary' : 'bg-success'
                    }`}
                  >
                    {record.fields['Suggestion']}
                  </div>
                </Col>
              </Row>
            ))}
            {filteredRecords.length > displayCount && (
              <Row className="justify-content-center">
                <Button
                  className="d-flex align-items-center text-uppercase"
                  variant="info"
                  size="lg"
                  onClick={() => {
                    setDisplayCount(displayCount + perPage);
                  }}
                >
                  View more <FaChevronDown className="ml-1" />
                </Button>
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Challenges;
