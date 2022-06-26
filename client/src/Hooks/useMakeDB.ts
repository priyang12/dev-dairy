import type { IDBPDatabase } from 'idb';
import { openDB } from 'idb';
import { useEffect, useState } from 'react';

const useMakeDB = () => {
  const [Loading, setLoading] = useState(false);
  const [SongsDB, setSongsDB] = useState<IDBPDatabase<any> | null>(null);
  useEffect(() => {
    async function open() {
      openDB('MusicPlayer', 1, {
        upgrade(db) {
          db.createObjectStore('Songs');
        },
      })
        .then((MusicPlayerDb) => {
          setSongsDB(MusicPlayerDb);
        })
        .finally(() => {
          setLoading(false);
        });

      //   setSongsDB(NewMusicPlayerDb);
    }
    setLoading(true);
    open();
    return () => {
      setSongsDB(null);
    };
  }, []);
  return { SongsDB, Loading };
};

export default useMakeDB;
