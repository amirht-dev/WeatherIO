import useCurrentWeatherQuery from '@/hooks/useCurrentWeatherQuery';
import useLocationParams from '@/hooks/useLocationSearchParam';
import { formatDate } from '@/utils';
import { Calendar, MapPin } from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';
import { Card, CardTitle } from '../Card';

const CurrentWeatherCard = () => {
  const [location] = useLocationParams();
  const { data } = useCurrentWeatherQuery();

  return (
    <Card
      size="lg"
      aria-label="current weather"
      className="order-1"
      key={location}
    >
      <CardTitle>Now</CardTitle>

      <div className="flex items-center justify-between my-3">
        <h1 className="text-heading">
          {data?.current.temp_c}
          <span className="text-surface-variant-fg">
            &deg;
            <small>C</small>
          </span>
        </h1>

        <img
          src={data?.current.condition.icon}
          width={64}
          height={64}
          alt={data?.current.condition.text}
          className="w-16 laptop:w-20"
        />
      </div>

      <p className="text-body-3 capitalize">{data?.current.condition.text}</p>

      <ul className="mt-4 pt-4 border-t border-outline space-y-3">
        <MetaListItem icon={<Calendar />}>
          {formatDate(new Date(data?.location.localtime ?? Date.now()))}
        </MetaListItem>

        <MetaListItem icon={<MapPin />}>
          {data?.location.name}, {data?.location.country}
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
