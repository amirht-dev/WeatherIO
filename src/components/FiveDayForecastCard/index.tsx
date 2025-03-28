import { Card } from '../Card';

const FiveDayForecastCard = () => {
  return (
    <Card size="lg" asChild>
      <ul className="space-y-3">
        {Array.from({ length: 5 }, (_, idx) => (
          <li className="flex items-center" key={idx}>
            <img
              src="/images/weather_icons/01n.png"
              width={36}
              height={36}
              alt="Overcast Clouds"
            />

            <p className="text-title-2 ms-2">25</p>

            <p className="text-label-1 text-surface-variant-fg font-semiBold ms-auto">
              17 Feb
            </p>

            <p className="text-label-1 text-surface-variant-fg font-semiBold ms-auto">
              Friday
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default FiveDayForecastCard;
