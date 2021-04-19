import Airtable from 'airtable';

export const TABLES = {
  CHALLENGES_OBSTACLES: 'Challenges and Obstacles',
  SERVICE_RECOMMENDATIONS: 'Service Recommendations',
  ONLINE_RESOURCES: 'Online Resources',
  CASE_STUDIES: 'Case Studies',
  GENDER: 'Gender',
  AGE_RANGE: 'Age Range',
  ISSUES: 'Issues',
  OTHER: 'Other',
};

const base = new Airtable({ apiKey: 'key2sUvzA3EGk3CmW' }).base('applU9raIsearnjBM');

export const getRecords = (table: string, view: string = 'Grid view'): Promise<any[]> => {
  let all: any[] = [];

  return new Promise((resolve, reject) => {
    base(table)
      .select({ view })
      .eachPage(
        (records, fetchNextPage) => {
          all = [...all, ...records.map((record) => record._rawJson)];
          fetchNextPage();
        },
        (error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(all);
        }
      );
  });
};

export default base;
