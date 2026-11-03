const DB_NAME = "ragnarok-companion";
const STORE = "sound-overrides";

export type SoundOverride = { id: string; name: string; blob: Blob };

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const req = fn(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export const getOverride = (id: string) => tx<SoundOverride | undefined>("readonly", (s) => s.get(id));
export const listOverrides = () => tx<SoundOverride[]>("readonly", (s) => s.getAll());
export const putOverride = (o: SoundOverride) => tx("readwrite", (s) => s.put(o));
export const deleteOverride = (id: string) => tx("readwrite", (s) => s.delete(id));
export const clearOverrides = () => tx("readwrite", (s) => s.clear());
