import sample from 'lodash/sample';
import random from 'lodash/random';
import { useAppContext } from '../../../App';
import { FILTER_KEYS } from '../../../lib/filtering';

const PersonaImages = () => {
  const { filters } = useAppContext();
  const genderFilter = filters?.find((f) => f.key === FILTER_KEYS.GENDER);
  const ageFilter = filters?.find((f) => f.key === FILTER_KEYS.AGE);
  const ageGroups = ['18-25', '26-40', '41-65', '66-80', '81+'];

  let img1;
  let img2;
  let img3;

  console.log(genderFilter, ageFilter);

  if (genderFilter && ageFilter) {
    img1 = `${genderFilter.name}_${ageFilter.name}_01.jpg`;
    img2 = `${genderFilter.name}_${ageFilter.name}_02.jpg`;
    img3 = `${genderFilter.name}_${ageFilter.name}_03.jpg`;
  } else if (genderFilter) {
    img1 = `${genderFilter.name}_${sample(ageGroups)}_01.jpg`;
    img2 = `${genderFilter.name}_${sample(ageGroups)}_02.jpg`;
    img3 = `${genderFilter.name}_${sample(ageGroups)}_03.jpg`;
  } else {
    img1 = `Female_${sample(ageGroups)}_0${random(1, 3)}.jpg`;
    img2 = `Male_${sample(ageGroups)}_0${random(1, 3)}.jpg`;
    img3 = `NonBinary_0${random(1, 6)}.jpg`;
  }

  return (
    <div className="d-flex align-items-start bg-info rounded mb-3" style={{ padding: '1px' }}>
      <img
        style={{ width: '176px', height: '176px', objectFit: 'cover', margin: '1px' }}
        src={`/images/people/${img1}`}
        alt=""
      />
      <img
        style={{ width: '176px', height: '176px', objectFit: 'cover', margin: '1px' }}
        src={`/images/people/${img2}`}
        alt=""
      />
      <img
        style={{ width: '176px', height: '176px', objectFit: 'cover', margin: '1px' }}
        src={`/images/people/${img3}`}
        alt=""
      />
    </div>
  );
};

export default PersonaImages;
