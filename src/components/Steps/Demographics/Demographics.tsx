import React from 'react';
import { Col, Row, Spinner, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import base from '../../../api/base';
import CardWrapper from '../../common/CardWrapper';
import placeholderImg from '../../../assets/image1.png';
import { AppContext } from '../../../App';
import DropdownWrapper from '../../common/DropdownWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export type Demographic = {
  id: 'string';
  fields: {
    Name: string;
    'Case Studies': Array<string>;
    'Challenges and Obstacles': Array<string>;
    'Case ': Array<string>;
    Resources: Array<string>;
    'Service Recommendations': Array<string>;
  };
};

export interface DemographicsProps {}

const Demographics: React.FunctionComponent<DemographicsProps> = () => {
  const { choices, setChoices } = React.useContext(AppContext);
  const [demographicsArray, setDemographicsArray] = React.useState<any>([]);
  const [genderArray, setGenderArray] = React.useState<any>([]);
  const [ageArray, setAgeArray] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    base('Other')
      .select({ view: 'Grid view' })
      .eachPage((records, fetchNextPage) => {
        setDemographicsArray(records);
        fetchNextPage();
      });
    base('Gender')
      .select({ view: 'Grid view' })
      .eachPage((records, fetchNextPage) => {
        setGenderArray(records);
        fetchNextPage();
      });
    base('Age Range')
      .select({ view: 'Grid view' })
      .eachPage((records, fetchNextPage) => {
        setAgeArray(records);
        fetchNextPage();
      });
    setLoading(false);
  }, []);

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Always consider the appropriateness of service suggestions in relation to chracteristics that
      someone in need may have.
    </Tooltip>
  );

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  return (
    <>
      <Row>
        <Col>
          <p>
            <strong>Optionally</strong> add any demographic information about the person in need to
            potentially see more specific support information, then click next.{' '}
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </OverlayTrigger>
          </p>
          <p>If you don’t want to or nothing applies, just click next.</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <Form.Label className="font-weight-bold">GENDER IDENTIFICATION:</Form.Label>
          <DropdownWrapper
            title="Please select..."
            options={genderArray
              .filter((item: any) => item.fields.Name !== 'Any / All')
              .map((item: any) => item.fields.Name)}
            hasMargin
            className="d-flex justify-content-between align-items-center"
            type="gender"
            choices={choices}
            handleChoice={setChoices}
          />
        </Col>
        <Col lg={4}>
          <Form.Label className="font-weight-bold">AGE RANGE:</Form.Label>
          <DropdownWrapper
            title="Please select..."
            options={ageArray
              .filter((item: any) => item.fields.Name !== 'Any / All')
              .map((item: any) => item.fields.Name)}
            className="d-flex justify-content-between align-items-center"
            type="age"
            choices={choices}
            handleChoice={setChoices}
          />
        </Col>
      </Row>
      <Row>
        {demographicsArray.map((demographic: any) => (
          <Col lg={4} className="mb-4" key={demographic.fields.Name}>
            <CardWrapper
              imageUrl={placeholderImg}
              item={demographic}
              choices={choices}
              setChoices={setChoices}
              type="demographics"
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Demographics;
