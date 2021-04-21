import sample from 'lodash/sample';
import random from 'lodash/random';
import { Filter, useAppContext } from '../../../App';
import { TABLES } from '../../../lib/airtable';

const ageGroups = ['18-25', '26-40', '41-65', '66-80', '81'];

const getPeopleImage = (version: number, genderFilter?: Filter, ageFilter?: Filter) => {
  let part1;
  let part2;

  if (genderFilter) {
    switch (genderFilter.name) {
      case 'Male':
        part1 = 'Male';
        break;
      case 'Female':
        part1 = 'Female';
        break;
      default:
        part1 = sample(['Male', 'Female']);
    }
  } else {
    part1 = sample(['Male', 'Female']);
  }

  if (ageFilter) {
    switch (ageFilter.name) {
      case '18-25':
        part2 = ageGroups[0];
        break;
      case '26-40':
        part2 = ageGroups[1];
        break;
      case '41-65':
        part2 = ageGroups[2];
        break;
      case '66-80':
        part2 = ageGroups[3];
        break;
      case '81+':
        part2 = ageGroups[4];
        break;
      default:
        part2 = sample(ageGroups);
    }
  } else {
    part2 = sample(ageGroups);
  }

  return `${part1}_${part2}_0${version}.jpg`;
};

const PersonaImages = () => {
  const { filters } = useAppContext();
  const genderFilter = filters?.find((f) => f.key === TABLES.GENDER);
  const ageFilter = filters?.find((f) => f.key === TABLES.AGE_RANGE);

  const img1 = getPeopleImage(1, genderFilter, ageFilter);
  const img2 = getPeopleImage(2, genderFilter, ageFilter);
  const img3 = getPeopleImage(3, genderFilter, ageFilter);

  return (
    <div className="d-flex align-items-start bg-info rounded mb-3" style={{ padding: '1px' }}>
      <img
        style={{ width: '176px', height: '164px', objectFit: 'cover', margin: '1px' }}
        src={`/images/people/${img1}`}
        alt=""
      />
      <img
        style={{ width: '176px', height: '164px', objectFit: 'cover', margin: '1px' }}
        src={`/images/people/${img2}`}
        alt=""
      />
      <img
        style={{ width: '176px', height: '164px', objectFit: 'cover', margin: '1px' }}
        src={`/images/people/${img3}`}
        alt=""
      />
    </div>
  );
};

export default PersonaImages;
