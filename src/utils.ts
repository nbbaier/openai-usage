import { openAiPricing } from "./openAiPricing";
import {
  ImageModelUsage,
  ImageModelSnapshot,
  AudioModelUsage,
  AudioModelSnapshot,
  TextModelUsage,
  TextModelSnapshot,
  DayTotal,
} from "./types";

export const getTextTotals = (data: TextModelUsage[]): TextModelSnapshot => {
  const totals: TextModelSnapshot = {};
  const { textPricing } = openAiPricing;
  data.forEach((textModel) => {
    const { snapshot_id, n_context_tokens_total, n_generated_tokens_total } =
      textModel;
    if (!totals[snapshot_id]) {
      totals[snapshot_id] = {
        tokensIn: 0,
        tokensOut: 0,
        cost: 0,
      };
    }
    totals[snapshot_id].tokensIn += n_context_tokens_total;
    totals[snapshot_id].tokensOut += n_generated_tokens_total;
    totals[snapshot_id].cost +=
      n_context_tokens_total * textPricing[snapshot_id].in;
    totals[snapshot_id].cost +=
      n_generated_tokens_total * textPricing[snapshot_id].out;
  });
  return totals;
};

export const getAudioTotals = (data: AudioModelUsage[]): AudioModelSnapshot => {
  const totals: AudioModelSnapshot = {};
  const { whisperPricing } = openAiPricing;
  data.forEach((audioModel) => {
    const { model_id, num_seconds } = audioModel;
    if (!totals[model_id]) {
      totals[model_id] = {
        seconds: 0,
        cost: 0,
      };
    }
    totals[model_id].seconds += num_seconds;
    totals[model_id].cost += num_seconds * whisperPricing[model_id].out;
  });
  return totals;
};

export const getImageTotals = (data: ImageModelUsage[]): ImageModelSnapshot => {
  const totals: ImageModelSnapshot = {};
  const { dallePricing } = openAiPricing;
  data.forEach((imageModel) => {
    const { image_size, num_images } = imageModel;
    if (!totals[image_size]) {
      totals[image_size] = {
        images: 0,
        cost: 0,
      };
    }
    totals[image_size].images += num_images;
    totals[image_size].cost += num_images * dallePricing[image_size].out;
  });
  return totals;
};

export const calculateDayTotal = (
  data: TextModelUsage[],
  whisper_api_data: AudioModelUsage[],
  dalle_api_data: ImageModelUsage[]
): DayTotal => {
  let dayTotal: DayTotal = {};
  if (data.length) {
    dayTotal.text = getTextTotals(data);
  }
  if (whisper_api_data.length) {
    dayTotal.audio = getAudioTotals(whisper_api_data);
  }
  if (dalle_api_data.length) {
    dayTotal.image = getImageTotals(dalle_api_data);
  }
  return dayTotal;
};
