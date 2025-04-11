import CurrentWeatherCard from '@/components/CurrentWeatherCard';
import Footer from '@/components/Footer';
import ForecastDays from '@/components/ForecastDays';
import Header from '@/components/Header';
import HourlyForecast from '@/components/HourlyForecast';
import TodayHighlights from '@/components/TodayHighlights';
import useLocationSearchParam from '@/hooks/useLocationSearchParam';

const RootPage = () => {
  const [location] = useLocationSearchParam();

  return (
    <div className="flex flex-col min-h-dvh pb-4">
      <Header />
      {location ? (
        <main className="container tablet:grid-rows-[masonry] flex-1 relative grid grid-cols-1 tablet:grid-cols-[280px_1fr] laptop:grid-cols-[360px_1fr] gap-4 laptop:gap-10">
          <CurrentWeatherCard />
          <ForecastDays />
          <TodayHighlights />
          <HourlyForecast />
        </main>
      ) : (
        <div className="flex-1 flex items-center justify-center flex-col">
          <img
            src="/images/city.png"
            className="w-[300px] tablet:w-[400px] laptop:w-[unset]"
            alt="city"
          />
          <span className="text-title-1 italic text-surface-variant-2-fg">
            select a city
          </span>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RootPage;
