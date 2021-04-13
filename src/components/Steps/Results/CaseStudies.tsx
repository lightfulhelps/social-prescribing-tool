import React from 'react';
import { Card, Col, Row, Spinner, Button } from 'react-bootstrap';
import { FaChevronDown, FaPlus } from 'react-icons/fa';
import { getResults } from '../Results';
import { useAppContext } from '../../../App';
import { getAllRecords } from '../../../api/base';

export interface CaseStudiesProps {}

const CaseStudies: React.FC<CaseStudiesProps> = () => {
  const { choices } = useAppContext();
  const [caseStudiesArray, setCaseStudiesArray] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const records = await getAllRecords('Case Studies');

        setCaseStudiesArray(records);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchData();
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
          <h3 className="h5">Case Studies</h3>
          <p>
            These case studies are what’s worked or hasn’t worked for people matching this profile.
          </p>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            className="border-info text-info d-block text-uppercase"
            variant="white"
            onClick={() => window.open('https://forms.gle/6FnfyjR8E1my6taeA')}
          >
            <FaPlus /> Add New Case Study
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {getResults({ data: caseStudiesArray, type: 'Name', choices })
            .slice(0, 1)
            .map((item: any) => (
              <Card key={item.id} className="my-4">
                <Card.Header as="h5">{item.fields['Name']}</Card.Header>
                <Card.Body>
                  <Row className="mb-4">
                    <Col>
                      <Card>
                        <Card.Header as="h5">Beneficiary Profile</Card.Header>
                        <Card.Body>
                          <Card.Text>{item.fields['Beneficiary profile']}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      <Card>
                        <Card.Header as="h5">Agreed Action Plan</Card.Header>
                        <Card.Body>
                          <Card.Text>{item.fields['Agreed action plan']}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col>
                      <Card>
                        <Card.Header as="h5">What's Helped Them</Card.Header>
                        <Card.Body>
                          <Card.Text>{item.fields[`What's helped`]}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      <Card>
                        <Card.Header as="h5">What Didn't Help Them</Card.Header>
                        <Card.Body>
                          <Card.Text>{item.fields[`What didn't help`]}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
        </Col>
      </Row>
      {getResults({ data: caseStudiesArray, type: 'Name', choices }).length > 3 && (
        <Row className="justify-content-center">
          {!showMore ? (
            <Button className="text-uppercase" variant="info" onClick={() => handleMore()}>
              View More <FaChevronDown />
            </Button>
          ) : (
            <Button className="text-uppercase" variant="info" onClick={() => handleMore()}>
              View Less <FaChevronDown />
            </Button>
          )}
        </Row>
      )}
    </div>
  );
};

export default CaseStudies;
