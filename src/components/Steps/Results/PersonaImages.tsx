import { useAppContext } from '../../../App';
import { TABLES } from '../../../lib/airtable';
import { getPersonaImage } from '../../../lib/images';

const PersonaImages = () => {
  const { filters } = useAppContext();
  const genderFilter = filters?.find((f) => f.key === TABLES.GENDER);
  const ageFilter = filters?.find((f) => f.key === TABLES.AGE_RANGE);
  const img1 = getPersonaImage({ version: 1, genderFilter, ageFilter });
  const img2 = getPersonaImage({ version: 2, genderFilter, ageFilter });
  const img3 = getPersonaImage({ version: 3, genderFilter, ageFilter });

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
