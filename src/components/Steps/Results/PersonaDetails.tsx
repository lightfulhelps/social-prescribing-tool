import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useAllRecords } from '../../../lib/base';
import Loader from '../../Loader';
import DropdownWrapper from '../../DropdownWrapper';
import { useAppContext } from '../../../App';
import { FILTER_KEYS } from '../../../lib/filtering';
import PersonaImages from './PersonaImages';

const PersonaDetails: React.FC = () => {
  const { clearFiltersByKey } = useAppContext();
  const [{ records: issues, loading: loadingIssues }] = useAllRecords<Issue>(FILTER_KEYS.ISSUE);
  const [{ records: genders, loading: loadingGenders }] = useAllRecords<Gender>(FILTER_KEYS.GENDER);
  const [{ records: ages, loading: loadingAges }] = useAllRecords<AgeRange>(FILTER_KEYS.AGE);
  const [{ records: others, loading: loadingOther }] = useAllRecords<Other>(FILTER_KEYS.OTHER);

  if (loadingIssues || loadingOther || loadingGenders || loadingAges) {
    return (
      <div className="py-4">
        <Loader />
      </div>
    );
  }

  return (
    <Container>
      <Row className="py-4">
        <Col>
          <div className="mb-3">
            <h3 className="h5 text-uppercase">Gender Identifiction:</h3>
            <div className="d-flex align-items-center">
              <DropdownWrapper
                className="flex-fill"
                title="Gender"
                options={genders}
                filterKey="Gender"
              />
              <FaTrash
                className="ml-1"
                onClick={() => clearFiltersByKey && clearFiltersByKey(FILTER_KEYS.GENDER)}
              />
            </div>
          </div>
          <div className="mb-3">
            <h3 className="h5 text-uppercase">Age Range:</h3>
            <div className="d-flex align-items-center">
              <DropdownWrapper
                className="flex-fill"
                title="Age Range"
                options={ages}
                filterKey="Age Range"
              />
              <FaTrash
                className="ml-1"
                onClick={() => clearFiltersByKey && clearFiltersByKey(FILTER_KEYS.AGE)}
              />
            </div>
          </div>
          <div className="mb-3">
            <h3 className="h5 text-uppercase">Issues:</h3>
            <div className="d-flex align-items-center">
              <DropdownWrapper
                className="flex-fill"
                title="Issues"
                options={issues}
                filterKey="Issues"
              />
              <FaTrash
                className="ml-1"
                onClick={() => clearFiltersByKey && clearFiltersByKey(FILTER_KEYS.ISSUE)}
              />
            </div>
          </div>
        </Col>
        <Col>
          <Row>
            <Col className="d-flex">
              <PersonaImages />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="mb-3">
                <h3 className="h5 text-uppercase">Other characteristics:</h3>
                <div className="d-flex align-items-center">
                  <DropdownWrapper
                    className="flex-fill"
                    title="Other"
                    options={others}
                    filterKey="Other"
                  />
                  <FaTrash
                    className="ml-1"
                    onClick={() => clearFiltersByKey && clearFiltersByKey(FILTER_KEYS.OTHER)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonaDetails;
