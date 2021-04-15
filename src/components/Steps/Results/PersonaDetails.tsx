import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useAllRecords } from '../../../lib/base';
// import PersonaDetail from './PersonaDetail';
import female_6680_1 from '../../../assets/66-80_1.png';
import female_6680_2 from '../../../assets/66-80_2.png';
import female_6680_3 from '../../../assets/66-80_3.png';
import Loader from '../../Loader';
import DropdownWrapper from '../../DropdownWrapper';
import { useAppContext } from '../../../App';

export const imageTypes: { [key: string]: any } = {
  Female: {
    '18-25': ['', ''],
    '66-80': [female_6680_1, female_6680_2, female_6680_3],
  },
  Male: {
    '18-25': ['', ''],
  },
  Transgender: {
    '18-25': ['', ''],
  },
  Intersex: {
    '18-25': ['', ''],
  },
  'Non-binary': {
    '18-25': ['', ''],
  },
};

const PersonaDetails: React.FC = () => {
  const { clearFiltersByKey } = useAppContext();
  const [{ records: issuesArray, loading: loadingIssues }] = useAllRecords<Issue>('Issues');
  const [{ records: otherArray, loading: loadingOther }] = useAllRecords<Other>('Other');
  const [{ records: genderArray, loading: loadingGenders }] = useAllRecords<Gender>('Gender');
  const [{ records: ageArray, loading: loadingAges }] = useAllRecords<AgeRange>('Age Range');

  if (loadingIssues || loadingOther || loadingGenders || loadingAges)
    return (
      <div className="py-4">
        <Loader />
      </div>
    );

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
                options={genderArray}
                filterKey="Gender"
              />
              <FaTrash
                className="ml-1"
                onClick={() => clearFiltersByKey && clearFiltersByKey('Gender')}
              />
            </div>
          </div>
          <div className="mb-3">
            <h3 className="h5 text-uppercase">Age Range:</h3>
            <div className="d-flex align-items-center">
              <DropdownWrapper
                className="flex-fill"
                title="Age Range"
                options={ageArray}
                filterKey="Age Range"
              />
              <FaTrash
                className="ml-1"
                onClick={() => clearFiltersByKey && clearFiltersByKey('Age Range')}
              />
            </div>
          </div>
          <div className="mb-3">
            <h3 className="h5 text-uppercase">Issues:</h3>
            <div className="d-flex align-items-center">
              <DropdownWrapper
                className="flex-fill"
                title="Issues"
                options={issuesArray}
                filterKey="Issues"
              />
              <FaTrash
                className="ml-1"
                onClick={() => clearFiltersByKey && clearFiltersByKey('Issues')}
              />
            </div>
          </div>
        </Col>
        <Col>
          <Row>
            <Col className="d-flex">
              {/* {choices.gender && choices.age ? (
              imageTypes[choices.gender][choices.age].map((item: any) => (
                <Figure.Image width={188} height={186} alt="171x180" src={item} />
              ))
            ) : (
              <>
                <Figure.Image width={188} height={186} alt="171x180" src={default_1} />
                <Figure.Image width={188} height={186} alt="171x180" src={default_2} />
                <Figure.Image width={188} height={186} alt="171x180" src={default_3} />
              </>
            )} */}
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
                    options={otherArray}
                    filterKey="Other"
                  />
                  <FaTrash
                    className="ml-1"
                    onClick={() => clearFiltersByKey && clearFiltersByKey('Other')}
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
