import password from '../asp-pw.js';

const test1 = 'developeraccount123';
const hash1 = 'AGEBXjISlvRiBbuTxweXlWDIIoPYES2iUneI+Q3PyzS4HKuffyTSv2ZK3ayeCW7v/A==';

const test2 = '11112222';
const hash2 = 'ANpvKHlv2PUXYlw+/QEe9YezO6DecDUN26yBGV/u4rAHd89gY2atI55f2RhIHBOSjw==';

const test3 = 'Password@1';

describe('Validation', () => {
  it('Throws errors when invalid input', () => {
    expect(() => {password.validate('only one input');}).toThrow();
    expect(() => {password.validate(test1, 'invalid hash');}).toThrow();
  });

  it('validates v2 compatible passwords', () => {
    expect(password.validate(test1, hash1)).toBe(true);
    expect(password.validate(test2, hash2)).toBe(true);
  });
});

describe('Hashing', () => {
  it('Throws errors when invalid input', () => {
    expect(() => {password.hash();}).toThrow();
  });
  it('Hashes password that validates', () => {
    const hash3 = password.hash(test3);
    expect(hash3).toBeTruthy();
    expect(password.validate(test3, hash3)).toBe(true);
  });
});
