import { aqiText } from '@/constants';
import useAstronomyQuery from '@/hooks/useAstronomyQuery';
import useCurrentWeatherQuery from '@/hooks/useCurrentWeatherQuery';
import {
  Droplet,
  Eye,
  Moon,
  Sun,
  Thermometer,
  Waves,
  Wind,
} from 'lucide-react';
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ReactNode,
} from 'react';
import { twJoin } from 'tailwind-merge';
import Badge from '../Badge';
import { Card, CardTitle } from '../Card';
import Skeleton from '../Skeleton';

function TodayHighlights() {
  return (
    <section aria-labelledby="today-highlights-label" className="order-2">
      <Card size="lg">
        <CardTitle id="today-highlights-label" className="mb-2">
          Today Highlights
        </CardTitle>

        <div className="grid gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
          <AirQualityIndex />

          <SunriseAndSunset />

          <Humidity />

          <Pressure />

          <Visibility />

          <FeelsLike />
        </div>
      </Card>
    </section>
  );
}

export default TodayHighlights;

const TodayHighlightCard = (props: ComponentPropsWithoutRef<typeof Card>) => {
  return (
    <Card
      size="lg"
      {...props}
      className={twJoin('bg-black/10', props.className)}
    />
  );
};

const TodayHighlightCardTitle = ({
  children,
  ...props
}: ComponentPropsWithRef<typeof CardTitle>) => {
  return (
    <CardTitle
      {...props}
      className="text-title-3 text-surface-variant-fg mb-5"
      asChild
    >
      <h3>{children}</h3>
    </CardTitle>
  );
};

type AirQualityItemProps = {
  label: ReactNode;
  value: ReactNode;
};

const AirQualityItem = ({ label, value }: AirQualityItemProps) => (
  <li className="flex gap-1 items-center grow laptop:flex-col-reverse">
    <p className="max-desktop:text-title-1 desktop:text-body-1">{value}</p>
    <p className="text-label-1 text-surface-variant-fg">{label}</p>
  </li>
);

const AirQualityIndex = () => {
  const { data, isLoading } = useCurrentWeatherQuery();

  const aqi = data?.current.air_quality;

  const aqiIndex = aqi?.['us-epa-index'] ?? 1;

  const aqiContent = aqiText[aqiIndex - 1];

  return (
    <TodayHighlightCard className="tablet:col-span-2">
      <div className="flex items-start justify-between">
        <TodayHighlightCardTitle>Air Quality Index</TodayHighlightCardTitle>

        <Skeleton
          loading={isLoading}
          className="rounded-full inline-block w-[70px] h-[26px]"
        >
          <Badge severity={aqiIndex} title={aqiContent.desc}>
            {aqiContent.levelText}
          </Badge>
        </Skeleton>
      </div>

      <div className="flex items-center gap-4">
        <Wind className="size-8 tablet:size-9 laptop:max-desktop:size-12" />

        <ul className="grid grid-cols-2 laptop:grid-cols-4 justify-items-end gap-4 flex-1">
          <AirQualityItem
            label={
              <>
                PM<sub>2.5</sub>
              </>
            }
            value={
              <Skeleton loading={isLoading} className="w-[60px]">
                {aqi?.pm2_5}
              </Skeleton>
            }
          />
          <AirQualityItem
            label={
              <>
                SO<sub>2</sub>
              </>
            }
            value={
              <Skeleton loading={isLoading} className="w-[60px]">
                {aqi?.so2}
              </Skeleton>
            }
          />
          <AirQualityItem
            label={
              <>
                NO<sub>2</sub>
              </>
            }
            value={
              <Skeleton loading={isLoading} className="w-[60px]">
                {aqi?.no2}
              </Skeleton>
            }
          />
          <AirQualityItem
            label={
              <>
                O<sub>3</sub>
              </>
            }
            value={
              <Skeleton loading={isLoading} className="w-[60px]">
                {aqi?.o3}
              </Skeleton>
            }
          />
        </ul>
      </div>
    </TodayHighlightCard>
  );
};

const SunriseAndSunset = () => {
  const { data, isLoading } = useAstronomyQuery();

  const sunrise = data?.astronomy.astro.sunrise.split(' ');
  const sunset = data?.astronomy.astro.sunset.split(' ');

  return (
    <TodayHighlightCard className="tablet:col-span-2">
      <TodayHighlightCardTitle>Sunrise & Sunset</TodayHighlightCardTitle>

      <div className="flex items-center tablet:gap-5">
        <div className="flex items-center flex-1 gap-2">
          <Sun className="size-8 tablet:size-9 laptop:max-desktop:size-12" />

          <div className="">
            <p className="text-label-1 text-surface-variant-fg">Sunrise</p>
            <p className="text-title-1 desktop:text-body-1">
              <Skeleton
                className="w-[80px] laptop:w-[140px] desktop:w-[100px]"
                loading={isLoading}
              >
                {sunrise?.[0]}
                <small className="text-surface-variant-fg">
                  {' '}
                  {sunrise?.[1]}
                </small>
              </Skeleton>
            </p>
          </div>
        </div>

        <div className="flex items-center flex-1 gap-2">
          <Moon className="size-8 tablet:size-9 laptop:max-desktop:size-12" />

          <div className="">
            <p className="text-label-1 text-surface-variant-fg">Sunset</p>
            <p className="text-title-1 desktop:text-body-1">
              <Skeleton
                className="w-[80px] laptop:w-[140px] desktop:w-[100px]"
                loading={isLoading}
              >
                {sunset?.[0]}
                <small className="text-surface-variant-fg">
                  {' '}
                  {sunset?.[1]}
                </small>
              </Skeleton>
            </p>
          </div>
        </div>
      </div>
    </TodayHighlightCard>
  );
};

const Humidity = () => {
  const { data, isLoading } = useCurrentWeatherQuery();

  return (
    <TodayHighlightCard>
      <TodayHighlightCardTitle>Humidity</TodayHighlightCardTitle>

      <div className="flex items-center gap-4 justify-between">
        <Droplet className="size-8 tablet:size-9 laptop:max-desktop:size-12" />
        <p className="text-title-1 desktop:text-body-1">
          <Skeleton
            loading={isLoading}
            className="w-[40px] tablet:max-desktop:w-[60px] inline-block"
          >
            {data?.current.humidity}
          </Skeleton>
          <small className="text-surface-variant-fg">%</small>
        </p>
      </div>
    </TodayHighlightCard>
  );
};

const Pressure = () => {
  const { data, isLoading } = useCurrentWeatherQuery();

  return (
    <TodayHighlightCard>
      <TodayHighlightCardTitle>Pressure</TodayHighlightCardTitle>

      <div className="flex items-center gap-4 justify-between">
        <Waves className="size-8 tablet:size-9 laptop:max-desktop:size-12" />
        <p className="text-title-1 desktop:text-body-1">
          <Skeleton
            loading={isLoading}
            className="w-[50px] tablet:max-desktop:w-[100px] inline-block"
          >
            {data?.current.pressure_mb}
          </Skeleton>
          <small className="text-surface-variant-fg">mb</small>
        </p>
      </div>
    </TodayHighlightCard>
  );
};

const Visibility = () => {
  const { data, isLoading } = useCurrentWeatherQuery();

  return (
    <TodayHighlightCard>
      <TodayHighlightCardTitle>Visibility</TodayHighlightCardTitle>

      <div className="flex items-center gap-4 justify-between">
        <Eye className="size-8 tablet:size-9 laptop:max-desktop:size-12" />
        <p className="text-title-1 desktop:text-body-1">
          <Skeleton
            loading={isLoading}
            className="w-[40px] tablet:max-desktop:w-[60px] inline-block"
          >
            {data?.current.vis_km}
          </Skeleton>
          <small className="text-surface-variant-fg">km</small>
        </p>
      </div>
    </TodayHighlightCard>
  );
};

const FeelsLike = () => {
  const { data, isLoading } = useCurrentWeatherQuery();

  return (
    <TodayHighlightCard>
      <TodayHighlightCardTitle>Feels Like</TodayHighlightCardTitle>

      <div className="flex items-center gap-4 justify-between">
        <Thermometer className="size-8 tablet:size-9 laptop:max-desktop:size-12" />
        <p className="text-title-1 desktop:text-body-1">
          <Skeleton
            loading={isLoading}
            className="w-[40px] tablet:max-desktop:w-[60px] inline-block"
          >
            {data?.current.feelslike_c}
          </Skeleton>
          <span className="text-surface-variant-fg">&deg;c</span>
        </p>
      </div>
    </TodayHighlightCard>
  );
};
