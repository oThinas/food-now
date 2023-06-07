export function excerptString(string: string, maxLength: number, cutPoint: number): string {
  return string.length > maxLength ? string.slice(0, cutPoint).concat('...') : string;
}
