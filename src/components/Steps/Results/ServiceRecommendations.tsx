import React, { useState } from 'react';
import { Col, Row, Button, Container, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaChevronDown, FaInfoCircle } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { useAppContext } from '../../../App';
import { getRecords, TABLES } from '../../../lib/airtable';
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

  if (!isLoading && filteredRecords.length === 0) return null;

  return (
    <div className="py-4 bg-secondary">
      <Container>
        <h3 className="h4 text-white mb-4 text-uppercase d-flex align-items-center">
          Service Recommendations{' '}
          <OverlayTrigger
            placement="right"
            delay={{ show: 200, hide: 200 }}
            overlay={(props: any) => (
              <Tooltip id="service-recommendations-tooltip" {...props}>
                These are examples that are drawn from social prescribers' experiences with helping
                people that may match this profile, but services should always be based on an
                individuals' personalised goals.
              </Tooltip>
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
                <Col lg={4} className="mb-2 mb-lg-4" key={item.id}>
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
