import { GetStorage } from '@/data/protocols/cache';
import { objectElement } from './mock-http';

export class GetStorageSpy implements GetStorage {
  key: string;
  value = objectElement;
  get(key: string): any {
    this.key = key;
    return this.value;
  }
}
