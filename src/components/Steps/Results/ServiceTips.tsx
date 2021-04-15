import React from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useAppContext } from '../../../App';
import { useAllRecords } from '../../../lib/base';
import Loader from '../../Loader';
import { getFilteredRecords } from '../Results';
import ResultCard from './ResultCard';

const ServiceTips: React.FC = () => {
  const { filters } = useAppContext();
  const [{ records: servicesArray, loading }] = useAllRecords('Service Recommendations');
  const initialCount = 6;
  const [showMore, setShowMore] = React.useState(false);

  const handleMore = () => setShowMore(!showMore);

  const filteredRecords = getFilteredRecords(servicesArray, filters);

  return (
    <div className="py-4 bg-secondary">
      <Container>
        <h3 className="h4 text-white mb-4 text-uppercase">Service Tips</h3>
        {loading ? (
          <Loader variant="white" />
        ) : (
          <>
            <Row>
              {filteredRecords.slice(0, showMore ? undefined : initialCount).map((item: any) => (
                <Col lg={4} className="mb-4" key={item.id}>
                  <ResultCard
                    title={item.fields['Select']}
                    body={item.fields['Description']}
                    ctaText="Read more"
                    link={item.fields['Link']}
                  />
                </Col>
              ))}
            </Row>
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

export default ServiceTips;
