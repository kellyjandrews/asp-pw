import crypto from 'crypto';


/* =======================
 * HASHED PASSWORD FORMATS
 * =======================
 *
 * Version 2:
 * PBKDF2 with HMAC-SHA1, 128-bit salt, 256-bit subkey, 1000 iterations.
 * (See also: SDL crypto guidelines v5.1, Part III)
 * Format: { 0x00, salt, subkey }
 *
 * Version 3:
 * PBKDF2 with HMAC-SHA256, 128-bit salt, 256-bit subkey, 10000 iterations.
 * Format: { 0x01, prf (UInt32), iter count (UInt32), salt length (UInt32), salt, subkey }
 * (All UInt32s are stored big-endian.)
 */


function validate(pw, hashPw) {
  if (!pw || !hashPw) throw 'Missing password or hash input.';

  const hashSrc = parseHash(hashPw);
  if (hashSrc.length != 49) throw 'Invalid hash.';

  // TODO add logic for v2/v3 switch here (or something else?)
  const testPw = hash(pw, hashSrc.salt);
  return testPw === hashPw;
}

function parseHash(hashPw) {
  const src = new Buffer(hashPw, 'base64');
  const v = Buffer.alloc(1);
  const salt = Buffer.alloc(16);
  const bytes = Buffer.alloc(32);
  src.copy(v,0,0,1);
  src.copy(salt,0,1,17);
  src.copy(bytes,0,17,49);
  return {
    v: v,
    salt: salt,
    bytes: bytes,
    length: src.length
  };
}

function hash(pw, salt) {
  if (!pw && !salt) throw 'No valid input.';

  const output = Buffer.alloc(49);
  const saltSrc = salt || crypto.randomBytes(16);
  const bytes = crypto.pbkdf2Sync(pw, saltSrc, 1000, 32, 'sha1');
  output.fill(0);
  saltSrc.copy(output, 1, 0, 16);
  bytes.copy(output, 17, 0, 32);

  return output.toString('base64');
}

export default {
  validate: validate,
  hash:hash
};
