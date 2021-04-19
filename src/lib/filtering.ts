import { Filter } from '../App';

export const FILTER_KEYS = {
  ISSUE: 'Issues',
  GENDER: 'Gender',
  AGE: 'Age Range',
  OTHER: 'Other',
};

export function addOrReplaceFilter(filters: Filter[], newFilter: Filter): Filter[] {
  const filtersCopy = [...filters];
  const index = filtersCopy.findIndex((f) => f.key === newFilter.key);

  if (index > -1) {
    filtersCopy[index] = { ...newFilter };
  } else {
    filtersCopy.push({ ...newFilter });
  }

  return filtersCopy;
}

const filterInFilters = (filters: Filter[], newFilter: Filter) =>
  filters.some((f) => f.key === newFilter.key && f.id === newFilter.id);

export function addOrRemoveFilter(filters: Filter[], newFilter: Filter): Filter[] {
  const filtersCopy = [...filters];

  if (filterInFilters(filtersCopy, newFilter)) {
    const index = filtersCopy.findIndex((f) => f.key === newFilter.key && f.id === newFilter.id);
    filtersCopy.splice(index, 1);
  } else {
    const issueLimit = 3;
    const exceedingIssueLimit =
      newFilter.key === FILTER_KEYS.ISSUE &&
      filtersCopy.filter((f) => f.key === FILTER_KEYS.ISSUE).length >= issueLimit;

    if (!exceedingIssueLimit) {
      filtersCopy.push({ ...newFilter });
    }
  }

  return filtersCopy;
}

export const ANY_AGE_ID = 'recsC15Fm61bSwfTW';
export const ANY_GENDER_ID = 'rec6P9Xfy1Qg1NVGi';

export function getFilteredRecords(records: any[] = [], filters: Filter[] = []) {
  return records.filter((record) => {
    return filters.some((f) => {
      if (!record.fields[f.key]) return false;

      if (f.key === FILTER_KEYS.GENDER && record.fields.Gender.includes(ANY_GENDER_ID)) {
        return true;
      }

      if (f.key === FILTER_KEYS.AGE && record.fields[FILTER_KEYS.AGE].includes(ANY_AGE_ID)) {
        return true;
      }

      return record.fields[f.key].includes(f.id);
    });
  });
}

export const getMatchingFilterCount = (record: any, filters: Filter[]) => {
  let count = 0;

  filters.forEach((f) => {
    if (!record.fields[f.key]) return;

    if (record.fields[f.key].includes(f.id)) {
      count++;
    }
  });

  return count;
};

export function getSortedRecords(records: any[] = [], filters: Filter[] = []) {
  return [...records].sort((a: any, b: any) => {
    const matchingFilterCountA = getMatchingFilterCount(a, filters);
    const matchingFilterCountB = getMatchingFilterCount(b, filters);

    if (matchingFilterCountA > matchingFilterCountB) {
      return -1;
    }

    if (matchingFilterCountA < matchingFilterCountB) {
      return 1;
    }

    return 0;
  });
}
