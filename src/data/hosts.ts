export interface Host {
  id: string;
  nameKo: string;
  nameEn: string;
  initial: string;
  languages: string[];
  secretSpotKo: string;
  secretSpotEn: string;
  philosophyKo: string;
  philosophyEn: string;
  photo: string;
}

export const hosts: Host[] = [
  { id: 'bada', nameKo: '바다아빠', nameEn: 'Bada Papa', initial: 'B', languages: ['EN'], secretSpotKo: '추후 공개', secretSpotEn: 'Coming Soon', philosophyKo: '추후 공개', philosophyEn: 'Coming Soon', photo: '' },
  { id: 'poi', nameKo: '포이', nameEn: 'Poi', initial: 'P', languages: ['EN'], secretSpotKo: '추후 공개', secretSpotEn: 'Coming Soon', philosophyKo: '추후 공개', philosophyEn: 'Coming Soon', photo: '' },
  { id: 'ray', nameKo: '레이', nameEn: 'Ray', initial: 'R', languages: ['EN'], secretSpotKo: '추후 공개', secretSpotEn: 'Coming Soon', philosophyKo: '추후 공개', philosophyEn: 'Coming Soon', photo: '' },
  { id: 'manseok', nameKo: '만석꾼', nameEn: 'Manseok', initial: 'M', languages: ['EN'], secretSpotKo: '추후 공개', secretSpotEn: 'Coming Soon', philosophyKo: '추후 공개', philosophyEn: 'Coming Soon', photo: '' },
  { id: 'chris', nameKo: '크리스림', nameEn: 'Chris Lim', initial: 'C', languages: ['EN'], secretSpotKo: '추후 공개', secretSpotEn: 'Coming Soon', philosophyKo: '추후 공개', philosophyEn: 'Coming Soon', photo: '' },
  { id: 'sophia', nameKo: '소피아', nameEn: 'Sophia', initial: 'S', languages: ['EN'], secretSpotKo: '추후 공개', secretSpotEn: 'Coming Soon', philosophyKo: '추후 공개', philosophyEn: 'Coming Soon', photo: '' },
];
