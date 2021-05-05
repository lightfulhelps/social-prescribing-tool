import React, { ReactNode } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useAppContext } from '../App';

const textOptions: { [key: number]: ReactNode } = {
  1: (
    <Row>
      <Col>
        <p className="text-lg font-weight-bold">Are you a link worker or service provider?</p>
        <p className="text-lg font-weight-bold mb-0">
          Or are you someone who is looking for community support, but you aren’t sure where to
          start?
        </p>
      </Col>
    </Row>
  ),
  2: (
    <Row>
      <Col lg={3}>
        <p className="d-none d-lg-block text-lg font-weight-bold">
          Are you a link worker or service provider?
        </p>
      </Col>
      <Col>
        <p className="d-none d-lg-block">
          Our social prescribing support tool may be useful in helping you to understand the needs,
          goals, and service suggestions of people in need. It also provides resources and case
          studies that may be of use to you.
        </p>
        <p className="mb-0">
          Just enter the characteristics of the person you are trying to help below.
        </p>
      </Col>
    </Row>
  ),
  3: (
    <Row>
      <Col lg={3}>
        <p className="d-none d-lg-block text-lg font-weight-bold">
          Are you a link worker or service provider?
        </p>
      </Col>
      <Col>
        <p className="d-none d-lg-block">
          Our social prescribing support tool may be useful in helping you to understand the needs,
          goals, and service suggestions of people in need. It also provides resources and case
          studies that may be of use to you.
        </p>
        <p className="mb-0">
          Just enter the characteristics of the person you are trying to help below.
        </p>
      </Col>
    </Row>
  ),
  4: (
    <Row>
      <Col>
        <p className="text-lg font-weight-bold">
          Below is a representation of someone who may be similar to the person in need.
        </p>
        <p className="mb-0">
          Use this profile information to help you explore what challenges someone may have, as well
          as what services may be useful for them. Relevant online resources and case studies of
          people with similar profiles are also included.
        </p>
      </Col>
    </Row>
  ),
};

const Hero: React.FC = () => {
  const { currentStep } = useAppContext();

  return (
    <section
      className="d-flex flex-column justify-content-center mb-3 mb-lg-5 w-100 text-white bg-secondary py-4 py-lg-5"
      style={{
        backgroundImage: 'linear-gradient(315deg, #8E2082 0%, #420B57 100%)',
      }}
    >
      <div className="container">
        <h1 className="h3 font-weight-bold mb-3 mb-lg-4">
          {currentStep === 1 ? 'Welcome to the ' : ''}Social Prescribing Support Tool
        </h1>
        {currentStep && textOptions[currentStep]}
      </div>
    </section>
  );
};

export default Hero;
