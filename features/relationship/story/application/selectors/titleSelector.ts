function getDeterministicIndex(seed: string, length: number) {
  const total = seed.split("").reduce((sum, char) => {
    return sum + char.charCodeAt(0);
  }, 0);

  return total % length;
}

export function selectTitle(titles: string[], seed = "default") {
  if (titles.length === 0) {
    return "";
  }

  const index = getDeterministicIndex(seed, titles.length);

  return titles[index];
}