import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useAllRecords } from '../../../lib/base';
// import PersonaDetail from './PersonaDetail';
import female_6680_1 from '../../../assets/66-80_1.png';
import female_6680_2 from '../../../assets/66-80_2.png';
import female_6680_3 from '../../../assets/66-80_3.png';
import Loader from '../../Loader';
import DropdownWrapper from '../../DropdownWrapper';

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
  const [{ records: issuesArray, loading: loadingIssues }] = useAllRecords('Issues');
  const [{ records: otherArray, loading: loadingOther }] = useAllRecords('Other');
  const [{ records: genderArray, loading: loadingGenders }] = useAllRecords('Gender');
  const [{ records: ageArray, loading: loadingAges }] = useAllRecords('Age Range');

  if (loadingIssues || loadingOther || loadingGenders || loadingAges) return <Loader />;

  return (
    <Container>
      <Row className="py-4">
        <Col>
          <div className="mb-3">
            <h3 className="h5 text-uppercase">Gender Identifiction:</h3>
            <DropdownWrapper title="Gender" options={genderArray} filterKey="Gender" />
          </div>
          <div className="mb-3">
            <h3 className="h5 text-uppercase">Age Range:</h3>
            <DropdownWrapper title="Age Range" options={ageArray} filterKey="Age Range" />
          </div>
          <div className="mb-3">
            <h3 className="h5 text-uppercase">Issues:</h3>
            <DropdownWrapper title="Issues" options={issuesArray} filterKey="Issues" />
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
                <DropdownWrapper title="Other" options={otherArray} filterKey="Other" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonaDetails;
