import CurrentWeatherCard from '@/components/CurrentWeatherCard';
import FiveDayForecast from '@/components/FiveDayForecast';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HourlyForecast from '@/components/HourlyForecast';
import TodayHighlights from '@/components/TodayHighlights';

const RootPage = () => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="container grid-rows-[masonry] flex-1 relative grid grid-cols-1 tablet:grid-cols-[280px_1fr] laptop:grid-cols-[360px_1fr] gap-4 laptop:gap-10">
        <CurrentWeatherCard />
        <FiveDayForecast />
        <TodayHighlights />
        <HourlyForecast />
      </main>
      <Footer />
    </div>
  );
};

export default RootPage;
