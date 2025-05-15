export const SchoolNames = ['McMaster'] as const;

export const DegreeTypes = ["Associate", "Bachelor's", "Master's", "Doctoral"] as const;

export const Pronouns = ['Him', 'She/Her', 'They/Them', 'Other', 'Prefer not to say'] as const;

export const Interests = ['Sports', 'Arts', 'Cars', 'Reading', 'C#', 'who knows what else'] as const;

export const Cars: Record<string, string[]> = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius'],
  'Honda': ['Accord', 'Civic', 'CR-V', 'Pilot', 'Fit'],
  'Ford': ['F-150', 'Mustang', 'Explorer', 'Escape', 'Edge'],
  'Chevrolet': ['Silverado', 'Malibu', 'Equinox', 'Tahoe', 'Camaro'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'M4'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
  'Audi': ['A3', 'A4', 'A6', 'Q5', 'Q7'],
  'Nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Leaf'],
  'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona'],
  'Kia': ['Forte', 'Optima', 'Sorento', 'Sportage', 'Telluride']
};

export function ArrayToDropdownOptions(arr: readonly any[]) {
  return arr.map((label) => ({
    label: label,
    value: label,
  }));
}