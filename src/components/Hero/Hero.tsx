import React, { ReactNode } from 'react';
import { Col, Row } from 'react-bootstrap';
import { HeroSection } from './Hero.styles';

export interface HeroProps {
  currentStep: number;
}

const textOptions: { [key: number]: ReactNode } = {
  1: (
    <Row>
      <Col>
        <p className="font-weight-bold">Are you a link worker or service provider?</p>
        <p className="font-weight-bold">
          Or are you someone who is looking for community support, but you aren’t sure where to
          start?
        </p>
      </Col>
    </Row>
  ),
  2: (
    <Row>
      <Col lg={3}>
        <p className="font-weight-bold">Are you a link worker or service provider?</p>
      </Col>
      <Col>
        <p className="small">
          Our social prescribing support tool may be useful in helping you to understand the needs,
          goals, and service suggestions of people in need. It also provides resources and case
          studies that may be of use to you.
        </p>
        <p className="small">
          Just enter the characteristics of the person you are trying to help below.
        </p>
      </Col>
    </Row>
  ),
  3: (
    <Row>
      <Col lg={3}>
        <p className="font-weight-bold">Are you a link worker or service provider?</p>
      </Col>
      <Col>
        <p className="small">
          Our social prescribing support tool may be useful in helping you to understand the needs,
          goals, and service suggestions of people in need. It also provides resources and case
          studies that may be of use to you.
        </p>
        <p className="small">
          Just enter the characteristics of the person you are trying to help below.
        </p>
      </Col>
    </Row>
  ),
  4: (
    <Row>
      <Col>
        <p className="font-weight-bold">
          Below is a representation of someone who may be similar to the person in need.
        </p>
        <p className="small">
          Use this profile information to help you explore what challenges someone may have, as well
          as what services may be useful for them. Relevant online resources and case studies of
          people with similar profiles are also included.
        </p>
      </Col>
    </Row>
  ),
};

const Hero: React.FunctionComponent<HeroProps> = ({ currentStep }) => {
  return (
    <HeroSection className="d-flex flex-column justify-content-center mb-5">
      <div className="container">
        <h1 className="h4 font-weight-bold mb-2">Welcome to the Social Prescribing Support Tool</h1>
        {textOptions[currentStep]}
      </div>
    </HeroSection>
  );
};

export default Hero;
