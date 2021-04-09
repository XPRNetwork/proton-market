import { SearchCollection } from '../services/collections';

interface CacheValue<T> {
  value: T;
  updatedAt: number;
}

export class Cache<T = string> {
  cache: Map<string, CacheValue<T>>;
  maxLength: number;
  length: number;

  constructor() {
    this.cache = new Map();
    this.maxLength = 1000;
    this.length = 0;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  set(key: string, value: T): number {
    if (this.length >= this.maxLength) {
      const leastUsedKey = this.leastRecentlyUsed();
      this.delete(leastUsedKey);
    }

    if (!this.has(key)) this.length += 1;
    this.cache.set(key, {
      value,
      updatedAt: Date.now(),
    });

    return this.length;
  }

  getAllValues(): Array<T> {
    let values: Array<T> = [];
    for (const key of Array.from(this.cache.keys())) {
      const { value } = this.cache.get(key);
      values = [...values, value];
    }
    return values;
  }

  getValue(key: string): T {
    const { value } = this.cache.get(key);
    this.set(key, value);
    return value;
  }

  delete(key: string): number {
    this.length -= 1;
    this.cache.delete(key);
    return this.length;
  }

  clear(): number {
    this.length = 0;
    this.cache.clear();
    return this.length;
  }

  leastRecentlyUsed(): string {
    const leastUsedKey = Array.from(this.cache.keys()).sort(
      (a, b) => this.cache.get(a).updatedAt - this.cache.get(b).updatedAt
    )[0];
    return leastUsedKey;
  }

  getValues(keys: string[]): { [key: string]: string } {
    const cacheValue = {};

    for (const key of keys) {
      cacheValue[key] = this.getValue(key);
    }

    return cacheValue;
  }
}

export const profileCache = new Cache();
export const collectionSearchCache = new Cache<SearchCollection>();
