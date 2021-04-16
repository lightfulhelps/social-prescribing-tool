import React from 'react';
import Challenges from './Results/Challenges';
import ServiceTips from './Results/ServiceTips';
import OnlineResources from './Results/OnlineResources';
import CaseStudies from './Results/CaseStudies';
import PersonaDetails from './Results/PersonaDetails';

const Results: React.FC = () => {
  return (
    <>
      <PersonaDetails />
      <Challenges />
      <ServiceTips />
      <OnlineResources />
      <CaseStudies />
    </>
  );
};

export default Results;
