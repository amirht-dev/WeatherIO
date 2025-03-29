import { Calendar, MapPin } from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';
import { Card, CardTitle } from '../Card';

const CurrentWeatherCard = () => {
  return (
    <Card size="lg" aria-label="current weather" className="order-1">
      <CardTitle>Now</CardTitle>

      <div className="flex items-center justify-between my-3">
        <h1 className="text-heading">
          25
          <span className="text-surface-variant-fg">
            &deg;
            <small>C</small>
          </span>
        </h1>

        <img
          src="/images/weather_icons/01d.png"
          width={64}
          height={64}
          alt="Overcast Clouds"
        />
      </div>

      <p className="text-body-3 capitalize">Overcast Clouds</p>

      <ul className="mt-4 pt-4 border-t border-outline space-y-3">
        <MetaListItem icon={<Calendar />}>Thursday 16, Feb</MetaListItem>

        <MetaListItem icon={<MapPin />}>London, GB</MetaListItem>
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
