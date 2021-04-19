import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Card, Col, Row, Button, Container } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';
import { getFilteredRecords, getSortedRecords } from '../../../lib/filtering';
import { useAppContext } from '../../../App';
import { getRecords, TABLES } from '../../../lib/base';
import Loader from '../../Loader';

const CaseStudies: React.FC = () => {
  const { filters } = useAppContext();
  const { isLoading, data: caseStudies } = useQuery<CaseStudy[]>(TABLES.CASE_STUDIES, () =>
    getRecords(TABLES.CASE_STUDIES)
  );
  const initialCount = 1;
  const [showMore, setShowMore] = useState(false);

  const handleMore = () => setShowMore(!showMore);

  const filteredRecords: CaseStudy[] = getFilteredRecords(caseStudies, filters);
  const sortedRecords: CaseStudy[] = getSortedRecords(filteredRecords, filters);

  return (
    <div className="py-4 bg-secondary">
      <Container>
        <Row className="mb-3">
          <Col lg={8}>
            <h3 className="h4 text-white text-uppercase">Case Studies</h3>
            <p className="text-white">
              These case studies are what’s worked or hasn’t worked for people matching this
              profile.
            </p>
          </Col>
          <Col lg={4} className="d-flex justify-content-end align-items-start">
            <Button
              className="d-flex align-items-center text-uppercase bg-white"
              variant="white"
              size="lg"
              onClick={() => window.open('https://forms.gle/6FnfyjR8E1my6taeA')}
            >
              Add New Case Study <FaPlus className="ml-1" />
            </Button>
          </Col>
        </Row>
        {isLoading ? (
          <Loader variant="white" />
        ) : (
          <>
            {sortedRecords.slice(0, showMore ? undefined : initialCount).map((item: any) => (
              <Card key={item.id} className="border-0 mb-3">
                <Card.Header
                  className="border-0 text-white h5 mb-0"
                  style={{ backgroundColor: '#420B57' }}
                >
                  {item.fields['Name']}
                </Card.Header>
                <Card.Body>
                  <Row>
                    {item.fields['Beneficiary profile'] && (
                      <Col lg={6} className="mb-3">
                        <Card className="border-0 h-100" style={{ backgroundColor: '#F9F4F9' }}>
                          <Card.Header
                            className="border-0 text-white h5 mb-0"
                            style={{ backgroundColor: '#420B57' }}
                          >
                            Beneficiary Profile
                          </Card.Header>
                          <Card.Body>
                            <Card.Text>{item.fields['Beneficiary profile']}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                    {item.fields['Agreed action plan'] && (
                      <Col lg={6} className="mb-3">
                        <Card className="border-0 h-100" style={{ backgroundColor: '#F9F4F9' }}>
                          <Card.Header
                            className="border-0 text-white h5 mb-0"
                            style={{ backgroundColor: '#420B57' }}
                          >
                            Agreed Action Plan
                          </Card.Header>
                          <Card.Body>
                            <Card.Text>{item.fields['Agreed action plan']}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                    {item.fields[`What's helped`] && (
                      <Col lg={6} className="mb-3">
                        <Card className="border-0 h-100" style={{ backgroundColor: '#F9F4F9' }}>
                          <Card.Header
                            className="border-0 text-white h5 mb-0"
                            style={{ backgroundColor: '#420B57' }}
                          >
                            What's Helped Them
                          </Card.Header>
                          <Card.Body>
                            <Card.Text>{item.fields[`What's helped`]}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                    {item.fields[`What didn't help`] && (
                      <Col lg={6} className="mb-3">
                        <Card className="border-0 h-100" style={{ backgroundColor: '#F9F4F9' }}>
                          <Card.Header
                            className="border-0 text-white h5 mb-0"
                            style={{ backgroundColor: '#420B57' }}
                          >
                            What Didn't Help Them
                          </Card.Header>
                          <Card.Body>
                            <Card.Text>{item.fields[`What didn't help`]}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            ))}
            {filteredRecords.length > initialCount && (
              <Row className="justify-content-center">
                <Button
                  className="d-flex align-items-center text-uppercase bg-white"
                  variant="white"
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

export default CaseStudies;
