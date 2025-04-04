import useForecastQuery from '@/hooks/useForecastQuery';
import { formatDateToParts } from '@/utils';
import { Card } from '../Card';

const FiveDayForecast = () => {
  const { data } = useForecastQuery({
    days: 5,
  });

  return (
    <section aria-labelledby="forecast-label" className="order-3">
      <h2 id="forecast-label" className="mb-2 tablet:mb-3 text-title-2">
        5 Days Forecast
      </h2>
      <Card size="lg" asChild>
        <ul className="space-y-3 tablet:space-y-4 desktop:space-y-6">
          {data?.forecast.forecastday.map((day) => {
            const dateParts = formatDateToParts(new Date(day.date));
            return (
              <li
                className="grid grid-cols-3 items-center"
                key={day.date.toString()}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={day.day.condition.icon}
                    width={36}
                    height={36}
                    alt="Overcast Clouds"
                  />

                  <p className="text-title-2">{day.day.avgtemp_c}</p>
                </div>

                <p className="text-label-1 text-surface-variant-fg font-semiBold justify-self-end">
                  {dateParts.day} {dateParts.monthName}
                </p>

                <p className="text-label-1 text-surface-variant-fg font-semiBold justify-self-end">
                  {dateParts.weekDayName}
                </p>
              </li>
            );
          })}
        </ul>
      </Card>
    </section>
  );
};

export default FiveDayForecast;
