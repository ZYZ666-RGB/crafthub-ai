'use client';

import { useState } from 'react';
import { Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cancelGeneration } from '@/server/actions/generations';

export function CancelGenerationButton({ generationId }: { generationId: string }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      await cancelGeneration(generationId);
    } catch (error) {
      console.error('Failed to cancel:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleCancel} disabled={loading}>
      <Ban className="mr-1 h-4 w-4" />
      {loading ? 'Canceling...' : 'Cancel'}
    </Button>
  );
}
