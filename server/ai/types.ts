export interface GenerationRequest {
  prompt: string;
  negativePrompt?: string;
  parameters: Record<string, unknown>;
  modelId: string;
}

export interface GenerationResult {
  status: 'QUEUED' | 'RUNNING' | 'SUCCEEDED' | 'FAILED';
  resultUrls?: string[];
  errorMessage?: string;
}

export interface AiGenerationProvider {
  name: string;
  submitGeneration(request: GenerationRequest): Promise<{ externalId: string }>;
  getGenerationStatus(externalId: string): Promise<GenerationResult>;
  cancelGeneration(externalId: string): Promise<void>;
}
