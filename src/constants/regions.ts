export interface CinemaRegion {
  id: string;
  label: string;
  emoji: string;
  codes: string[];
}

export const CINEMA_REGIONS: CinemaRegion[] = [
  { id: 'us',         label: 'Américain',    emoji: '🇺🇸', codes: ['US'] },
  { id: 'european',   label: 'Européen',     emoji: '🇪🇺', codes: ['FR', 'GB', 'DE', 'IT', 'ES', 'BE', 'NL', 'SE', 'DK', 'NO', 'PL', 'PT', 'AT', 'CH'] },
  { id: 'asian',      label: 'Asiatique',    emoji: '🌏', codes: ['JP', 'KR', 'CN', 'TW', 'HK', 'IN', 'TH', 'VN', 'PH', 'ID'] },
  { id: 'latin',      label: 'Latino',       emoji: '🌎', codes: ['BR', 'MX', 'AR', 'CL', 'CO', 'PE'] },
  { id: 'middleeast', label: 'Moyen-Orient', emoji: '🕌', codes: ['IR', 'IL', 'TR', 'LB', 'SA', 'EG'] },
  { id: 'african',    label: 'Africain',     emoji: '🌍', codes: ['NG', 'ZA', 'SN', 'MA', 'GH'] },
  { id: 'russian',    label: 'Russe',        emoji: '🇷🇺', codes: ['RU'] },
  { id: 'oceanian',   label: 'Océanien',     emoji: '🦘', codes: ['AU', 'NZ'] },
];

/** Convertit une liste d'IDs de régions en codes pays TMDB (dédupliqués). */
export function regionIdsToCodes(regionIds: string[]): string[] {
  const codes = new Set<string>();
  regionIds.forEach((id) => {
    CINEMA_REGIONS.find((r) => r.id === id)?.codes.forEach((c) => codes.add(c));
  });
  return Array.from(codes);
}
