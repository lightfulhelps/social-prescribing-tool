import React, { useState } from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { useAppContext } from '../../../App';
import { getRecords, TABLES } from '../../../lib/base';
import Loader from '../../Loader';
import { getFilteredRecords, getSortedRecords } from '../../../lib/filtering';
import ResultCard from './ResultCard';

const ServiceTips: React.FC = () => {
  const { filters } = useAppContext();
  const { isLoading, data: serviceRecommendations } = useQuery<ServiceRecommendation[]>(
    TABLES.SERVICE_RECOMMENDATIONS,
    () => getRecords(TABLES.SERVICE_RECOMMENDATIONS)
  );
  const perPage = 6;
  const [displayCount, setDisplayCount] = useState(6);
  const filteredRecords: ServiceRecommendation[] = getFilteredRecords(
    serviceRecommendations,
    filters
  );
  const sortedRecords: ServiceRecommendation[] = getSortedRecords(filteredRecords, filters);

  return (
    <div className="py-4 bg-secondary">
      <Container>
        <h3 className="h4 text-white mb-4 text-uppercase">Service Tips</h3>
        {isLoading ? (
          <Loader variant="white" />
        ) : (
          <>
            <Row>
              {sortedRecords.slice(0, displayCount).map((item: any) => (
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

export default ServiceTips;
