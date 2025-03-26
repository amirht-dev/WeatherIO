import {
  ConfigExtension,
  DefaultClassGroupIds,
  DefaultThemeGroupIds,
  extendTailwindMerge,
} from 'tailwind-merge';

export const config: ConfigExtension<
  DefaultClassGroupIds | 'gradients',
  DefaultThemeGroupIds
> = {
  override: {
    theme: {
      color: [
        'primary',
        'primary-fg',
        'background',
        'background-fg',
        'surface',
        'surface-fg',
        'surface-variant-fg',
        'surface-variant-2-fg',
        'outline',
        'bg-aqi-1',
        'bg-aqi-1-fg',
        'bg-aqi-2',
        'bg-aqi-2-fg',
        'bg-aqi-3',
        'bg-aqi-3-fg',
        'bg-aqi-4',
        'bg-aqi-4-fg',
        'bg-aqi-5',
        'bg-aqi-5-fg',
        'white',
        'black',
      ],
      radius: ['lg', 'xl', 'round'],
      shadow: ['1', '2'],
      text: [
        'heading',
        'title',
        'title-2',
        'title-3',
        'body-1',
        'body',
        'body-3',
        'label-1',
        'label-2',
      ],
      font: ['nunito-sans'],
      'font-weight': ['regular', 'semiBold'],
    },
  },
  extend: {
    classGroups: {
      gradients: [{ gradient: ['1', '2'] }],
    },
    conflictingClassGroups: {
      gradients: ['bg-image'],
    },
  },
};

export const twMerge = extendTailwindMerge(config);
