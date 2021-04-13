import React from 'react';
import { FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';
import { Card, CardColumns, Col, Row, Spinner, Button } from 'react-bootstrap';
import { useAllRecords } from '../../../api/base';
import { useAppContext } from '../../../App';
import { getResults } from '../Results';

export interface OnlineResourcesProps {}

const OnlineResources: React.FC<OnlineResourcesProps> = () => {
  const { choices } = useAppContext();
  const [{ records: resourcesArray, loading }] = useAllRecords('Online Resources');
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
          <h3 className="h5">Suggested Online Resources</h3>
          <CardColumns>
            {getResults({ data: resourcesArray, type: 'Name', choices })
              .slice(0, 6)
              .map((item: any) => (
                <Card key={item.id} style={{ height: '220px' }}>
                  <Card.Body>
                    <Card.Title>{item.fields['Name']}</Card.Title>
                    <Card.Text>{item.fields['Description']}</Card.Text>
                    <Card.Link href={item.fields['Link']} target="_blank">
                      OPEN LINK <FaExternalLinkAlt />
                    </Card.Link>
                  </Card.Body>
                </Card>
              ))}
          </CardColumns>
        </Col>
      </Row>
      {getResults({ data: resourcesArray, type: 'Name', choices }).length > 3 && (
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

export default OnlineResources;
