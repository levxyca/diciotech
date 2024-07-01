import { Term } from "../types";

/**
 * Parses terms from a JSON and flattens them.
 */
export const parseJSONTerms = (json: string): Term[] => {
  const parsedJSON = JSON.parse(json);
  const values: Term[] = Object.values(parsedJSON);
  return values.flat();
}