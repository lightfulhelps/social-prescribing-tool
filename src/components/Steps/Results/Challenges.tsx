import React from 'react';
import { Col, Row, Spinner, Button } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';
import ListWrapper from './ListWrapper';
import { getResults } from '../Results';
import { useAppContext } from '../../../App';
import { useAllRecords } from '../../../api/base';

export interface ChallengesProps {}

const Challenges: React.FC<ChallengesProps> = () => {
  const { choices } = useAppContext();
  const [{ records: challengesArray, loading }] = useAllRecords('Challenges and Obstacles');
  const [showMore, setShowMore] = React.useState(false);

  const handleMore = () => setShowMore(!showMore);

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  if (!choices) return <p>Error, no choices found.</p>;

  return (
    <div className="mb-4">
      <Row>
        <Col>
          <h3 className="h5">Potential Challenges &amp; Obstacles</h3>
          <ListWrapper
            data={getResults({
              data: challengesArray,
              type: 'Challenge',
              choices,
            }).slice(0, 3)}
            type="Challenge"
          />
          {showMore && (
            <ListWrapper
              data={getResults({
                data: challengesArray,
                type: 'Challenge',
                choices,
              }).slice(3)}
              type="Challenge"
            />
          )}
        </Col>
        <Col>
          <h3 className="h5">So Consider...</h3>
          <ListWrapper
            data={getResults({
              data: challengesArray,
              type: 'Suggestion',
              choices,
            }).slice(0, 3)}
            type="Suggestion"
          />
          {showMore && (
            <ListWrapper
              data={getResults({
                data: challengesArray,
                type: 'Suggestion',
                choices,
              }).slice(3)}
              type="Suggestion"
            />
          )}
        </Col>
      </Row>
      {getResults({
        data: challengesArray,
        type: 'Suggestion',
        choices,
      }).length > 3 && (
        <Row className="justify-content-center">
          {!showMore ? (
            <Button variant="info" onClick={() => handleMore()}>
              View More <FaChevronDown />
            </Button>
          ) : (
            <Button variant="info" onClick={() => handleMore()}>
              View Less <FaChevronDown />
            </Button>
          )}
        </Row>
      )}
    </div>
  );
};

export default Challenges;
