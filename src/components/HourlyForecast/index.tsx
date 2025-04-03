import useEmblaCarousel from 'embla-carousel-react';
import { Card } from '../Card';

const HourlyForecast = () => {
  const [emblaRef] = useEmblaCarousel({
    skipSnaps: true,
  });

  return (
    <section
      aria-label="hourly forecast"
      className="overflow-hidden order-4 tablet:max-desktop:col-span-2"
    >
      <h2 className="text-title-2 mb-2 tablet:mb-3">Today at</h2>

      <div className="overflow-hidden select-none" ref={emblaRef}>
        <div className="flex gap-3 laptop:gap-4">
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
      loading="lazy"
      alt=""
      className="my-3 w-12 desktop:w-8"
    />

    <p className="text-body-3">
      {value}
      <span className="text-surface-variant-fg">
        {type === 'temp' && <>&deg;</>}
        <small>{type === 'temp' ? 'C' : 'km/h'}</small>
      </span>
    </p>
  </Card>
);
