import { describe, it, expect, beforeAll } from 'vitest';
import { encryptSecret, decryptSecret, maskApiKey } from '@/lib/encryption';

beforeAll(() => {
  process.env.ENCRYPTION_KEY = 'test-encryption-key-32-chars-long!';
});

describe('encryption', () => {
  it('should encrypt and decrypt a secret', () => {
    const secret = 'sk-test-api-key-12345';
    const encrypted = encryptSecret(secret);
    const decrypted = decryptSecret(encrypted);
    expect(decrypted).toBe(secret);
  });

  it('should produce different ciphertexts for same input', () => {
    const secret = 'same-secret';
    const encrypted1 = encryptSecret(secret);
    const encrypted2 = encryptSecret(secret);
    expect(encrypted1).not.toBe(encrypted2);
  });

  it('should throw on invalid encrypted format', () => {
    expect(() => decryptSecret('invalid')).toThrow();
  });
});

describe('maskApiKey', () => {
  it('should mask a long key', () => {
    const masked = maskApiKey('sk-1234567890abcdef');
    expect(masked).toBe('sk-1****cdef');
  });

  it('should mask a short key', () => {
    const masked = maskApiKey('short');
    expect(masked).toBe('****');
  });

  it('should handle exactly 8 chars', () => {
    const masked = maskApiKey('12345678');
    expect(masked).toBe('****');
  });

  it('should handle 9 chars', () => {
    const masked = maskApiKey('123456789');
    expect(masked).toBe('1234****6789');
  });
});
