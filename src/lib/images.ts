import sample from 'lodash/sample';
import { Filter } from '../App';

const ageGroups = ['18-25', '26-40', '41-65', '66-80', '81'];

export const getPersonaImage = ({
  genderFilter,
  ageFilter,
  version,
}: {
  genderFilter?: Filter;
  ageFilter?: Filter;
  version?: number;
}) => {
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

  return `${part1}_${part2}_0${version || 1}.jpg`;
};
