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
const today = process.argv.slice(2)[0] || date.toFormat("yyyy-MM-dd");
const month = date.toFormat("LLLL").toLowerCase();
const now = date.toISO();

try {
  const response = await fetch(
    `https://api.openai.com/v1/usage?date=${today}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const { data, whisper_api_data, dalle_api_data } =
    (await response.json()) as {
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

  if (Object.keys(usage).length === 0) {
    console.log("No usage on", today);
    process.exit(0);
  }

  console.log(
    `Total cost for ${today}:`,
    totalCost.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  );
} catch (error) {
  // Handle the error here
  console.error(error);
}
