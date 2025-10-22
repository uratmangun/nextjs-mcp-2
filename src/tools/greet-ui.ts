import { z } from "zod";
import { type InferSchema, type ToolMetadata } from "xmcp";
import { getAppsSdkCompatibleHtml, baseURL } from "@/lib/apps-sdk-html";

// Define the schema for tool parameters
export const schema = {
  name: z.string().describe("The name of the person to greet"),
};

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "greet-ui",
  description: "Open greeting UI to greet a person by their name",
  annotations: {
    title: "Greet Person",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
  _meta: {
    openai: {
      toolInvocation: {
        invoking: "Opening greeting interface",
        invoked: "Greeting interface ready",
      },
      widgetAccessible: true,
      resultCanProduceWidget: true,
    },
  },
};

// Tool implementation
export default async function handler(params: InferSchema<typeof schema>) {
  const { name } = params;
  
  // Get the HTML for the greet-ui page
  const html = await getAppsSdkCompatibleHtml(baseURL, "/greet-ui");

  // Return HTML with structured content containing name
  return {
    content: [
      {
        type: "text",
        text: `<html>${html}</html>`,
      },
    ],
    structuredContent: { name },
  };
}
