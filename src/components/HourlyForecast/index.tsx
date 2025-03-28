import useEmblaCarousel from 'embla-carousel-react';
import { Card } from '../Card';

const HourlyForecast = () => {
  const [emblaRef] = useEmblaCarousel({
    skipSnaps: true,
  });

  return (
    <section aria-label="hourly forecast">
      <h2 className="text-title-2 mb-2">Today at</h2>

      <div className="overflow-hidden select-none" ref={emblaRef}>
        <div className="flex gap-3">
          {Array.from({ length: 24 }, (_, idx) => {
            const hour = Intl.NumberFormat('en-US', {
              minimumIntegerDigits: 2,
            }).format(idx);

            return (
              <div className="flex-[0_0_110px] space-y-4" key={hour}>
                <HourForeCastCard hour={hour} type="temp" value="25" />
                <HourForeCastCard hour={hour} type="dir" value="12" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HourlyForecast;

type HourForecastProps = { hour: string; value: string; type: 'temp' | 'dir' };

const HourForeCastCard = ({ hour, type, value }: HourForecastProps) => (
  <Card className="flex-[0_0_110px] flex flex-col items-center">
    <p className="text-body-3">
      {hour} <small className="text-surface-variant-fg">PM</small>
    </p>

    <img
      src={`/images/weather_icons/${type === 'temp' ? '01n' : 'direction'}.png`}
      width={48}
      height={48}
      loading="lazy"
      alt=""
      className="my-3"
    />

    <p className="text-body-3">
      {type === 'temp' ? <>{value}&deg;</> : value}
      <small className="text-surface-variant-fg">
        {type === 'temp' ? 'C' : 'km/h'}
      </small>
    </p>
  </Card>
);
