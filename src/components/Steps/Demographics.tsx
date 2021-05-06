import React from 'react';
import { Col, Row, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { FaInfoCircle } from 'react-icons/fa';
import { getRecords, TABLES } from '../../lib/airtable';
import CardWrapper from '../CardWrapper';
import DropdownWrapper from '../DropdownWrapper';
import Loader from '../Loader';

const Demographics: React.FC = () => {
  const { isLoading: isLoadingGenders, data: genders } = useQuery<Gender[]>(TABLES.GENDER, () =>
    getRecords(TABLES.GENDER)
  );
  const { isLoading: isLoadingAgeRanges, data: ageRanges } = useQuery<AgeRange[]>(
    TABLES.AGE_RANGE,
    () => getRecords(TABLES.AGE_RANGE)
  );
  const { isLoading: isLoadingOthers, data: others } = useQuery<Other[]>(TABLES.OTHER, () =>
    getRecords(TABLES.OTHER)
  );

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Always consider the appropriateness of service suggestions in relation to chracteristics that
      someone in need may have.
    </Tooltip>
  );

  if (isLoadingGenders || isLoadingAgeRanges || isLoadingOthers) return <Loader />;

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
        <Col lg={4} className="mb-3 mb-lg-0">
          <Form.Label className="font-weight-bold text-uppercase">Gender:</Form.Label>
          <DropdownWrapper options={genders} filterKey={TABLES.GENDER} />
        </Col>
        <Col lg={4}>
          <Form.Label className="font-weight-bold text-uppercase">Age range:</Form.Label>
          <DropdownWrapper options={ageRanges} filterKey={TABLES.AGE_RANGE} />
        </Col>
      </Row>
      <Row>
        {others?.map((other) => (
          <Col xs={6} md={4} className="mb-4" key={other.id}>
            <CardWrapper filterKey="Other" item={other} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Demographics;
