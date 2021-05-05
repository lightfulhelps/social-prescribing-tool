import { useMemo } from 'react';
import { useAppContext } from '../../../App';
import { TABLES } from '../../../lib/airtable';
import { getPersonaImage } from '../../../lib/images';

const PersonaImages = () => {
  const { filters } = useAppContext();
  const genderFilter = filters?.find((f) => f.key === TABLES.GENDER);
  const ageFilter = filters?.find((f) => f.key === TABLES.AGE_RANGE);
  const img1 = useMemo(() => getPersonaImage({ version: 1, genderFilter, ageFilter }), [
    genderFilter,
    ageFilter,
  ]);
  const img2 = useMemo(() => getPersonaImage({ version: 2, genderFilter, ageFilter }), [
    genderFilter,
    ageFilter,
  ]);
  const img3 = useMemo(() => getPersonaImage({ version: 3, genderFilter, ageFilter }), [
    genderFilter,
    ageFilter,
  ]);

  return (
    <div className="d-flex align-items-start bg-info rounded mb-3" style={{ padding: '1px' }}>
      <img className="persona-image" src={`/images/people/${img1}`} alt="" />
      <img className="persona-image" src={`/images/people/${img2}`} alt="" />
      <img className="persona-image" src={`/images/people/${img3}`} alt="" />
    </div>
  );
};

export default PersonaImages;
