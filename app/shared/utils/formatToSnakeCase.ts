export function formatToSnakeCase(text: string) {
  return text.toLowerCase().replace(/\s+/g, "_");
}
