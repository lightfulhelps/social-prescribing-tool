import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Col, Row, Button, Container } from 'react-bootstrap';
import { useAllRecords } from '../../../lib/base';
import { useAppContext } from '../../../App';
import { getFilteredRecords } from '../Results';
import Loader from '../../Loader';
import ResultCard from './ResultCard';

const OnlineResources: React.FC = () => {
  const { filters } = useAppContext();
  const [{ records: resourcesArray, loading }] = useAllRecords<OnlineResource>('Online Resources');
  const initialCount = 6;
  const [showMore, setShowMore] = React.useState(false);

  const handleMore = () => setShowMore(!showMore);

  const filteredRecords: OnlineResource[] = getFilteredRecords(resourcesArray, filters);

  return (
    <div className="py-4" style={{ backgroundColor: '#F9F4F9' }}>
      <Container>
        <h3 className="h4 mb-4 text-uppercase">Suggested Online Resources</h3>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Row>
              {filteredRecords.slice(0, showMore ? undefined : initialCount).map((item: any) => (
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
