// Koristimo vise puta ovu finkciju pa ju je pozeljno napisati na jednom mjestu
export function formatCurrecny(priceCents) {
  return (priceCents / 100).toFixed(2);
}