import type { FileUploadResponse } from '@api/upload-file/types';

export interface ChunkPendingStateProps {
  status: 'pending';
  progress: number;
  progressId: string;
  file: File;
}

export interface ChunkInProgressStateProps {
  status: 'in_progress';
  progress: number;
  progressId: string;
  file: File;
}

export interface ChunkCompletedStateProps {
  status: 'completed';
  progress: number;
  progressId: string;
  response: string | FileUploadResponse;
  file: File;
}

export interface ChunkErrorStateProps {
  status: 'error';
  reason: string;
  progress: number;
  progressId: string;
  file: File;
}

export type ChunkStateProps = ChunkPendingStateProps | ChunkInProgressStateProps | ChunkCompletedStateProps | ChunkErrorStateProps;
