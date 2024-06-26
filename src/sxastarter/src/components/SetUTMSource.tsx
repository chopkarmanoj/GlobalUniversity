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
      const dataLoadedElement = document.querySelector(
        '[data-formid=f649a87b76fb4a15b11025be3f339759-aue]'
      );
      return dataLoadedElement;
    };

    const interval = setInterval(() => {
      if (checkDataLoaded()) {
        setIsDataLoaded(true);
        clearInterval(interval); //Clear after setting utm value
      }
    }, 100); // Check every 100ms

    return () => clearInterval(interval); // Umnount interval
  }, []);

  useEffect(() => {
    if (isDataLoaded && typeof document !== 'undefined') {
      const form = document.querySelector('[data-formid=f649a87b76fb4a15b11025be3f339759-aue]');
      if (form) {
        const utmInput = form.querySelector('[name=utm]');
        if (utmInput) {
          utmInput.setAttribute('value', utmSource as string);
        }
      }
    }
  }, [isDataLoaded, utmSource]);

  return null;
};
