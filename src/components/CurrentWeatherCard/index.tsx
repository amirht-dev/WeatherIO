import useCurrentWeatherQuery from '@/hooks/useCurrentWeatherQuery';
import useLocationParams from '@/hooks/useLocationSearchParam';
import { formatDateToParts } from '@/utils';
import { Calendar, MapPin } from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';
import { Card, CardTitle } from '../Card';
import Skeleton from '../Skeleton';

const CurrentWeatherCard = () => {
  const [location] = useLocationParams();
  const { data, isLoading } = useCurrentWeatherQuery();

  const dateParts = formatDateToParts(
    new Date(data?.location.localtime ?? Date.now())
  );

  const formattedDate = `${dateParts.weekDayName} ${dateParts.day}, ${dateParts.monthName}`;

  return (
    <Card
      size="lg"
      aria-label="current weather"
      className="order-1"
      key={location}
    >
      <CardTitle>Now</CardTitle>

      <div className="flex items-center justify-between my-3">
        <h1 className="text-heading laptop:text-[4rem]">
          <Skeleton
            className="inline-block w-[170px] tablet:w-[130px] leading-[1.1]"
            loading={isLoading}
          >
            {data?.current.temp_c}
            <span className="text-surface-variant-fg">
              &deg;
              <small>C</small>
            </span>
          </Skeleton>
        </h1>

        <Skeleton
          className="inline-block size-16 laptop:size-20"
          loading={isLoading}
        >
          <img
            src={`https:${data?.current.condition.icon}`}
            width={64}
            height={64}
            alt={data?.current.condition.text}
            className="size-16 laptop:size-20"
          />
        </Skeleton>
      </div>

      <p className="text-body-3 capitalize">
        <Skeleton loading={isLoading} className="w-[150px] text-body-3">
          {data?.current.condition.text}
        </Skeleton>
      </p>

      <ul className="mt-4 pt-4 border-t border-outline space-y-3">
        <MetaListItem icon={<Calendar />}>
          <Skeleton loading={isLoading} className="w-[120px] text-title-3">
            {formattedDate}
          </Skeleton>
        </MetaListItem>

        <MetaListItem icon={<MapPin />}>
          <Skeleton loading={isLoading} className="w-[100px] text-title-3">
            {data?.location.name}, {data?.location.country}
          </Skeleton>
        </MetaListItem>
      </ul>
    </Card>
  );
};

export default CurrentWeatherCard;

function MetaListItem({
  icon,
  children,
}: PropsWithChildren<{ icon: ReactNode }>) {
  return (
    <li className="flex items-center gap-2">
      {icon}

      <p className="text-title-3 text-surface-variant-fg">{children}</p>
    </li>
  );
}
