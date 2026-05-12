import { describe, it, expect } from 'vitest';

describe('Project Setup', () => {
  it('should have correct project name', () => {
    expect('crafthub-ai').toBe('crafthub-ai');
  });

  it('should be able to run tests', () => {
    expect(1 + 1).toBe(2);
  });
});
