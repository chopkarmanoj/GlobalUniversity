import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const SetUTMSource = () => {
  const { query } = useRouter();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  let utmSource = query?.utm_source;
  utmSource = utmSource !== undefined ? utmSource : 'domestic';

  useEffect(() => {
    // Function to check if data from API is loaded in the DOM
    const checkDataLoaded = () => {
      const dataLoadedElement = document.querySelectorAll('[data-formid]');
      return dataLoadedElement;
    };

    const interval = setInterval(() => {
      if (checkDataLoaded().length > 0) {
        setIsDataLoaded(true);
        clearInterval(interval); //Clear after setting utm value
      }
    }, 100); // Check every 100ms

    return () => clearInterval(interval); // Umnount interval
  }, []);

  useEffect(() => {
    if (isDataLoaded && typeof document !== 'undefined') {
      const form = document.querySelectorAll('[data-formid]');
      if (form) {
        Array.from(form)?.map((item) => {
          const utmInput = item?.querySelector('[name=utm]');
          if (utmInput) {
            utmInput.setAttribute('value', utmSource as string);
          }
        });
      }
    }
  }, [isDataLoaded, utmSource]);

  return null;
};
