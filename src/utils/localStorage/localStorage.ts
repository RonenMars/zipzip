import { PersistentStorageInterface } from '@utils/localStorage/interface/localStorageInterface';

class LocalStorage implements PersistentStorageInterface {
  getItem(key: string) {
    const item = localStorage.getItem(key);

    if (item === null) return undefined;

    if (item === 'null') return null;
    if (item === 'undefined') return undefined;

    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(error);
    }
  }
  setItem(key: string, value: unknown) {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

class MockStorage implements PersistentStorageInterface {
  getItem() {
    return null;
  }
  setItem() {}
}

export const PersistentStorage = window?.localStorage ? new LocalStorage() : new MockStorage();
