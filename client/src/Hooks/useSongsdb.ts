import type { IDBPDatabase } from 'idb';
import { openDB } from 'idb';
import { useEffect, useState } from 'react';

const useSongsdb = () => {
  const [Loading, setLoading] = useState(false);
  const [SongsDB, setSongsDB] = useState<IDBPDatabase<any> | null>(null);
  useEffect(() => {
    async function open() {
      try {
        if (!localStorage.getItem('MusicPlayerDb')) {
          const MusicPlayerDb = await openDB('MusicPlayer', 1, {
            upgrade(db) {
              db.createObjectStore('Songs');
              db.createObjectStore('SongsMeta');
              db.createObjectStore('SongsInfo');
            },
          });
          if (MusicPlayerDb.objectStoreNames.contains('Songs')) {
            console.log('SongsDB created');

            console.log(MusicPlayerDb.objectStoreNames.contains('Songs'));

            localStorage.setItem('MusicPlayerDb', JSON.stringify('Created'));
            setSongsDB(MusicPlayerDb);
          }
        } else {
          const MusicPlayerDb = await openDB('MusicPlayer', 1);
          setSongsDB(MusicPlayerDb);
        }
      } catch (error) {
        console.log('Error opening MusicPlayerDb in useSongsdb.ts: ');
      } finally {
        setLoading(false);
      }
    }
    setLoading(true);
    open();
    return () => {
      setSongsDB(null);
    };
  }, []);

  return { SongsDB, Loading };
};

export default useSongsdb;
