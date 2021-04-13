import React from 'react';
import { Card, CardColumns, Col, Row, Spinner, Button } from 'react-bootstrap';
import { FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';
import { useAppContext } from '../../../App';
import { useAllRecords } from '../../../api/base';
import { getResults } from '../Results';

export interface ServiceTipsProps {}

const ServiceTips: React.FC<ServiceTipsProps> = () => {
  const { choices } = useAppContext();
  const [{ records: serviceArray, loading }] = useAllRecords('Service Recommendations');
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
          <h3 className="h5">Service Tips</h3>
          <CardColumns>
            {getResults({ data: serviceArray, type: 'Description', choices })
              .slice(0, 6)
              .map((item: any) => (
                <Card key={item.id} style={{ height: '220px' }}>
                  <Card.Body>
                    <Card.Title>{item.fields['Select']}</Card.Title>
                    <Card.Text>{item.fields['Description']}</Card.Text>
                    {item.fields['Link'] && (
                      <Card.Link href={item.fields['Link']} target="_blank">
                        Read More <FaExternalLinkAlt />
                      </Card.Link>
                    )}
                  </Card.Body>
                </Card>
              ))}
            {showMore &&
              getResults({ data: serviceArray, type: 'Description', choices })
                .slice(6)
                .map(
                  (item: any) =>
                    item.fields['Link'] && (
                      <Card style={{ height: '220px' }}>
                        <Card.Body>
                          <Card.Title>{item.fields['Select']}</Card.Title>
                          <Card.Text>{item.fields['Description']}</Card.Text>
                          <Card.Link href={item.fields['Link']} target="_blank">
                            Read More <FaExternalLinkAlt />
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    )
                )}
          </CardColumns>
        </Col>
      </Row>
      {getResults({ data: serviceArray, type: 'Description', choices }).length > 3 && (
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

export default ServiceTips;
