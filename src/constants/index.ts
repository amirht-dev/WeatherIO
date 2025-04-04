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
    desc: 'Air quality is satisfactory, and pollution poses little or no risk to health.',
  },
  {
    levelText: 'Moderate',
    desc: 'Air quality is acceptable, but there may be moderate health concerns for a small number of sensitive individuals.',
  },
  {
    levelText: 'Sensitive Risk',
    desc: 'Sensitive groups may experience health effects. The general public is less likely to be affected.',
  },
  {
    levelText: 'Unhealthy',
    desc: 'Everyone may begin to experience health effects; sensitive groups face more serious risks.',
  },
  {
    levelText: 'Very Unhealthy',
    desc: 'Health alert: the entire population is more likely to be affected with significant health risks.',
  },
  {
    levelText: 'Hazardous',
    desc: 'Emergency conditions: the air is severely polluted, posing serious health risks to all.',
  },
];
