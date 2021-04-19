import faker from 'faker';
import { getFilteredRecords, getMatchingFilterCount, getSortedRecords } from './filtering';

describe('getFilteredRecords', () => {
  it('should return records that match one filter id', () => {
    const femaleFilterId = faker.datatype.uuid();
    const maleFilterId = faker.datatype.uuid();
    const filters = [
      {
        key: 'Gender',
        id: femaleFilterId,
        name: 'Female',
      },
    ];
    const records = [
      {
        id: faker.datatype.uuid(),
        fields: {
          Gender: [femaleFilterId, faker.datatype.uuid()],
        },
      },
      {
        id: faker.datatype.uuid(),
        fields: {
          Gender: [faker.datatype.uuid(), maleFilterId],
        },
      },
    ];

    expect(getFilteredRecords(records, filters)).toEqual([records[0]]);
  });

  it('should return records that match any filter id', () => {
    const issue1FilterId = faker.datatype.uuid();
    const issue2FilterId = faker.datatype.uuid();
    const issue3FilterId = faker.datatype.uuid();
    const filters = [
      {
        key: 'Issues',
        id: issue1FilterId,
        name: 'Money Issues',
      },
      {
        key: 'Issues',
        id: issue2FilterId,
        name: 'Legal Issues',
      },
      {
        key: 'Issues',
        id: issue3FilterId,
        name: 'Computer Skills',
      },
    ];
    const records = [
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [issue1FilterId, faker.datatype.uuid()],
        },
      },
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [faker.datatype.uuid(), issue2FilterId],
        },
      },
    ];

    expect(getFilteredRecords(records, filters)).toEqual([records[0], records[1]]);
  });
});

describe('getMatchingFilterCount', () => {
  it('should return number of matching filters for a record', () => {
    const filter1Id = faker.datatype.uuid();
    const filter2Id = faker.datatype.uuid();
    const filter3Id = faker.datatype.uuid();
    const filters = [
      {
        key: 'Gender',
        id: filter1Id,
        name: 'Female',
      },
      {
        key: 'Issues',
        id: filter2Id,
        name: 'Legal Issues',
      },
      {
        key: 'Age Range',
        id: filter3Id,
        name: '18-24',
      },
    ];
    const record = {
      id: faker.datatype.uuid(),
      fields: {
        Gender: [filter1Id, faker.datatype.uuid()],
        Issues: [filter2Id, faker.datatype.uuid(), faker.datatype.uuid()],
        'Age Range': [filter3Id],
      },
    };

    expect(getMatchingFilterCount(record, filters)).toEqual(3);
  });
});

describe('getSortedRecords', () => {
  it('should sort records by number of matching filters', () => {
    const filter1Id = faker.datatype.uuid();
    const filter2Id = faker.datatype.uuid();
    const filter3Id = faker.datatype.uuid();
    const filters = [
      {
        key: 'Gender',
        id: filter1Id,
        name: 'Female',
      },
      {
        key: 'Issues',
        id: filter2Id,
        name: 'Legal Issues',
      },
      {
        key: 'Age Range',
        id: filter3Id,
        name: '18-24',
      },
    ];
    const records = [
      {
        id: faker.datatype.uuid(),
        name: 'One',
        // One matching filter
        fields: {
          Gender: [filter1Id],
          Issues: [faker.datatype.uuid(), faker.datatype.uuid()],
          'Age Range': [faker.datatype.uuid()],
        },
      },
      {
        id: faker.datatype.uuid(),
        name: 'Three',
        // Three matching filters
        fields: {
          Gender: [filter1Id, faker.datatype.uuid()],
          Issues: [filter2Id, faker.datatype.uuid(), faker.datatype.uuid()],
          'Age Range': [filter3Id],
        },
      },
      {
        id: faker.datatype.uuid(),
        name: 'Two',
        // Two matching filters
        fields: {
          Gender: [filter1Id, faker.datatype.uuid()],
          Issues: [faker.datatype.uuid(), faker.datatype.uuid()],
          'Age Range': [filter3Id],
        },
      },
    ];

    expect(getSortedRecords(records, filters)).toEqual([records[1], records[2], records[0]]);
  });
});
