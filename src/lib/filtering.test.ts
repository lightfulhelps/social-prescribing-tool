import faker from 'faker';
import { getFilteredRecords, getMatchingFilterCount, getSortedRecords } from './filtering';

describe('getFilteredRecords', () => {
  it('should filter by Issues', () => {
    const issue1Id = faker.datatype.uuid();
    const issue2Id = faker.datatype.uuid();
    const filters = [
      {
        key: 'Issues',
        id: issue1Id,
      },
      {
        key: 'Issues',
        id: issue2Id,
      },
    ];
    const records = [
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [issue1Id, faker.datatype.uuid()],
        },
      },
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [faker.datatype.uuid()],
        },
      },
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [faker.datatype.uuid(), issue2Id],
        },
      },
    ];

    expect(getFilteredRecords(records, filters)).toEqual([records[0], records[2]]);
  });

  it('should filter by Issues and then Gender if specified', () => {
    const issue1Id = faker.datatype.uuid();
    const issue2Id = faker.datatype.uuid();
    const genderId = faker.datatype.uuid();
    const filters = [
      {
        key: 'Issues',
        id: issue1Id,
      },
      {
        key: 'Issues',
        id: issue2Id,
      },
      {
        key: 'Gender',
        id: genderId,
      },
    ];
    const records = [
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [issue1Id, faker.datatype.uuid()],
        },
      },
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [faker.datatype.uuid()],
        },
      },
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [faker.datatype.uuid(), issue2Id],
          Gender: [genderId],
        },
      },
    ];

    expect(getFilteredRecords(records, filters)).toEqual([records[2]]);
  });

  it('should filter by Issues and then Age Range if specified', () => {
    const issue1Id = faker.datatype.uuid();
    const issue2Id = faker.datatype.uuid();
    const ageRangeId = faker.datatype.uuid();
    const filters = [
      {
        key: 'Issues',
        id: issue1Id,
      },
      {
        key: 'Issues',
        id: issue2Id,
      },
      {
        key: 'Age Range',
        id: ageRangeId,
      },
    ];
    const records = [
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [issue1Id, faker.datatype.uuid()],
          'Age Range': [ageRangeId],
        },
      },
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [faker.datatype.uuid()],
        },
      },
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [faker.datatype.uuid(), issue2Id],
        },
      },
    ];

    expect(getFilteredRecords(records, filters)).toEqual([records[0]]);
  });

  it('should filter by Issues and then Other if specified', () => {
    const issue1Id = faker.datatype.uuid();
    const issue2Id = faker.datatype.uuid();
    const otherId = faker.datatype.uuid();
    const filters = [
      {
        key: 'Issues',
        id: issue1Id,
      },
      {
        key: 'Issues',
        id: issue2Id,
      },
      {
        key: 'Other',
        id: otherId,
      },
    ];
    const records = [
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [issue1Id, faker.datatype.uuid()],
        },
      },
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [faker.datatype.uuid(), issue2Id],
          Other: [otherId],
        },
      },
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [faker.datatype.uuid()],
        },
      },
    ];

    expect(getFilteredRecords(records, filters)).toEqual([records[1]]);
  });

  it('should exclude records that have an Other attribute if no Other filter', () => {
    const issue1Id = faker.datatype.uuid();
    const issue2Id = faker.datatype.uuid();
    const otherId = faker.datatype.uuid();
    const filters = [
      {
        key: 'Issues',
        id: issue1Id,
      },
      {
        key: 'Issues',
        id: issue2Id,
      },
    ];
    const records = [
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [issue1Id, faker.datatype.uuid()],
        },
      },
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [faker.datatype.uuid(), issue2Id],
          Other: [otherId],
        },
      },
      {
        id: faker.datatype.uuid(),
        fields: {
          Issues: [faker.datatype.uuid()],
        },
      },
    ];

    expect(getFilteredRecords(records, filters)).toEqual([records[0]]);
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
