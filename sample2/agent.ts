/**
 * agent.ts
 * AI Agent definition with dynamic date context and Tool definitions.
 *
 * npx adk web
 */
import { LlmAgent, FunctionTool } from "@google/adk";
import { z } from "zod";

// ==========================================
// 1. Dynamic Date Helper
// ==========================================
const now = new Date();
const currentDateTime = now.toLocaleString("ja-JP", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Tokyo",
});

// ==========================================
// 2. Tools Definition
// ==========================================

const getExchangeRateTool = new FunctionTool({
  name: "get_exchange_rate",
  description: "Use this to get current exchange rate between currencies.",
  parameters: z.object({
    currency_from: z
      .string()
      .default("USD")
      .describe("Source currency (major currency)."),
    currency_to: z
      .string()
      .default("EUR")
      .describe("Destination currency (major currency)."),
    currency_date: z
      .string()
      .default("latest")
      .describe("Date of the currency in ISO format (YYYY-MM-DD) or 'latest'."),
  }),
  execute: async ({ currency_from, currency_to, currency_date }) => {
    try {
      const response = await fetch(
        `https://api.frankfurter.app/${currency_date}?from=${currency_from}&to=${currency_to}`,
      );
      if (!response.ok) throw new Error(`API status: ${response.status}`);
      const data: any = await response.json();
      const rate = data.rates[currency_to];
      return [
        `The raw data from the API is ${JSON.stringify(data)}.`,
        `The currency rate at ${currency_date} from "${currency_from}" to "${currency_to}" is ${rate}.`,
      ].join("\n");
    } catch (error: any) {
      return `Error retrieving exchange rate: ${error.message}`;
    }
  },
});

const getCurrentWeatherTool = new FunctionTool({
  name: "get_current_weather",
  description:
    "Use this to get the weather using the latitude and the longitude.",
  parameters: z.object({
    latitude: z.number().describe("The latitude of the inputed location."),
    longitude: z.number().describe("The longitude of the inputed location."),
    date: z
      .string()
      .describe("Date for searching the weather. Format: 'yyyy-MM-dd HH:mm'"),
    timezone: z.string().describe("The timezone (e.g., 'Asia/Tokyo')."),
  }),
  execute: async ({ latitude, longitude, date, timezone }) => {
    const codeMap: Record<number, string> = {
      0: "Clear sky",
      1: "Mainly clear, partly cloudy, and overcast",
      2: "Mainly clear, partly cloudy, and overcast",
      3: "Mainly clear, partly cloudy, and overcast",
      45: "Fog and depositing rime fog",
      48: "Fog and depositing rime fog",
      51: "Drizzle: Light, moderate, and dense intensity",
      53: "Drizzle: Light, moderate, and dense intensity",
      55: "Drizzle: Light, moderate, and dense intensity",
      56: "Freezing Drizzle: Light and dense intensity",
      57: "Freezing Drizzle: Light and dense intensity",
      61: "Rain: Slight, moderate and heavy intensity",
      63: "Rain: Slight, moderate and heavy intensity",
      65: "Rain: Slight, moderate and heavy intensity",
      66: "Freezing Rain: Light and heavy intensity",
      67: "Freezing Rain: Light and heavy intensity",
      71: "Snow fall: Slight, moderate, and heavy intensity",
      73: "Snow fall: Slight, moderate, and heavy intensity",
      75: "Snow fall: Slight, moderate, and heavy intensity",
      77: "Snow grains",
      80: "Rain showers: Slight, moderate, and violent",
      81: "Rain showers: Slight, moderate, and violent",
      82: "Rain showers: Slight, moderate, and violent",
      85: "Snow showers slight and heavy",
      86: "Snow showers slight and heavy",
      95: "Thunderstorm: Slight or moderate",
      96: "Thunderstorm with slight and heavy hail",
      99: "Thunderstorm with slight and heavy hail",
    };
    try {
      const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weather_code&timezone=${encodeURIComponent(timezone)}`;
      const response = await fetch(endpoint);
      const data: any = await response.json();
      const targetTime = date.replace(" ", "T").trim();
      const widx = data.hourly.time.indexOf(targetTime);
      if (widx !== -1) {
        return codeMap[data.hourly.weather_code[widx]] || "Unknown condition.";
      }
      return "No weather data found for the specified time.";
    } catch (error: any) {
      return `Error retrieving weather: ${error.message}`;
    }
  },
});

// ==========================================
// 3. Agent Definition
// ==========================================

export const rootAgent = new LlmAgent({
  name: "api_manager_agent",
  description: "An agent that manages currency and weather API tools.",
  model: "gemini-3-flash-preview",
  instruction: `You are a professional API Manager.
Current date and time is ${currentDateTime}. Use this information to calculate relative dates.
1. Use 'get_exchange_rate' for currency queries.
2. Use 'get_current_weather' for weather queries. "date" is required to be "yyyy-MM-dd HH:00".
3. Provide precise, helpful responses based on tool outputs.`,
  tools: [getExchangeRateTool, getCurrentWeatherTool],
});
