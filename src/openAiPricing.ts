import { OpenAiPricing } from "./types";

const daviciPricing = { in: 0.02 / 1000, out: 0.02 / 1000 };
const turboPricing = { in: 0.0015 / 1000, out: 0.002 / 1000 };

export const openAiPricing: OpenAiPricing = {
  textPricing: {
    "gpt-3.5-turbo-16k-0613": { in: 0.003 / 1000, out: 0.004 / 1000 },
    "gpt-3.5-turbo-0613": turboPricing,
    "gpt-3.5-turbo-instruct:20230824-v2": turboPricing,
    "text-davinci:001": daviciPricing,
    "text-davinci:002": daviciPricing,
    "text-davinci:003": daviciPricing,
    "gpt-4": { in: 0.03 / 1000, out: 0.06 / 1000 },
    "gpt-4-0613": { in: 0.03 / 1000, out: 0.06 / 1000 },
    "gpt-4-32k": { in: 0.06 / 1000, out: 0.0121 },
    "gpt-4-32k-0613": { in: 0.06 / 1000, out: 0.12 / 1000 },
  },
  whisperPricing: { "whisper-1": { out: 0.006 / 60 } },
  dallePricing: {
    "1024x1024": { out: 0.02 },
    "512x512": { out: 0.018 },
    "256x256": { out: 0.016 },
  },
};
