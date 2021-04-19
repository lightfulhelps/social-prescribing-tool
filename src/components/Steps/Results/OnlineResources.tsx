import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Col, Row, Button, Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { getRecords, TABLES } from '../../../lib/base';
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
  const initialCount = 6;
  const [showMore, setShowMore] = useState(false);

  const handleMore = () => setShowMore(!showMore);

  const filteredRecords: OnlineResource[] = getFilteredRecords(onlineResources, filters);
  const sortedRecords: OnlineResource[] = getSortedRecords(filteredRecords, filters);

  return (
    <div className="py-4" style={{ backgroundColor: '#F9F4F9' }}>
      <Container>
        <h3 className="h4 mb-4 text-uppercase">Suggested Online Resources</h3>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Row>
              {sortedRecords.slice(0, showMore ? undefined : initialCount).map((item: any) => (
                <Col lg={4} className="mb-4" key={item.id}>
                  <ResultCard
                    title={item.fields['Name']}
                    body={item.fields['Description']}
                    ctaText="Open link"
                    link={item.fields['Link']}
                  />
                </Col>
              ))}
            </Row>
            {filteredRecords.length > initialCount && (
              <Row className="justify-content-center">
                <Button
                  className="d-flex align-items-center text-uppercase"
                  variant="info"
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

export default OnlineResources;
