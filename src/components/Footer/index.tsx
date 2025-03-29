const Footer = () => {
  return (
    <footer className="flex flex-col items-center text-surface-variant-fg gap-x-3 gap-y-3 mt-7 pb-2">
      <p className="text-body-3">
        Copyright {new Date().getFullYear()} AmirHT. All Rights Reserved.
      </p>

      <p className="text-body-3 flex items-center gap-1">
        Powered By{' '}
        <a
          href="https://openweathermap.org/api"
          title="Free OpenWeather Api"
          target="_blank"
          rel="noopener"
        >
          <img
            src="/images/openweather.png"
            width={150}
            height={50}
            alt="OpenWeather"
            loading="lazy"
          />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
