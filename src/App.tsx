import CurrentWeatherCard from './components/CurrentWeatherCard';
import FiveDayForecast from './components/FiveDayForecast';
import Footer from './components/Footer';
import Header from './components/Header';
import HourlyForecast from './components/HourlyForecast';
import TodayHighlights from './components/TodayHighlights';

function App() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="container flex-1 relative space-y-4">
        <CurrentWeatherCard />
        <FiveDayForecast />
        <TodayHighlights />
        <HourlyForecast />
        <Footer />
      </main>
    </div>
  );
}

export default App;
