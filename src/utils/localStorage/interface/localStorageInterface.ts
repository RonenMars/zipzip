export interface PersistentStorageInterface {
  getItem(key: string): string | null;
  setItem(key: string, value: unknown): void;
}
