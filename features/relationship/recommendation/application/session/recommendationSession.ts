let currentMomentIndex = 0;

export function getCurrentMomentIndex() {
  return currentMomentIndex;
}

export function advanceMomentIndex() {
  currentMomentIndex += 1;
}

export function resetMomentIndex() {
  currentMomentIndex = 0;
}