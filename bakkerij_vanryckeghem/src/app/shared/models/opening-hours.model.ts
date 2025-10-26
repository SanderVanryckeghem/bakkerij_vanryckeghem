export interface OpeningHours {
  day: string;
  hours: string;
  isClosed?: boolean;
}

export const OPENING_HOURS: OpeningHours[] = [
  { day: 'Maandag', hours: 'Gesloten', isClosed: true },
  { day: 'Dinsdag', hours: 'Gesloten' },
  { day: 'Woensdag', hours: '08:30 – 12:30 / 13:45 – 19:00' },
  { day: 'Donderdag', hours: '08:30 – 12:30 / 13:45 – 19:00' },
  { day: 'Vrijdag', hours: '08:30 – 12:30 / 13:45 – 19:00' },
  { day: 'Zaterdag', hours: '08:15 – 12:30 / 13:45 – 19:00' },
  { day: 'Zondag', hours: '07:15 – 13:00' }
];
