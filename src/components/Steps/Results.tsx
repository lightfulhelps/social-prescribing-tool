import React from 'react';
import ChallengesObstacles from './Results/ChallengesObstacles';
import ServiceRecommendations from './Results/ServiceRecommendations';
import OnlineResources from './Results/OnlineResources';
import CaseStudies from './Results/CaseStudies';
import PersonaDetails from './Results/PersonaDetails';

const Results: React.FC = () => {
  return (
    <>
      <PersonaDetails />
      <ChallengesObstacles />
      <ServiceRecommendations />
      <OnlineResources />
      <CaseStudies />
    </>
  );
};

export default Results;
