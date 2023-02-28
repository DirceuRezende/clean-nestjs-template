import { NameValidator } from './name-validator';

describe('Name Validator', () => {
  it('should not accept null strings', () => {
    const name = null;
    expect(NameValidator.validate(name)).toBeFalsy();
  });

  it('should not accept name less than 2 chars', () => {
    const name = 'a';
    expect(NameValidator.validate(name)).toBeFalsy();
  });

  it('should not accept name more than 256 chars', () => {
    const name = 'a'.repeat(257);
    expect(NameValidator.validate(name)).toBeFalsy();
  });

  it('should not accept a valid name ', () => {
    const name = 'any';
    expect(NameValidator.validate(name)).toBeTruthy();
  });
});
