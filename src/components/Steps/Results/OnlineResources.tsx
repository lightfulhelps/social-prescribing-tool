import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Col, Row, Button, Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { getRecords, TABLES } from '../../../lib/airtable';
import { useAppContext } from '../../../App';
import { getFilteredRecords, getSortedRecords } from '../../../lib/filtering';
import Loader from '../../Loader';
import ResultCard from './ResultCard';

const OnlineResources: React.FC = () => {
  const { filters } = useAppContext();
  const { isLoading, data: onlineResources } = useQuery<OnlineResource[]>(
    TABLES.ONLINE_RESOURCES,
    () => getRecords(TABLES.ONLINE_RESOURCES)
  );
  const perPage = 6;
  const [displayCount, setDisplayCount] = useState(6);
  const filteredRecords: OnlineResource[] = getFilteredRecords(onlineResources, filters);
  const sortedRecords: OnlineResource[] = getSortedRecords(filteredRecords, filters);

  useEffect(() => {
    setDisplayCount(perPage);
  }, [filters]);

  if (!isLoading && filteredRecords.length === 0) return null;

  return (
    <div className="py-4" style={{ backgroundColor: '#F9F4F9' }}>
      <Container>
        <h3 className="h4 mb-4 text-uppercase">Suggested Online Resources</h3>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Row>
              {sortedRecords.slice(0, displayCount).map((item: any) => (
                <Col md={6} lg={4} className="mb-2 mb-lg-4" key={item.id}>
                  <ResultCard
                    title={item.fields['Name']}
                    body={item.fields['Description']}
                    ctaText="Open link"
                    link={item.fields['Link']}
                  />
                </Col>
              ))}
            </Row>
            {filteredRecords.length > displayCount && (
              <div className="d-flex justify-content-center">
                <Button
                  className="d-flex btn-block justify-content-center w-lg-auto align-items-center text-uppercase"
                  variant="info"
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

export default OnlineResources;
