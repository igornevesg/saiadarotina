export type CoupleData = {
  apelido: string;
  parceiro: string;
  objetivo: string;
  codigo: string;
  createdAt: string;
};

const STORAGE_KEY = "saiadarotina_couple";

export function saveCouple(data: CoupleData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getCouple(): CoupleData | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function clearCouple() {
  localStorage.removeItem(STORAGE_KEY);
}