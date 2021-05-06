import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Container, Popover, OverlayTrigger } from 'react-bootstrap';
import { FaChevronDown, FaInfoCircle } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { useAppContext } from '../../App';
import { getRecords, TABLES } from '../../lib/airtable';
import Loader from '../Loader';
import { getFilteredRecords, getSortedRecords } from '../../lib/filtering';
import ResultCard from '../ResultCard';

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

  useEffect(() => {
    setDisplayCount(perPage);
  }, [filters]);

  if (!isLoading && filteredRecords.length === 0) return null;

  return (
    <div className="py-4 bg-secondary">
      <Container>
        <h3 className="h4 text-white mb-4 text-uppercase d-flex align-items-center">
          Service Recommendations{' '}
          <OverlayTrigger
            delay={{ show: 200, hide: 200 }}
            overlay={(props: any) => (
              <Popover id="service-recommendations-popover" {...props}>
                <Popover.Content>
                  These are examples that are drawn from social prescribers' experiences with
                  helping people that may match this profile, but services should always be based on
                  an individuals' personalised goals.
                </Popover.Content>
              </Popover>
            )}
          >
            <FaInfoCircle className="ml-1 flex-shrink-0" />
          </OverlayTrigger>
        </h3>
        {isLoading ? (
          <Loader variant="white" />
        ) : (
          <>
            <Row className="mb-2">
              {sortedRecords.slice(0, displayCount).map((item: any) => (
                <Col md={6} lg={4} className="mb-2 mb-lg-4" key={item.id}>
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
              <div className="d-flex justify-content-center">
                <Button
                  className="d-flex btn-block justify-content-center w-lg-auto align-items-center text-uppercase bg-white"
                  variant="white"
                  size="lg"
                  onClick={() => {
                    setDisplayCount(displayCount + perPage);
                  }}
                >
                  View more <FaChevronDown className="ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default ServiceTips;
