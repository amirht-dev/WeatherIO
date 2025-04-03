import { useState } from 'react';

function useSearchParams() {
  const [params, setParams] = useState(new URLSearchParams(location.search));

  const set = (searchParams: URLSearchParams) => {
    setParams(searchParams);

    const url = new URL(location.href);

    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    history.pushState(null, '', url);
  };

  return [params, set] as const;
}

export default useSearchParams;
