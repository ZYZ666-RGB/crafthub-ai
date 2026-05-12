import { AiGenerationProvider } from './types';
import { MockProvider } from './providers/mock';

const providers = new Map<string, AiGenerationProvider>();

// Register default providers
providers.set('mock', new MockProvider());

export function getProvider(name: string): AiGenerationProvider | undefined {
  return providers.get(name);
}

export function listProviders(): string[] {
  return Array.from(providers.keys());
}

export function registerProvider(name: string, provider: AiGenerationProvider) {
  providers.set(name, provider);
}
