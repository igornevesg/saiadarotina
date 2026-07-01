import {
  connectionPromptCatalog,
  type ConnectionPrompt,
} from "../domain/connectionPromptCatalog";

export function buildDailyConnection(): ConnectionPrompt {
  const day = new Date().getDate();

  return connectionPromptCatalog[
    day % connectionPromptCatalog.length
  ];
}