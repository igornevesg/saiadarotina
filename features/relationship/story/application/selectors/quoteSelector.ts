function getDeterministicIndex(seed: string, length: number) {
  const total = seed.split("").reduce((sum, char) => {
    return sum + char.charCodeAt(0);
  }, 0);

  return total % length;
}

export function selectQuote(quotes: string[], seed = "default") {
  if (quotes.length === 0) {
    return "";
  }

  const index = getDeterministicIndex(seed, quotes.length);

  return quotes[index];
}