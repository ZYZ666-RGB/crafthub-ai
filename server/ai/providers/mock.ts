import { AiGenerationProvider, GenerationRequest, GenerationResult } from '../types';

// In-memory store for mock generation states
const mockStore = new Map<string, { status: string; createdAt: number }>();

export class MockProvider implements AiGenerationProvider {
  name = 'mock';

  async submitGeneration(request: GenerationRequest): Promise<{ externalId: string }> {
    const externalId = `mock_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    mockStore.set(externalId, { status: 'QUEUED', createdAt: Date.now() });

    // Simulate async processing
    setTimeout(() => {
      const entry = mockStore.get(externalId);
      if (entry && entry.status !== 'CANCELED') {
        entry.status = 'RUNNING';
      }
    }, 2000);

    setTimeout(() => {
      const entry = mockStore.get(externalId);
      if (entry && entry.status === 'RUNNING') {
        entry.status = 'SUCCEEDED';
      }
    }, 5000);

    return { externalId };
  }

  async getGenerationStatus(externalId: string): Promise<GenerationResult> {
    const entry = mockStore.get(externalId);

    if (!entry) {
      return { status: 'FAILED', errorMessage: 'Generation not found' };
    }

    const elapsed = Date.now() - entry.createdAt;

    // Simulate time-based status transitions
    let status: GenerationResult['status'];
    if (entry.status === 'CANCELED') {
      return { status: 'FAILED', errorMessage: 'Generation was canceled' };
    } else if (elapsed < 2000) {
      status = 'QUEUED';
    } else if (elapsed < 5000) {
      status = 'RUNNING';
    } else {
      status = 'SUCCEEDED';
    }

    if (status === 'SUCCEEDED') {
      return {
        status: 'SUCCEEDED',
        resultUrls: [`https://placehold.co/512x512/6d28d9/ffffff?text=Generated+${externalId.slice(-4)}`],
      };
    }

    return { status };
  }

  async cancelGeneration(externalId: string): Promise<void> {
    const entry = mockStore.get(externalId);
    if (entry) {
      entry.status = 'CANCELED';
    }
  }
}
