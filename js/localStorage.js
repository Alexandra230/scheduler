export class LocalStorageService {
  get(key) {
    const data = localStorage.getItem(key);
    return this.#parse(data);
  }

  set(key, value) {
    localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
  }

  remove(key) {
    if (localStorage[key]) {
      localStorage.removeItem(key);
    } else {
      console.log('Trying to remove unexisting key: ', key);
    }
  }

  #parse(value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  clear() {
    localStorage.clear();
  }
}
