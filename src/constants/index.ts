export const breakpoints = {
  initial: 0,
  tablet: 768,
  laptop: 1200,
  desktop: 1400,
};
export type Breakpoint = keyof typeof breakpoints;

export const aqiText = [
  {
    levelText: 'Good',
    desc: 'Air quality considered satisfactory, and air pollution poses little or no risk.',
  },
  {
    levelText: 'Fair',
    desc: 'Air quality is acceptable; however, for some pollution there may be a moderate health concern for very small number of people who are unusually sensitive to air pollutions.',
  },
  {
    levelText: 'Moderate',
    desc: 'Members of sensitive groups may experience health effects. the general public is not likely to be affected.',
  },
  {
    levelText: 'Poor',
    desc: 'Every one may begin to experience health effects, members of sensitive groups may experience more serious health effects.',
  },
  {
    levelText: 'Very Poor',
    desc: 'health warning for emergency conditions. The entire population is more likely to be affected.',
  },
];
