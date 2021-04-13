import React from 'react';
import { FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';
import { Card, CardColumns, Col, Row, Spinner, Button } from 'react-bootstrap';
import base from '../../../api/base';
import { AppContext } from '../../../App';
import { getResults } from './Results';

export interface OnlineResourcesProps {}

const OnlineResources: React.FunctionComponent<OnlineResourcesProps> = () => {
  const { choices } = React.useContext(AppContext);

  const [resourcesArray, setResourcesArray] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);

  React.useEffect(() => {
    base('Online Resources')
      .select({ view: 'Grid view' })
      .eachPage((records, fetchNextPage) => {
        setResourcesArray(records);
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
          <p className="font-weight-bold">SUGGESTED ONLINE RESOURCES</p>
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

export default OnlineResources;
