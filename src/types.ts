export interface TextModelUsage {
  aggregation_timestamp: number;
  n_requests: number;
  operation: string;
  snapshot_id: string;
  n_context: number;
  n_context_tokens_total: number;
  n_generated: number;
  n_generated_tokens_total: number;
}

export interface TextModelSnapshot {
  [key: string]: {
    tokensIn: number;
    tokensOut: number;
    cost: number;
  };
}

export interface AudioModelUsage {
  timestamp: number;
  model_id: string;
  num_seconds: number;
  num_requests: number;
}

export interface AudioModelSnapshot {
  [key: string]: {
    seconds: number;
    cost: number;
  };
}

export interface ImageModelUsage {
  timestamp: number;
  num_images: number;
  num_requests: number;
  image_size: string;
  operation: string;
}

export interface ImageModelSnapshot {
  [key: string]: {
    images: number;
    cost: number;
  };
}

export interface DayTotal {
  text?: TextModelSnapshot;
  image?: ImageModelSnapshot;
  audio?: AudioModelSnapshot;
}

interface ModelPricing {
  out: number;
}
interface TextPricing {
  [model: string]: ModelPricing & { in: number };
}

interface WhisperPricing {
  [model: string]: { out: number };
}

interface DallePricing {
  [resolution: string]: { out: number };
}

export interface OpenAiPricing {
  textPricing: TextPricing;
  whisperPricing: WhisperPricing;
  dallePricing: DallePricing;
}
