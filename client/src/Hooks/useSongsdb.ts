import type { IDBPDatabase } from 'idb';
import { openDB } from 'idb';
import { useEffect, useState } from 'react';

const useSongsdb = () => {
  const [SongsDB, setSongsDB] = useState<IDBPDatabase<any> | null>(null);
  useEffect(() => {
    async function open() {
      const MusicPlayerDb = await openDB('MusicPlayer', 1);
      if (MusicPlayerDb.objectStoreNames.contains('Songs'))
        setSongsDB(MusicPlayerDb);
    }
    open();
    return () => {
      setSongsDB(null);
    };
  }, []);

  return SongsDB;
};

export default useSongsdb;
