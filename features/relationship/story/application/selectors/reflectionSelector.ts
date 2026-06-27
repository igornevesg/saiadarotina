function getDeterministicIndex(seed: string, length: number) {
  const total = seed.split("").reduce((sum, char) => {
    return sum + char.charCodeAt(0);
  }, 0);

  return total % length;
}

export function selectReflection(reflections: string[], seed = "default") {
  if (reflections.length === 0) {
    return "";
  }

  const index = getDeterministicIndex(seed, reflections.length);

  return reflections[index];
}