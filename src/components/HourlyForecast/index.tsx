import useCombineRefs from '@/hooks/useCombineRefs';
import useForecastQuery from '@/hooks/useForecastQuery';
import useEmblaCarousel from 'embla-carousel-react';
import { useInView } from 'motion/react';
import { useEffect, useRef } from 'react';
import { twJoin } from 'tailwind-merge';
import { Card } from '../Card';

const HourlyForecast = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    skipSnaps: true,
    align: 'center',
  });

  const { data, isSuccess } = useForecastQuery({
    days: 7,
  });

  const isInView = useInView(ref, { once: true });

  const currentHour = new Date().getHours();

  useEffect(() => {
    if (isSuccess && isInView) {
      emblaApi?.scrollTo(currentHour);

      const event = emblaApi?.on('reInit', (api) => {
        api.scrollTo(currentHour);
      });
      return () => {
        event?.clear();
      };
    }
  }, [isSuccess, emblaApi, currentHour, isInView]);

  const combinedRef = useCombineRefs(emblaRef, ref);

  return (
    <section
      aria-label="hourly forecast"
      className="overflow-hidden order-4 tablet:max-desktop:col-span-2"
    >
      <h2 className="text-title-2 mb-2 tablet:mb-3">Today at</h2>

      <div className="overflow-hidden select-none" ref={combinedRef}>
        <div className="flex gap-3 laptop:gap-4">
          {data?.forecast.forecastday[0].hour.map((item) => {
            const hour = Intl.NumberFormat('en-US', {
              minimumIntegerDigits: 2,
            }).format(new Date(item.time).getHours());

            const isCurrentHour = parseInt(hour) === currentHour;

            return (
              <div className="flex-[0_0_110px] space-y-4" key={hour}>
                <Card
                  className={twJoin(
                    'flex flex-col items-center',
                    isCurrentHour && 'border border-white/50'
                  )}
                >
                  <p className="text-body-3">
                    {hour}{' '}
                    <small className="text-surface-variant-fg">
                      {parseInt(hour) >= 12 ? 'PM' : 'AM'}
                    </small>
                  </p>

                  <img
                    src={item.condition.icon}
                    loading="lazy"
                    alt={item.condition.text}
                    className="my-3 w-12 desktop:w-8"
                  />

                  <p className="text-body-3">
                    {item.temp_c}
                    <span className="text-surface-variant-fg">
                      &deg;
                      <small>C</small>
                    </span>
                  </p>
                </Card>
                <Card
                  className={twJoin(
                    'flex flex-col items-center',
                    isCurrentHour && 'border border-white/50'
                  )}
                >
                  <p className="text-body-3">
                    {hour}{' '}
                    <small className="text-surface-variant-fg">
                      {parseInt(hour) >= 12 ? 'PM' : 'AM'}
                    </small>
                  </p>

                  <img
                    src="/images/weather_icons/direction.png"
                    loading="lazy"
                    alt={`${item.wind_degree} deg`}
                    className="my-3 w-12 desktop:w-8"
                    style={{
                      rotate: `${item.wind_degree}deg`,
                    }}
                    title={`${item.wind_degree}°`}
                  />

                  <p className="text-body-3 text-nowrap">
                    {item.wind_kph}
                    <span className="text-surface-variant-fg">
                      <small> km/h</small>
                    </span>
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HourlyForecast;
