import {
  AudioModelUsage,
  DayTotal,
  ImageModelUsage,
  TextModelUsage,
} from "./types";
import { calculateDayTotal } from "./utils";

import { DateTime } from "luxon";

const timeZone = "America/Chicago";
const date = DateTime.now();
const today = Bun.argv.slice(2)[0] || date.toFormat("yyyy-MM-dd");
const month = date.toFormat("LLLL").toLowerCase();
const now = date.toISO();

const response = await fetch(`https://api.openai.com/v1/usage?date=${today}`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

const { data, whisper_api_data, dalle_api_data } = (await response.json()) as {
  data: TextModelUsage[];
  whisper_api_data: AudioModelUsage[];
  dalle_api_data: ImageModelUsage[];
};

const usage = calculateDayTotal(data, whisper_api_data, dalle_api_data);

let totalCost = 0;

for (const type in usage) {
  const models = usage[type as keyof DayTotal];

  for (const model in models) {
    const modelData = models[model];
    totalCost += modelData.cost;
  }
}

console.log(
  `Total cost for ${today}:`,
  totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
);
