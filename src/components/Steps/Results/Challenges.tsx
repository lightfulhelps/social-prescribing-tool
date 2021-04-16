import React from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { getFilteredRecords } from '../../../lib/filtering';
import { useAppContext } from '../../../App';
import { useAllRecords } from '../../../lib/base';
import Loader from '../../Loader';

const Challenges: React.FC = () => {
  const { filters } = useAppContext();
  const [{ records: challengesArray, loading }] = useAllRecords<ChallengeAndObstacle>(
    'Challenges and Obstacles'
  );
  const initialCount = 3;
  const [showMore, setShowMore] = React.useState(false);

  const handleMore = () => setShowMore(!showMore);

  const filteredRecords: ChallengeAndObstacle[] = getFilteredRecords(challengesArray, filters);

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
        {loading ? (
          <Loader />
        ) : (
          <>
            {filteredRecords.slice(0, showMore ? undefined : initialCount).map((record, i) => (
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
            {filteredRecords.length > initialCount && (
              <Row className="justify-content-center">
                <Button
                  className="d-flex align-items-center text-uppercase"
                  variant="info"
                  size="lg"
                  onClick={() => handleMore()}
                >
                  View {showMore ? 'less' : 'more'}{' '}
                  {showMore ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
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
