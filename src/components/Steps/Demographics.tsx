import React from 'react';
import { Col, Row, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { useAllRecords } from '../../lib/base';
import CardWrapper from '../CardWrapper';
import DropdownWrapper from '../DropdownWrapper';
import { FaInfoCircle } from 'react-icons/fa';
import Loader from '../Loader';

export type Demographic = {
  id: 'string';
  fields: {
    Name: string;
    'Case Studies': Array<string>;
    'Challenges and Obstacles': Array<string>;
    'Case ': Array<string>;
    Resources: Array<string>;
    'Service Recommendations': Array<string>;
    Image: {
      url: string;
    }[];
  };
};

const Demographics: React.FC = () => {
  const [{ records: demographicsArray, loading: loadingDemographics }] = useAllRecords('Other');
  const [{ records: genderArray, loading: loadingGenders }] = useAllRecords('Gender');
  const [{ records: ageArray, loading: loadingAges }] = useAllRecords('Age Range');

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Always consider the appropriateness of service suggestions in relation to chracteristics that
      someone in need may have.
    </Tooltip>
  );

  if (loadingDemographics || loadingGenders || loadingAges) return <Loader />;

  return (
    <>
      <Row>
        <Col className="mb-3">
          <p>
            <strong>Optionally</strong> add any demographic information about the person in need to
            potentially see more specific support information, then click next.{' '}
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <FaInfoCircle />
            </OverlayTrigger>
          </p>
          <p className="mb-0">If you don’t want to or nothing applies, just click next.</p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col lg={4}>
          <Form.Label className="font-weight-bold text-uppercase">
            Gender identification:
          </Form.Label>
          <DropdownWrapper title="Please select..." options={genderArray} filterKey="Gender" />
        </Col>
        <Col lg={4}>
          <Form.Label className="font-weight-bold text-uppercase">Age range:</Form.Label>
          <DropdownWrapper title="Please select..." options={ageArray} filterKey="Age Range" />
        </Col>
      </Row>
      <Row>
        {demographicsArray.map((demographic) => (
          <Col lg={4} className="mb-4" key={demographic.id}>
            <CardWrapper filterKey="Other" item={demographic} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Demographics;
