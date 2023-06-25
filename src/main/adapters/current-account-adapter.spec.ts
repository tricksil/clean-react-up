import { mockAccountModel } from '@/domain/test';
import { setCurrentAccountAdapter } from './current-account-adapter';
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter';
import { UnexpectedError } from '@/domain/errors';

jest.mock('@/infra/cache/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter if correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });

  test('Should throw UnexpectedError', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined);
    }).toThrow(new UnexpectedError());
  });
});
