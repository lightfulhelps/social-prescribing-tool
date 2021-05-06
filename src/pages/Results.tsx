import React from 'react';
import ChallengesObstacles from '../components/Results/ChallengesObstacles';
import ServiceRecommendations from '../components/Results/ServiceRecommendations';
import OnlineResources from '../components/Results/OnlineResources';
import CaseStudies from '../components/Results/CaseStudies';
import PersonaDetails from '../components/Results/PersonaDetails';

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
