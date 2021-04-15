import React from 'react';
import { Filter } from '../../App';
import Challenges from './Results/Challenges';
import ServiceTips from './Results/ServiceTips';
import OnlineResources from './Results/OnlineResources';
import CaseStudies from './Results/CaseStudies';
import PersonaDetails from './Results/PersonaDetails';

export function getFilteredRecords(records: any[] = [], filters: Filter[] = []) {
  return records.filter((record) => {
    return filters.every((f) => {
      if (!record.fields[f.key]) return false;
      console.log(f.key, record.fields[f.key]);

      return record.fields[f.key].includes(f.value);
    });
  });
}

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
