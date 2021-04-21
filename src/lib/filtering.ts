import { Filter } from '../App';
import { TABLES } from './airtable';

export function addOrReplaceFilter(filters: Filter[], newFilter: Filter) {
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

const filterCountByKey = (filters: Filter[], key: string) =>
  filters.filter((f) => f.key === key).length;

export function addOrRemoveFilter(filters: Filter[], newFilter: Filter) {
  const filtersCopy = [...filters];

  if (filterInFilters(filtersCopy, newFilter)) {
    // Don't allow user to remove all issue filters
    if (newFilter.key === TABLES.ISSUES && filterCountByKey(filtersCopy, TABLES.ISSUES) <= 1) {
      return filtersCopy;
    }

    const index = filtersCopy.findIndex((f) => f.key === newFilter.key && f.id === newFilter.id);
    filtersCopy.splice(index, 1);
  } else {
    const limit = 3;
    const exceedingLimit = filterCountByKey(filtersCopy, newFilter.key) >= limit;

    if (!exceedingLimit) {
      filtersCopy.push({ ...newFilter });
    }
  }

  return filtersCopy;
}

function filterRecords(records: any[], filters: Filter[], key: string) {
  const filtersByKey = filters.filter((f) => f.key === key);

  return records.filter((record) => {
    return filtersByKey.some((f) => {
      if (!record.fields[key]) return false;

      // If record's gender field has "Any/All" tag then always include it
      if (
        key === TABLES.GENDER &&
        record.fields[TABLES.GENDER].includes(process.env.REACT_APP_AIRTABLE_ANY_GENDER_ID)
      ) {
        return true;
      }

      // If record's age field has "Any/All" tag then always include it
      if (
        key === TABLES.AGE_RANGE &&
        record.fields[TABLES.AGE_RANGE].includes(process.env.REACT_APP_AIRTABLE_ANY_AGE_ID)
      ) {
        return true;
      }

      return record.fields[key].includes(f.id);
    });
  });
}

const selectedFilter = (filters: Filter[], key: string) => filters.some((f) => f.key === key);

export function getFilteredRecords(records: any[] = [], filters: Filter[] = []) {
  let filteredRecords = [...records];

  // 1. Find records matching issue filters
  filteredRecords = filterRecords(filteredRecords, filters, TABLES.ISSUES);

  // 2. If a gender is selected, find records matching gender filters
  if (selectedFilter(filters, TABLES.GENDER)) {
    filteredRecords = filterRecords(filteredRecords, filters, TABLES.GENDER);
  }

  // 3. If an age range is selected, find records matching age range filters
  if (selectedFilter(filters, TABLES.AGE_RANGE)) {
    filteredRecords = filterRecords(filteredRecords, filters, TABLES.AGE_RANGE);
  }

  // 4. If an "other" filter is selected, find records matching other filters
  if (selectedFilter(filters, TABLES.OTHER)) {
    filteredRecords = filterRecords(filteredRecords, filters, TABLES.OTHER);
  } else {
    // Else no "other" filter is selected so remove records that have an "other" attribute
    filteredRecords = filteredRecords.filter((record) => {
      return !record.fields[TABLES.OTHER];
    });
  }

  return filteredRecords;
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
