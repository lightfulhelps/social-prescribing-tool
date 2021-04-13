import React from 'react';
import { Col, Figure, Row, Spinner } from 'react-bootstrap';
import { useAppContext } from '../../../App';
import { useAllRecords } from '../../../api/base';
import PersonaDetail from './PersonaDetail';
import default_1 from '../../../assets/66-80_1.png';
import default_2 from '../../../assets/66-80_2.png';
import default_3 from '../../../assets/66-80_3.png';
import female_6680_1 from '../../../assets/66-80_1.png';
import female_6680_2 from '../../../assets/66-80_2.png';
import female_6680_3 from '../../../assets/66-80_3.png';

export interface PersonaDetailsProps {}

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

const PersonaDetails: React.FC<PersonaDetailsProps> = () => {
  const { choices } = useAppContext();
  const [{ records: issuesArray, loading: loadingIssues }] = useAllRecords('Issues');
  const [{ records: demographicsArray, loading: loadingDemographics }] = useAllRecords('Other');
  const [{ records: genderArray, loading: loadingGenders }] = useAllRecords('Gender');
  const [{ records: ageArray, loading: loadingAges }] = useAllRecords('Age Range');

  if (loadingIssues || loadingDemographics || loadingGenders || loadingAges)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  if (!choices) return <p>Error, no choices found.</p>;

  return (
    <Row className="mb-4">
      <Col>
        <PersonaDetail
          data={genderArray.filter((item: any) => item.fields.Name !== 'Any / All')}
          type="gender"
          title="Gender Identification"
        />
        <PersonaDetail data={ageArray} type="age" title="Age Range" />
        <PersonaDetail data={issuesArray} type="issues" title="Issues" multiple />
      </Col>
      <Col>
        <Row>
          <Col className="d-flex">
            {choices.gender && choices.age ? (
              imageTypes[choices.gender][choices.age].map((item: any) => (
                <Figure.Image width={188} height={186} alt="171x180" src={item} />
              ))
            ) : (
              <>
                <Figure.Image width={188} height={186} alt="171x180" src={default_1} />
                <Figure.Image width={188} height={186} alt="171x180" src={default_2} />
                <Figure.Image width={188} height={186} alt="171x180" src={default_3} />
              </>
            )}
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <PersonaDetail
              data={demographicsArray}
              type="demographics"
              title="Other Characteristics"
              multiple
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PersonaDetails;
