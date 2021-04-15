import React from 'react';
import { Filter } from '../../App';
import Challenges from './Results/Challenges';
import ServiceTips from './Results/ServiceTips';
import OnlineResources from './Results/OnlineResources';
import CaseStudies from './Results/CaseStudies';
import PersonaDetails from './Results/PersonaDetails';

const ANY_AGE_ID = 'recsC15Fm61bSwfTW';
const ANY_GENDER_ID = 'rec6P9Xfy1Qg1NVGi';

export function getFilteredRecords(records: any[] = [], filters: Filter[] = []) {
  return records.filter((record) => {
    return filters.some((f) => {
      if (!record.fields[f.key]) return false;

      if (f.key === 'Gender' && record.fields.Gender.includes(ANY_GENDER_ID)) {
        return true;
      }

      if (f.key === 'Age Range' && record.fields['Age Range'].includes(ANY_AGE_ID)) {
        return true;
      }

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
