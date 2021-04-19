import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { getRecords, TABLES } from '../../../lib/base';
import Loader from '../../Loader';
import DropdownWrapper from '../../DropdownWrapper';
import { useAppContext } from '../../../App';
import PersonaImages from './PersonaImages';

const PersonaDetails: React.FC = () => {
  const { clearFiltersByKey } = useAppContext();
  const { isLoading: isLoadingIssues, data: issues } = useQuery<Issue[]>(TABLES.ISSUES, () =>
    getRecords(TABLES.ISSUES)
  );
  const { isLoading: isLoadingGenders, data: genders } = useQuery<Gender[]>(TABLES.GENDER, () =>
    getRecords(TABLES.GENDER)
  );
  const { isLoading: isLoadingAges, data: ages } = useQuery<AgeRange[]>(TABLES.AGE_RANGE, () =>
    getRecords(TABLES.AGE_RANGE)
  );
  const { isLoading: isLoadingOthers, data: others } = useQuery<Other[]>(TABLES.OTHER, () =>
    getRecords(TABLES.OTHER)
  );

  if (isLoadingIssues || isLoadingGenders || isLoadingAges || isLoadingOthers) {
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
                onClick={() => clearFiltersByKey && clearFiltersByKey(TABLES.ISSUES)}
              />
            </div>
          </div>
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
                onClick={() => clearFiltersByKey && clearFiltersByKey(TABLES.GENDER)}
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
                onClick={() => clearFiltersByKey && clearFiltersByKey(TABLES.AGE_RANGE)}
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
                    onClick={() => clearFiltersByKey && clearFiltersByKey(TABLES.OTHER)}
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
