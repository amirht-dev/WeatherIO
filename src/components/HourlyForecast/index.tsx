import useCombineRefs from '@/hooks/useCombineRefs';
import useForecastQuery from '@/hooks/useForecastQuery';
import useEmblaCarousel from 'embla-carousel-react';
import range from 'lodash/range';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from 'motion/react';
import { useEffect, useRef } from 'react';
import { twJoin } from 'tailwind-merge';
import { Card } from '../Card';
import IconButton from '../IconButton';
import Skeleton from '../Skeleton';

const HourlyForecast = () => {
  const ref = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    skipSnaps: true,
    align: 'center',
  });

  const { data, isLoading, isSuccess } = useForecastQuery({
    days: 7,
  });

  const isInView = useInView(ref, { once: true });

  const currentHour = new Date().getHours();

  useEffect(() => {
    const event = emblaApi?.on('select', (api) => {
      if (prevBtnRef.current)
        prevBtnRef.current.disabled = !api.canScrollPrev();
      if (nextBtnRef.current)
        nextBtnRef.current.disabled = !api.canScrollNext();
    });

    return () => {
      event?.clear();
    };
  }, [emblaApi]);

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
      <div className="flex items-center justify-between mb-2 tablet:mb-3">
        <h2 className="text-title-2">Today at</h2>

        <div className="flex items-center gap-2">
          <IconButton ref={prevBtnRef} onClick={() => emblaApi?.scrollPrev()}>
            <ChevronLeft />
          </IconButton>

          <IconButton ref={nextBtnRef} onClick={() => emblaApi?.scrollNext()}>
            <ChevronRight />
          </IconButton>
        </div>
      </div>

      <div className="overflow-hidden select-none" ref={combinedRef}>
        <div className="flex gap-3 laptop:gap-4">
          {(data?.forecast.forecastday[0].hour ?? range(0, 23)).map((item) => {
            const hour = Intl.NumberFormat('en-US', {
              minimumIntegerDigits: 2,
            }).format(
              typeof item === 'number' ? item : new Date(item.time).getHours()
            );

            const isCurrentHour = parseInt(hour) === currentHour;

            const hourData = typeof item !== 'number' ? item : undefined;

            return (
              <div className="flex-[0_0_110px] space-y-4" key={hour}>
                <Card
                  className={twJoin(
                    'flex flex-col items-center',
                    isCurrentHour && !isLoading && 'border border-white/50'
                  )}
                >
                  <p className="text-body-3">
                    {hour}{' '}
                    <small className="text-surface-variant-fg">
                      {parseInt(hour) >= 12 ? 'PM' : 'AM'}
                    </small>
                  </p>

                  <Skeleton
                    loading={isLoading}
                    className="my-3 size-12 desktop:size-8"
                  >
                    <img
                      src={`https:${hourData?.condition.icon}`}
                      loading="lazy"
                      alt={hourData?.condition.text}
                      className="my-3 size-12 desktop:size-8"
                    />
                  </Skeleton>

                  <p className="text-body-3">
                    <Skeleton
                      loading={isLoading}
                      className="w-[40px] inline-block"
                    >
                      {hourData?.temp_c}
                      <span className="text-surface-variant-fg text-nowrap">
                        &deg;
                        <small>C</small>
                      </span>
                    </Skeleton>
                  </p>
                </Card>
                <Card
                  className={twJoin(
                    'flex flex-col items-center',
                    isCurrentHour && !isLoading && 'border border-white/50'
                  )}
                >
                  <p className="text-body-3">
                    {hour}{' '}
                    <small className="text-surface-variant-fg">
                      {parseInt(hour) >= 12 ? 'PM' : 'AM'}
                    </small>
                  </p>

                  <Skeleton
                    loading={isLoading}
                    className="my-3 size-12 desktop:size-8"
                  >
                    <img
                      src="/images/weather_icons/direction.png"
                      loading="lazy"
                      alt={`${hourData?.wind_degree} deg`}
                      className="my-3 size-12 desktop:size-8"
                      style={{
                        rotate: `${hourData?.wind_degree}deg`,
                      }}
                      title={`${hourData?.wind_degree}°`}
                    />
                  </Skeleton>

                  <p className="text-body-3 text-nowrap">
                    <Skeleton
                      loading={isLoading}
                      className="w-[40px] inline-block"
                    >
                      {hourData?.wind_kph}
                      <span className="text-surface-variant-fg">
                        <small> km/h</small>
                      </span>
                    </Skeleton>
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
