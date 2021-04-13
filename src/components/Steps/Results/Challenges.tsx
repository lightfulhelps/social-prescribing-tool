import React from 'react';
import { Col, Row, Spinner, Button } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';
import ListWrapper from './ListWrapper';
import { getResults } from './Results';
import { AppContext } from '../../../App';
import base from '../../../api/base';

export interface ChallengesProps {}

const Challenges: React.FunctionComponent<ChallengesProps> = () => {
  const { choices } = React.useContext(AppContext);

  const [challengesArray, setChallengesArray] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);

  React.useEffect(() => {
    base('Challenges and Obstacles')
      .select({ view: 'Grid view' })
      .eachPage((records, fetchNextPage) => {
        setChallengesArray(records);
        fetchNextPage();
        setLoading(false);
      });
  }, []);

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
          <p className="font-weight-bold">POTENTIAL CHALLENGES &amp; OBSTACLES</p>
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
          <p className="font-weight-bold">SO CONSIDER...</p>
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
              VIEW MORE <FaChevronDown />
            </Button>
          ) : (
            <Button variant="info" onClick={() => handleMore()}>
              VIEW LESS <FaChevronDown />
            </Button>
          )}
        </Row>
      )}
    </div>
  );
};

export default Challenges;
