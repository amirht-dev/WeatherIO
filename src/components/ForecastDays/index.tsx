import useForecastQuery from '@/hooks/useForecastQuery';
import { formatDateToParts } from '@/utils';
import { Card } from '../Card';
import Skeleton from '../Skeleton';

const ForecastDays = () => {
  const { data, isLoading } = useForecastQuery({
    days: 7,
  });

  return (
    <section aria-labelledby="forecast-label" className="order-3">
      <h2 id="forecast-label" className="mb-2 tablet:mb-3 text-title-2">
        7 Days Forecast
      </h2>
      <Card size="lg" asChild>
        <ul className="space-y-3 tablet:space-y-4">
          {(
            data?.forecast.forecastday.slice(1) ?? Array<null>(7).fill(null)
          ).map((day, idx) => {
            const dateParts = day
              ? formatDateToParts(new Date(day.date))
              : undefined;
            return (
              <li
                className="grid grid-cols-3 items-center"
                key={day?.date.toString() ?? idx}
              >
                <div className="flex items-center gap-2">
                  <Skeleton loading={isLoading} className="size-9">
                    <img
                      src={`https:${day?.day.condition.icon}`}
                      width={36}
                      height={36}
                      alt={day?.day.condition.text}
                    />
                  </Skeleton>

                  <p className="text-title-2">
                    <Skeleton loading={isLoading} className="w-[50px]">
                      {day?.day.avgtemp_c}
                    </Skeleton>
                  </p>
                </div>

                <p className="text-label-1 text-surface-variant-fg font-semiBold justify-self-end">
                  <Skeleton loading={isLoading} className="w-[60px]">
                    {dateParts?.day} {dateParts?.monthName}
                  </Skeleton>
                </p>

                <p className="text-label-1 text-surface-variant-fg font-semiBold justify-self-end">
                  <Skeleton loading={isLoading} className="w-[60px]">
                    {dateParts?.weekDayName}
                  </Skeleton>
                </p>
              </li>
            );
          })}
        </ul>
      </Card>
    </section>
  );
};

export default ForecastDays;
