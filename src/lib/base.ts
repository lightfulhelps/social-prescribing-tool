import Airtable from 'airtable';
import { useEffect, useState } from 'react';

const base = new Airtable({ apiKey: 'key2sUvzA3EGk3CmW' }).base('applU9raIsearnjBM');

export const getAllRecords = (table: string): Promise<any[]> => {
  let all: any[] = [];

  return new Promise((resolve, reject) => {
    base(table)
      .select({ view: 'Grid view' })
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

export const useAllRecords = <T>(table: string) => {
  const [records, setRecords] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const response = await getAllRecords(table);
        setRecords(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [table]);

  return [{ records, loading, error }];
};

export default base;
