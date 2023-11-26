export const languages: Array<LanguageType> = [
  {
    short: 'en',
    name: 'English',
    direction: 'ltr',
  },
  {
    short: 'he',
    name: 'Hebrew',
    direction: 'rtl',
  },
];

export type LanguageType = {
  short: string;
  name: string;
  direction: 'rtl' | 'ltr';
};
