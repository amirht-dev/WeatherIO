const Footer = () => {
  return (
    <footer className="flex flex-col items-center text-surface-variant-fg gap-x-3 gap-y-3 mt-7 pb-2">
      <p className="text-body-3">
        Copyright {new Date().getFullYear()}{' '}
        <a href="https://github.com/amirht-dev/" target="_blank">
          AmirHT
        </a>
        . All Rights Reserved.
      </p>

      <p className="text-body-3 flex items-center gap-1">
        Powered by{' '}
        <a href="https://www.weatherapi.com/" title="Free Weather API">
          WeatherAPI.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
